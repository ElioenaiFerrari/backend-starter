import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Argon2Provider } from './argon2.provider';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private argon2Provider: Argon2Provider,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await this.argon2Provider.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signin(user: any) {
    const { password, ...rest } = user;

    return { token: this.jwtService.sign(rest) };
  }

  async signup(params: any) {
    const userAlreadyExists = await this.usersService.findByEmail(params.email);

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.argon2Provider.hash(params.password);

    return this.usersService.create({ ...params, password: hash });
  }
}
