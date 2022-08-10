import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModal: Model<User>) {}

  async insertUser(
    name: string,
    userName: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      const username = userName.toLocaleLowerCase();
      const id = uuidv4();
      const newUser = new this.userModal({
        username,
        password,
        name,
        id,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteUser(ID: string): Promise<boolean | undefined> {
    try {
      const id = ID.toLocaleLowerCase();
      const res = await this.userModal.findOneAndDelete({ id });
      return res ? true : false;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getUser(userName: string): Promise<User | undefined> {
    try {
      const username = userName.toLocaleLowerCase();
      const user = await this.userModal.findOne({ username });
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
