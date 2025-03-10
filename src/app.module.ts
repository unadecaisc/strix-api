import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RolesModule } from './roles/roles.module';
import { PeriodsModule } from './periods/periods.module';
import { DepartamentsModule } from './departaments/departaments.module';
import { MailingListModule } from './mailing-list/mailing-list.module';
import { GlobalConfigsModule } from './global-configs/global-configs.module';
import { StudentsModule } from './students/students.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { PermissionsModule } from './permissions/permissions.module';
import { ScholarshipRequestModule } from './scholarship-request/scholarship-request.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    RolesModule,
    PeriodsModule,
    DepartamentsModule,
    GlobalConfigsModule,
    MailingListModule,
    StudentsModule,
    PermissionsModule,
    ScholarshipRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/health',
          method: RequestMethod.GET,
        },
        {
          path: '/doc',
          method: RequestMethod.ALL,
        },
        {
          path: '/doc/swagger-ui.css',
          method: RequestMethod.GET,
        },
        {
          path: '/doc/swagger-ui-bundle.js',
          method: RequestMethod.GET,
        },
        {
          path: '/doc/swagger-ui-standalone-preset.js',
          method: RequestMethod.GET,
        },
        {
          path: '/doc/swagger-ui-init.js',
          method: RequestMethod.GET,
        },
        {
          path: '/doc/favicon-32x32.png',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
