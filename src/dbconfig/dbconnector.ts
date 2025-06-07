require('dotenv').config();
import { Pool } from 'pg';

export default new Pool ({
    max:20,
    connectionString: process.env.DB_CONNECTION_STRING ,
    idleTimeoutMillis:30000
});
