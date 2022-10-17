/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Entities/user.entity';
import { Payload } from 'src/types/payload';
import { loginDTO } from '../login/dto/login.dto';
import { registerDTO } from '../register/dto/register.dto';
import { userDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async create(RegisterDTO: registerDTO) {
        const { userEmail } = RegisterDTO;
        const user = await this.userModel.findOne({ userEmail });
        if (user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save()
        return createdUser
    }


    async findByLogin(UserDTO: loginDTO) {
        const { userEmail, password } = UserDTO;
        const user = await this.userModel.findOne({ userEmail });
        if (!user) {
            throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
        }
        if (user.password !== password) {
            throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST)
        }
        return user
    }

    async findByPayload(payload: Payload) {
        const { userEmail } = payload;
        return await this.userModel.findOne({ userEmail })
    }

}
