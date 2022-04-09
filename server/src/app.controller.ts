import { Controller, Get, Req, Header } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { ProjectResolver } from './project/project.resolver';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @Header('Content-Type', 'application/json;charset=UTF-8')
  @Header('Access-Control-Max-Age', '3600')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers, X-Request-With')
  @Header('Access-Control-Allow-Origin', '*')
  getAllProjects(@Req() request: Request): string {
    return request.body;
  }
}
