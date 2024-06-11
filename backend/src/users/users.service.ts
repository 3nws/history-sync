import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User | undefined> {
    const { firstName, lastName, email, password } = data;
    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      password,
    });
    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
