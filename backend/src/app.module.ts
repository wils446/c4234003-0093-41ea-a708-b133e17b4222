import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { appConfig, databaseConfig } from './commons/configs';
import { UserModule } from './user/user.module';
import { IsUniqueConstraint } from './commons/validators';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig, appConfig], isGlobal: true }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
