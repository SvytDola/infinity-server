import { map, Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((resp) => {
        return {
          ...resp,
          message: 'Ok.',
          statusCode: context.switchToHttp().getResponse<FastifyReply>().statusCode,
        };
      }),
    );
  }
}
