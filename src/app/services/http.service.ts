import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private rootUrl = environment.apiEndPoint;
  private baseUrl = `${this.rootUrl}/`

  constructor(private http: HttpClient, private event: EventService) { }

  get(url: string, cb: any){
    const endpoint = this.baseUrl + url
    this.http
      .get<ResponseObject>(endpoint)
      .pipe(
        retry(3)
        // catchError(this.handleError)
      )
      .subscribe(data => {
        if(data.success){
          cb(data);
        }else {
          this.showErrorMessage(data);
        }
      })
  }

  search(url: string, body: any, cb: any){
    const params = new HttpParams({
      fromObject: body
    });
    const endpoint = `${this.baseUrl} + ${url}`;
    this.http
      .get(endpoint, { params })
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
      .subscribe(data => {
        if(data){
          cb(data);
        }else {
          this.showErrorMessage(data)
        }
      });
  }

  post(url: string, body: any, cb: any){
    const endpoint = this.baseUrl + url;
    this.http
      .post<ResponseObject>(endpoint, body)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
      .subscribe(data => {
        if(data){
          cb(data)
        }else {
          this.showErrorMessage(data)
        }
      })
  }

  patch(url: string, body: any, cb: any){
    const endpoint = `${this.baseUrl} + ${url}`;
    this.http
      .patch(endpoint, body)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
      .subscribe((data) => {
        if(data){
          cb(data)
        }else {
          this.showErrorMessage(data);
        }
      });
  }

  delete(){}

  private showErrorMessage = (message: any) => {
    console.log(message);
  }

  private handleError = (error: HttpErrorResponse) => {
    this.event.isHttpError.emit(error.error);
    if(error.error instanceof ErrorEvent){
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }else {
      if(error.status === 401){
        console.log("login user out");
      }
      this.showErrorMessage(error.error);
    }

    return throwError(() => 'Something went wrong, please try again later')

  }

}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        setHeaders: {

        },
        setParams: {
          key: ""
        }
      })

      return next.handle(req);
  }
}

export interface ResponseObject {
  success: boolean;
  errorCode: number;
  message: string;
  user: any;
  token: string;
  data: any;
}