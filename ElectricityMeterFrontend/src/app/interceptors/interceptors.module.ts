import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseurlInterceptor} from './baseurl.interceptor';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseurlInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }]
})
export class InterceptorsModule { }
