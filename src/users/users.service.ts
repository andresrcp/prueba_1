import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password }= createUserDto;
    const tohash = await hash(password, 10);
    const { email }= createUserDto;
    const findUser = await this.userModel.findOne({email});
    if(findUser) throw new ConflictException ("User Already Exists");
    createUserDto = {...createUserDto, password:tohash};
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({_id: id}).exec();
    if(!user) throw new NotFoundException("User Not Exists");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({_id:id},updateUserDto).exec();
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findOneAndDelete({_id: id}).exec();
    if(!user) throw new NotFoundException("User Not Exists");
    return user;
  }
}
