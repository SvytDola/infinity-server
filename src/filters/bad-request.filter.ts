import { FastifyReply, FastifyRequest } from 'fastify';

import { Catch } from '@nestjs/common';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch(I18nValidationException)
export class HttpExceptionFilter
  implements ExceptionFilter<I18nValidationException>
{
  constructor(private readonly i18n: I18nService) {}

  // Function return translated text.
  getMessage(
    key: string,
    lang: string,
    options: { constraints: any[]; property: string },
  ): string {
    const validation: string = this.i18n.translate(key, { lang });

    let param = '';

    if (options?.constraints) {
      param = options?.constraints[0].toString();
    }
    return validation
      .replace('%property', options?.property)
      .replace('%number', param);
  }

  catch(exception: I18nValidationException, host: ArgumentsHost): void {
    console.log(exception);
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const statusCode = exception.getStatus();

    // Пока временный вариант.
    const lang = this.i18n.resolveLanguage(request.headers['accept-language']);
    const constraints = exception.errors[0].constraints;
    const keyConstraints = Object.keys(constraints)[0];

    const [key, options] = constraints[keyConstraints].split('|');

    let attr: any;
    try {
      attr = JSON.parse(options);
    } catch {
      attr = {}
    }
    attr.property = exception.errors[0].property;

    const message = this.getMessage(key, lang, attr);

    response
      .status(statusCode)
      .send({ statusCode: statusCode, message: message });
  }
}
