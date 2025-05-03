import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AuthHelperModule } from './resources/auth/auth-helper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtpModule } from './resources/otp/otp.module';
import { CommonModule } from './common/share-module/common.module';
import { OTP } from './resources/otp/entities/otp.entity';
import { UserModule } from './resources/user/user.module';
import { ContentModule } from './resources/content/content.module';
import { User } from './resources/user/entities/user.entity';
@Module({
  imports: [
    AuthHelperModule,
    OtpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService], // ✅ MUST inject the ConfigService
      useFactory: async (
        config: ConfigService
      ): Promise<SequelizeModuleOptions> => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')), // make sure port is number
        username: config.get<string>('DB_USER'), // correct key here
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        models: [OTP, User], // add your models here
        logging: false, // optional: turn off SQL logs
      }),
    }),
    CommonModule,
    UserModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
