import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BCRYPT_WORK_FACTOR } from 'src/generic/generic.model';
import { GenericService } from 'src/generic/generic.service';
import { LoginInput, User } from './model';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(@InjectModel(User.name) private readonly Umodel: Model<User>) {
    super(Umodel);
  }

  async alreadyExist(email: string): Promise<boolean> {
    const user = await this.Umodel.findOne({ email }).exec();
    return !!user;
  }

  async createUser(entity: User): Promise<User | BadRequestException> {
    const exist = await this.alreadyExist(entity.email);
    if (exist) {
      return new BadRequestException(
        `User with ${entity.email} already exists`,
      );
    }

    const password = await hash(entity.password, BCRYPT_WORK_FACTOR);
    entity.password = password;
    const user = await this.create(entity);
    if (!user) {
      return new BadRequestException(`Error creating user`);
    }
    return user;
  }

  async login(
    loginEntity: LoginInput,
  ): Promise<{ payload: User; match: boolean }> {
    const user = await this.Umodel.findOne({ email: loginEntity.email });
    let match;
    if (user) {
      match = await compare(loginEntity.password, user.password);
    }

    return { payload: user, match };
  }
}
