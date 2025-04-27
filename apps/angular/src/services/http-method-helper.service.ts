import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) { }


  fnApiPost(url: string, payload: Record<string, any>) {
    return this.http.post(url, payload).pipe(
      map((response: any) => {
        return response.available;
      }),
      catchError((error) => {
        console.error('Error checking user availability:', error);
        return of(false);
      })
    );
  }

  fnApiPut(url: string, payload: string) {
    return this.http.post(url, payload).pipe(
      map((response: any) => {
        return response.available;
      }),
      catchError((error) => {
        console.error('Error checking user availability:', error);
        return of(false);
      })
    );
  }

  fnApiDelete(url: string, payload: string) {
    return this.http.post(url, payload).pipe(
      map((response: any) => {
        return response.available;
      }),
      catchError((error) => {
        console.error('Error checking user availability:', error);
        return of(false);
      })
    );
  }

  fnApiGet(url: string, payload: string) {
    return this.http.post(url, payload).pipe(
      map((response: any) => {
        return response.available;
      }),
      catchError((error) => {
        console.error('Error checking user availability:', error);
        return of(false);
      })
    );
  }
}
