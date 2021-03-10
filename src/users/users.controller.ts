import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { User } from './models/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Get()
  async index(@Query() query: any): Promise<User[]> {
    return this._usersService.findAll(query);
  }
}
