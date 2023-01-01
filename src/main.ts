import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  });
  app.use(
    session({
      name: 'CLOWN_SESSION_ID',
      secret: 'keyboard cat', // get env
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 24 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log(new Date().toLocaleString());
    console.log(`App running on port ${port}...😊 `);
  });
}
bootstrap();
