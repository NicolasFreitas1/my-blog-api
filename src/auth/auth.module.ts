import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [UserService, AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, UserModule],
})
export class AuthModule {}
