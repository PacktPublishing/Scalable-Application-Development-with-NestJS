import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module'; 
import * as fs from 'fs'; 
 
async function bootstrap() { 
  const httpsOptions = { 
    key: fs.readFileSync('path/to/private-key.pem'), 
    cert: fs.readFileSync('path/to/public-certificate.pem'), 
  }; 
  const app = await NestFactory.create(AppModule, { httpsOptions }); 
  await app.listen(3000); 
} 
bootstrap(); 