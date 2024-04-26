import { Controller,Get, Post,Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any): Promise<any>{
        return this.authService.generateToken(req.user);
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    async user(@Request() req: any): Promise<any> {
        return req.user; 
    }
}
