import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { PocketModule } from './pocket/pocket.module';

const env = ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const DBConnection = MongooseModule.forRoot(
  `mongodb+srv://asdqwe123:${process.env.DB_PASSWORD}@cluster0.8kb71br.mongodb.net/?retryWrites=true&w=majority`,
);

@Module({
  imports: [env, DBConnection, UsersModule, AuthModule, PocketModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
