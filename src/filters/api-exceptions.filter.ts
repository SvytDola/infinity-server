import { Catch } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { ApiException } from '../exception/base.exception';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter<ApiException> {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: I18nValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const statusCode = exception.getStatus();

    // Пока временный вариант.
    const lang = this.i18n.resolveLanguage(request.headers['accept-language']);

    response.status(statusCode).send({
      statusCode: statusCode,
      message: this.i18n.translate(exception.message, { lang }),
    });
  }
}
