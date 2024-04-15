import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

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

    getUser(id: number): Promise<Omit<User, 'password'>> {
        return this.usersService.getUser(id);
    }
}
