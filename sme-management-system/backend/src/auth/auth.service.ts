import { Injectable } from '@nestjs/common';
import prisma from "../prisma/client";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService){}
    async register(name: string, email: string, password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        return { message: 'User created', user };
    }
    async login(email: string, password: string)
    {
        const user = await prisma.user.findUnique({where: {email} });
        if (!user) {
            return { message: 'invalid credentials'};
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) {
            return { message: 'invalid credentials'};
        }

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role:user.role,
        });

        return {
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,

            },
        };
    }
}
