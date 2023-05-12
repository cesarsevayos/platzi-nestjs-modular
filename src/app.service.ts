import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    //@Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `Hello World! ${apiKey} ${name}`;
  }

  /*
  METODO QUE USA LA FUNCION QUERY CON LA CONEXION ANUAL A POSTGRES
  async getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM TASKS', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
  */
}
