import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        usersRepository.count().then(async (usersCount) => {
            if (usersCount === 0) {
                const defaultPassword = 'admin123';
                const salt = bcrypt.genSaltSync(this.saltRounds);
                const hash = bcrypt.hashSync(defaultPassword, salt);
                const adminUser = new User();
                adminUser.username = 'admin';
                adminUser.password = hash;
                adminUser.firstName = 'Admin';
                adminUser.lastName = '';
                await usersRepository.save(adminUser);
                console.log('Default admin user created:');
                console.log(
                    `user: ${adminUser.username}\npassword: ${defaultPassword}`,
                );
            }
        });
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ username });
    }

    async getUser(id: number): Promise<Omit<User, 'password'> | undefined> {
        const {
            id: userId,
            username,
            firstName,
            lastName,
            isActive,
        } = await this.usersRepository.findOneBy({ id });
        return { id: userId, username, firstName, lastName, isActive };
    }

    async checkUserPassword(username: string, password: string) {
        const user = await this.findOne(username);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return { sub: user.id, username: username };
            }
        }
        return false;
    }
}
