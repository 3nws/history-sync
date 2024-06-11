import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];
  const firstName = process.argv[3];
  const lastName = process.argv[4];
  const email = process.argv[5];
  const password = await bcrypt.hash(process.argv[6], await bcrypt.genSalt());

  switch (command) {
    case 'create-administrator-user':
      const usersService = app.get(UsersService);
      await usersService.create({
        firstName,
        lastName,
        email,
        password,
      });
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
