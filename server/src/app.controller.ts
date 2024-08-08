import { Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): string {
    console.log(request.cookies);
    return this.appService.getHello();
  }

  @Get('get-cookie')
  getCookie(@Req() request: Request): Record<string, any> {
    console.log(request.cookies);
    return request.cookies;
  }

  @Post('set-cookie')
  setCookie(@Res({ passthrough: true }) response: Response) {
    // $ 1. 不设置domian
    response.cookie('username', 'Akclown');
    // $ 2. 设置domian为当前服务器域名
    response.cookie('age', '88', { domain: 'api.ak.com' });
    // $ 3. 设置domian为当前服务器上级域名
    response.cookie('id', 1, {
      domain: 'ak.com',
    });
    // $ 4. 设置domian为当前服务器子级域名
    response.cookie('blog', 'AK', { domain: 'sub.api.ak.com' });
    // $ 5. 设置domian为与当前域名无关的域名(第三方cookie)
    response.cookie('gender', 1, { domain: 'akclown.com' });

    response.status(200).send('Cookie set');
  }

  @Post('set-same-site-cookie')
  setSameSiteCookie(@Res({ passthrough: true }) response: Response) {
    // $ 1. strict
    response.cookie('username', 'Akclown', { sameSite: 'strict' });
    // $ 2. lax
    response.cookie('age', '88', { domain: 'api.ak.com', sameSite: 'lax' });
    // $ 3. none
    response.cookie('id', 1, {
      domain: 'ak.com',
      sameSite: 'none',
      secure: true,
    });

    response.status(200).send('Cookie set');
  }

  @Post('set-other-cookie')
  setOtherCookie(@Res({ passthrough: true }) response: Response) {
    response.cookie('username', 'Akclown2');
    response.cookie('id', 2);

    response.status(200).send('Cookie set');
  }

  @Get('set-session')
  setSession(@Session() session) {
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('get-session')
  getSession(@Session() session) {
    console.log('session.count: ', session.count);
    return session.count;
  }
}
