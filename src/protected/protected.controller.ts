import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'guards/role.enum';
import { RolesGuard } from 'guards/role.guard';
import { authRole } from 'decorators/roles.decorator';
import { ProtectedService } from './protected.service';

@Controller('info')
export class ProtectedController {
  constructor(private readonly protectedService: ProtectedService) {}

  @authRole(Roles.Admin, Roles.Editor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  getStudentInfo(): string {
    return this.protectedService.getStudentInfo();
  }
  @authRole(Roles.Editor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('editor')
  getStudent(): string {
    return 'Hello Editor';
  }
  @authRole(Roles.Editor)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('test')
  getPayload(): string {
    return 'asda';
  }
}
