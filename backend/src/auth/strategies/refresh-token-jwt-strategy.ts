import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(req: any, payload: { id: number; email: string }) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    const user = await this.authService.validateJwtPayload(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { ...user, refreshToken: refreshToken };
  }
}
