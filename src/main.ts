import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      allowedHeaders:
        'Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,proxy-api',
    },
  });

  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'strict',
        secure: 'auto',
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port, () =>
    console.log('Server has been started at PORT - ' + port),
  );
}
bootstrap();
