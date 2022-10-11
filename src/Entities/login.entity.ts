/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Login {
    @Prop()
    userEmail: string;

    @Prop()
    password: string;
}


export const LoginSchema = SchemaFactory.createForClass(Login)