/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ProtectedService } from './protected.service';

@Controller('info')
export class ProtectedController {
  constructor(private readonly protectedService: ProtectedService) {}
  @Get()
  getStudentInfo(): string {
    return this.protectedService.getStudentInfo();
  }
}
