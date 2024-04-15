import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const payload = await this.usersService.checkUserPassword(
            username,
            pass,
        );
        if (!payload) {
            throw new UnauthorizedException();
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
