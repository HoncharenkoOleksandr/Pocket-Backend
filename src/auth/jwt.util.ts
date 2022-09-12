import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JWTPayload = {
  id: string;
  username: string;
};

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  decode(auth: string): JWTPayload {
    const jwt = auth.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true }) as JWTPayload;
  }
}
