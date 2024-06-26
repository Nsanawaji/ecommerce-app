import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async facebookLogin(req) {
    if (!req.user) {
      return 'No user';
    }
    return {
      message: 'User info from facebook',
      user: req.user,
    };
  }
}