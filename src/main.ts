import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

interface Error {
  error: string;
  message: any;
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();
    console.log(exception.validationErrors.map((err) => err.message));
    //  err.message.split('-')
    return response.status(400).json({
      statusCode: 400,
      validationErrors: exception.validationErrors,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            error: `${error.property} has wrong value ${error.value}.`,
            message: Object.values(error.constraints).join('-'),
          };
        });
        return new ValidationException(messages);
      },
    }),
  );
  await app.listen(3002);
}
bootstrap();
