import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwatService: JwtService,private encryptionService: EncryptionService){}
    async validateUser(email: string, password: string):Promise<any>{
        const user = await this.userService.findUserByEmail(email);
        if(!user) throw new UnauthorizedException();
        if(user.password != this.encryptionService.hashPassword(password)) throw new UnauthorizedException();
        return user;
    }
    
    async generateToken(user: any){
        return{
            asscess_token:this.jwatService.sign({
                sub:user.email,
                username:user.username,
                role:user.role,
            })
        }
    }
}
