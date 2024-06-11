import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import {
  CreateRefreshTokenType,
  RefreshTokensService,
} from 'src/refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('User not found!');

    const { firstName, lastName, id } = user;

    const payload = {
      firstName,
      lastName,
      id,
      email,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '180m',
    });

    const tokenPayload: CreateRefreshTokenType = {
      userId: user.id,
      token: refreshToken,
    };

    this.refreshTokenService.create(tokenPayload);

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '60s',
      }),
      refreshToken,
    };
  }

  public async validateJwtPayload(payload: { id: number; email: string }) {
    return await this.usersService.findOne(payload.email);
  }

  async reCreateToken(data: { accessToken: string; refreshToken: string }) {
    const { accessToken, refreshToken } = data;

    const { userId } = this.decodejwt(accessToken);

    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new ForbiddenException();
    }

    const { firstName, lastName, id, email } = user;

    this.jwtService.verify(refreshToken);

    const payload = {
      firstName,
      lastName,
      id,
      email,
    };

    return { accessToken: this.jwtService.sign(payload), refreshToken };
  }

  decodejwt(accessToken: string) {
    const newAccessToken = accessToken.replace('Bearer', '').trimStart();
    const decoded = this.jwtService.decode(newAccessToken);

    const { id: userId, firstName, lastName } = decoded;

    return {
      userId,
      firstName,
      lastName,
    };
  }
}
