import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    // Manejar excepciones HTTP (NestJS)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        // Manejar errores de validación
        if (exception instanceof BadRequestException && 'message' in exceptionResponse) {
          const validationErrors = exceptionResponse['message'];
          if (Array.isArray(validationErrors)) {
            message = validationErrors.join(', ');
          } else {
            message = validationErrors as string;
          }
        } else if ('message' in exceptionResponse) {
          message = exceptionResponse['message'] as string;
        }
      }
    } 
    // Manejar errores de MongoDB (duplicate key, etc)
    else if (exception && typeof exception === 'object' && 'code' in exception && exception['code'] === 11000) {
      status = HttpStatus.CONFLICT;
      const keyValue = exception['keyValue'];
      message = `El valor ${JSON.stringify(keyValue)} ya existe`;
    }
    // Manejar errores de validación de Mongoose
    else if (exception && typeof exception === 'object' && 'name' in exception && exception['name'] === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      const errors = Object.values(exception['errors'] as any).map(
        (err: any) => err.message,
      );
      message = errors.join(', ');
    }
    // Manejar errores genéricos
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // Log del error en consola
    console.error('Error capturado:', exception);

    response.status(status).json(ApiResponse.error(message, status));
  }
}