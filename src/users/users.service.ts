import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users: any[] = [
    {
      id: 1,
      email: 'elioenaiferrari@gmail.com',
      password:
        '$argon2i$v=19$m=4096,t=3,p=1$/h2+VZW8714eqh1N3Ui2BQ$75Pejg4E2tK3QqXIjjLPExVf9DTwWRlaUSFJeq3sOM0',
    },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(params: any): Promise<any> {
    const id = this.users.length;
    this.users.push({ id, ...params });

    return this.users.find((user) => user.id === id);
  }
}
