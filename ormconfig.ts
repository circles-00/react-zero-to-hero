import { configService } from './src/config/config.service';

const connectionSource = configService.getDataSource();

export default connectionSource;
