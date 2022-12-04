import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { PocketModule } from './pocket/pocket.module';
import { PocketController } from './pocket/pocket.controller';
import { join } from 'path';

// envFilePath: `.${process.env.NODE_ENV}.env`,

const env = ConfigModule.forRoot({
  envFilePath: `${join(__dirname, '../../env/')}${
    !process.env.NODE_ENV ? '.production.env' : `.${process.env.NODE_ENV}.env`
  }`,
  isGlobal: true,
});

const DBConnection = MongooseModule.forRoot(
  `mongodb+srv://asdqwe123:${'asdqwe123'}@cluster0.8kb71br.mongodb.net/?retryWrites=true&w=majority`,
);

@Module({
  imports: [env, DBConnection, UsersModule, AuthModule, PocketModule],
  controllers: [UsersController, PocketController],
  providers: [],
})
export class AppModule {}
