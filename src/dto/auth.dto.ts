import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    default: 'tarieladze@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: '1234',
  })
  password: string;
}
