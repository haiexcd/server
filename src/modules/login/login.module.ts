import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Register, RegisterSchema } from 'src/Entities/register.entity';
import { User, UserSchema } from 'src/Entities/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
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
  providers: [LoginService],
})
export class LoginModule {}
