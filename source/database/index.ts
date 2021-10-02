import { Pool } from 'pg';
import { logger } from '..';
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: 'radius',
    password: "slq"
  });

  pool.connect()
    .then(() => logger.log('info','CONNECTION HAS BEEN ESTABLISHED WITH DATABASE'))
    .catch((err) => logger.log('error',`Problem with connecting to PG database: \n ${err}`));


pool.query(`
  CREATE TABLE IF NOT EXISTS guild_data(
     guild_id BIGINT NOT NULL,
     prefix char(5) NOT NULL 
  );
`)
export const db = pool;