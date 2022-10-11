/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Register {
    @Prop()
    userEmail: string;

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    userRole: string;

}


export const RegisterSchema = SchemaFactory.createForClass(Register)
