import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export default class ApiInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        let status = HttpStatus.OK;
        if (request.method == 'POST') {
            status = HttpStatus.CREATED;
        }

        return next.handle().pipe(
            map((data) => {
                return { success: true, statusCode: status, data };
            }),
            catchError(async (err, caught) => {
                throw err;
            }),
        );
    }
}
