import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}
    async validateUser(email:string,password:string):Promise<any>{
        const user = await this.userService.findUserByEmail(email);
        if(!user) throw new UnauthorizedException();
        if(user.password != password) throw new UnauthorizedException();
        return user;
    }
}
