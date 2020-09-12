import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [UserService, AppService],
})
export class AppModule {}
