/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    userName: string;

    @Prop()
    userEmail: string;

    @Prop()
    password: string;

    @Prop()
    userRole: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    phone: number;
}


export const UserSchema = SchemaFactory.createForClass(User)