/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async findOne(username: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { username } });
        return user ?? undefined;
    }

    async create(username: string, password: string): Promise<User> {
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, password: hashed });
        return this.userRepo.save(user);
    }
}
