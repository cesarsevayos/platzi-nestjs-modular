import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    //CONEXION A BASE DE DATOS RELACIONAL USANDO TYPEORM
    //CONEXION USANDO POSTGRES
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, pass, port } = configService.dbPostGres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password: pass,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    //CONEXION USANDO MYSQL
    /*
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, pass, port } = configService.dbMysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password: pass,
          database: dbName,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    */
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },

    /*
    //ESTA MANERA DE CONEXION ES UNA CONEXION MANUAL, SIN USAR TYPEORM
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, pass, port } = configService.dbPostGres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password: pass,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    */
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
