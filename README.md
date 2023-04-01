# Rest utilities
This project contains some useful utilities for building a restful API with express or nestjs.
I manly use it for my personal projects. Feel free to contribute or fork this project

## Utilities
### [HTTP Response](./src/express/response)
This project contains some predefined response classes, the idea behind it is to have a uniform response.
Specifically, this library has three predefined response classes. The Success-, Failed-, and ErrorResponse.
Each of these responses have a status, message and data field.
The status field **defines** the status of the response, the available response status are [here defined](./src/express/response/response-status.ts).
The message field **should** contain a short message for the api consumer.
The data field **can** contain some additional data for the api consumer. 

- [SuccessResponse](./src/express/response/success.response.ts)
- [FailResponse](./src/express/response/fail.response.ts)
- [ErrorResponse](./src/express/response/error.response.ts)

each response class extends the [AbstractResponse](./src/express/response/abstract-response.ts) class.

#### Example use in an NestJS controller
```ts
@Controller('/api/v1/response')
export class ResponseController {
  @Get('/success')
  public success(
    @Res() response: Response
  ): SucessResponse {
      return new SuccessResponse('This is a success response').send(response);
  }

  @Get('/fail')
  public failed(
    @Res() response: Response
  ): FailResponse {
    return new FailResponse('This is a fail response').send(response);
  }

  @Get('/error')
  public error(
    @Res() response: Response
  ): FailResponse {
    return new ErrorResponse(ResponseCode.INTERNAL_SERVER_ERROR, 'This is a error response').send(response);
  }
}
```

### [NestJS Logger](./src/nestjs/utilities/logger.ts)
This library also contains a basic logger class.

NestJS docs: https://docs.nestjs.com/techniques/logger
#### Example use
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  await app.listen(1000);
}
```

### [NestJS HTTP Interceptor (Logging)](./src/nestjs/interceptor/http.interceptor.ts)
If you want to log incoming requests u can use the [HttpInterceptor](./src/nestjs/interceptor/http.interceptor.ts).
It will log all incoming HTTP requests in the console.

NestJS docs: https://docs.nestjs.com/interceptors
#### Example use
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpInterceptor());
  await app.listen(1000);
}
```

#### Utilities
```ts
// Return a response code value based on the provided http code
ResponseCodeUtility.getByHttpCode(200);
```
