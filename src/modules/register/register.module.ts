import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Register, RegisterSchema } from 'src/Entities/register.entity';
import { User, UserSchema } from 'src/Entities/user.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      '',
      [],
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
