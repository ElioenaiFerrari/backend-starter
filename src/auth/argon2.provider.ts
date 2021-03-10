import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Argon2Provider {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(password: string, hash: string) {
    return argon2.verify(hash, password);
  }
}
