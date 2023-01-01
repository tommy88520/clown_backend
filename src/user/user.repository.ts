import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUser(query: FilterQuery<User>): Promise<User[]> {
    return await this.userModel.find(query);
  }

  async validateUser(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }
  async createAccount(query: FilterQuery<User>): Promise<User> {
    const result = new this.userModel(query);
    return await result.save();
  }

  async updateAuth(email: string, token, session_id): Promise<any> {
    const findUser = await this.userModel.updateOne(
      { email },
      { $set: { token, session_id } },
    );
    return findUser;
  }
  async getUserInfo(session_id: string): Promise<any> {
    return await this.userModel.findOne({ session_id });
  }
}
