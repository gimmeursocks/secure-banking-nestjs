import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
    providers: [UserService],
    // controllers: [UserController],
    exports:[UserService],
})
export class UsersModule {
}
