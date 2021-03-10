import argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user';
import { Model } from 'mongoose';
import { SignupDto } from 'src/auth/dto/signup.dto';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this._userModel.findOne({ email });
  }

  async create(params: SignupDto): Promise<any> {
    return this._userModel.create(params);
  }
}
