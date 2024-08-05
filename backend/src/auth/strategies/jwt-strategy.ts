import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/helpers/role/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
  }) {
    const { id, email, firstName, lastName, roles } = payload;

    return { id, email, firstName, lastName, roles };
  }
}
