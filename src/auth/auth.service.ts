import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'dto/auth.dto';

// eslint-disable-next-line
const users = require('./../../user.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signinLocal(dto: AuthDto) {
    // retrieve user
    console.log(users.find((rr) => rr));
    const user = users.find((user) => user.email === dto.email);
    if (!user) throw new UnauthorizedException('Credentials incorrect');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect');

    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: number, email: string, type: string) {
    return {
      success: true,
      access_token: this.jwtService.sign({
        sub: userId,
        email,
        type: type,
      }),
    };
  }
}
