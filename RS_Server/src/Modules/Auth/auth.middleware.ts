import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthServices } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthServices,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization'];

      if (!token) {
        throw new UnauthorizedException();
      }

      const tokenParts = token.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
        throw new UnauthorizedException();
      }

      const jwtToken = tokenParts[1];

      const data = await this.jwtService.verifyAsync(jwtToken);
      const id = data.id;

      const user = await this.authService.findOneid(id);

      if (!user) {
        throw new UnauthorizedException();
      }

      req['user'] = user;
      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
