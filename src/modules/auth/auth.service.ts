/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/types/payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signPayload(payload: Payload) {
        const SECRET_KEY=""
        // return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' })
        return sign(payload, SECRET_KEY, { expiresIn: '7d' })
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
    }
}
