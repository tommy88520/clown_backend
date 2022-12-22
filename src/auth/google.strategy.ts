import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { NONAME } from 'dns';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: config.get('GOOGLE_ID'),
      clientSecret: config.get('GOOGLE_SECRET_KEY'),
      callbackURL: 'http://localhost:3333/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.userService.validateUser(profile.emails[0].value);

    if (user) {
      return user;
    } else {
      const googleLogin = {
        nickname: profile.emails[0].value,
        email: profile.emails[0].value,
        gender: null,
        token: accessToken,
      };
      const newUser = await this.userService.googleCreateAccount(googleLogin);

      return newUser;
    }
  }
}