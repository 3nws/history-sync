import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(201)
  @Post('refresh')
  public async refreshToken(
    @Body() refreshDto: { accessToken: string; refreshToken: string },
  ) {
    return await this.authService.reCreateToken(refreshDto);
  }
}
