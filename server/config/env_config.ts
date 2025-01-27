import dotenv from 'dotenv'
import path from 'path';

const appEnv = process.env.APP_ENV || 'dev';
const envFile = `.env.${appEnv}`;

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`App running in ${process.env.APP_ENV || 'dev'} mode`);

export default process.env;