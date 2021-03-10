import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public';

@Controller('users')
export class UsersController {
  @Get()
  hello() {
    return 'hello';
  }
}
