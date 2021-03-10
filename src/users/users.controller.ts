import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public';

@Public()
@Controller('users')
export class UsersController {
  @Get()
  hello() {
    return 'hello';
  }
}
