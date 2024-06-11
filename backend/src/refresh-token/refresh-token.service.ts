import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { In, LessThan, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

export type CreateRefreshTokenType = {
  userId: number;
  token: string;
};

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async getRefreshTokenById(id: number) {
    const token = await this.refreshTokenRepository.findOne({ where: { id } });

    return token;
  }

  async create(data: CreateRefreshTokenType) {
    const { userId, token } = data;

    const user = await this.usersService.getUserById(userId);

    let refreshToken = new RefreshToken();

    const expiredAt = new Date();

    const code = token;

    refreshToken = {
      ...refreshToken,
      user,
      code,
      expiredAt,
    };

    await this.refreshTokenRepository.insert(refreshToken);
  }

  async removeExpiredRefreshTokens(currentDateUTC: Date) {
    await this.refreshTokenRepository.delete({
      expiredAt: LessThan(currentDateUTC),
    });
  }
}
