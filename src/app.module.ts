import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://alexanderdvicius:0nfU2bwhmXeVM4bC@cluster.mjyfk6h.mongodb.net/',
    ),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    GraphQLModule.forRoot({
      cors: {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
