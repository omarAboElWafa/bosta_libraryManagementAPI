import { Pool } from 'pg';
import { dbConfigs } from '@/utils/config';

export default new Pool(dbConfigs);
