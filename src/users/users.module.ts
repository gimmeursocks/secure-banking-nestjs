import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service'

@Module({
    providers: [UserService, EncryptionService],
    // controllers: [UserController],
    exports:[UserService],
})
export class UsersModule {
}
