import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Entities/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://haiexcd:hai012490@cluster0.73hunog.mongodb.net/?retryWrites=true&w=majority',
      [],
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
