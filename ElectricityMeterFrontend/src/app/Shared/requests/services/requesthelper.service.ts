import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Request } from '../classes/request.class';

@Injectable()
export class RequesthelperService {

  constructor(private http: HttpClient) {

  }

  get<T>(request: Request<T>): Observable<T> {
    const params: HttpParams =  request.getParams();

    return this.http.get<T>(request.url, {params});
  }

  post<T>(request: Request<T>): Observable<T> {
    return this.http.post<T>(request.url, request.item);
  }
}
