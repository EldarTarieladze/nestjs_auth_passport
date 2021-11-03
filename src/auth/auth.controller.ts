import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'dto/auth.dto';
import { AuthService } from './auth.service';

interface TAuth {
  success: boolean;
  access_token: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  authStudent(@Body() dto: AuthDto): TAuth {
    return this.authService.signinLocal(dto);
  }
}
