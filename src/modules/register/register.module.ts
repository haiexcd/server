import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from 'src/Entities/register.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://haiexcd:hai012490@cluster0.73hunog.mongodb.net/?retryWrites=true&w=majority',
      [],
    ),
    MongooseModule.forFeature([
      {
        name: Register.name,
        schema: RegisterSchema,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
