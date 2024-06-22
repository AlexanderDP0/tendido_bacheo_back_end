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
import { TramosModule } from './tablas/tramos/tramos.module';
import { BachesModule } from './tablas/baches/baches.module';
import { ClimaModule } from './tablas/clima/clima.module';
import { EstadoModule } from './tablas/estado/estado.module';
import { MaterialesModule } from './tablas/materiales/materiales.module';
import { ReportesModule } from './tablas/reportes/reportes.module';


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
    TramosModule,
    BachesModule,
    ClimaModule,
    EstadoModule,
    MaterialesModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
