import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { RegDto } from 'dto/registration.dto';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registraitonService: RegistrationService) {}
  @Post()
  @ApiBody({ type: RegDto })
  async registrationUser(@Body() user: RegDto): Promise<string> {
    return await this.registraitonService.registartionUser(user);
  }
}
