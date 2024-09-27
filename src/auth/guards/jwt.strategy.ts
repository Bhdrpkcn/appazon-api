import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // whenever we've a protected route that route we're calling as the end point,
      // we're expecting the json web token to be part of the headers.
      //So when the user signs in on the front end the token got sent back to them is
      // attached to all of the future request that they send.

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      //prevents request if the time exceed the tokens expiration time.
      ignoreExpiration: false,

      //making sure the secret matches.
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
