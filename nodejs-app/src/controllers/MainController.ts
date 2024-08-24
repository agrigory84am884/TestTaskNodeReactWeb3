import { Controller, Get } from 'routing-controllers';

@Controller('/')
export class MainController {

  @Get('/')
  getRoot() {
    return { message: 'Welcome to the API!' };
  }
}