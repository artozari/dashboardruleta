import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CasinoApiService {
  url_api = 'http://sielcondev01.site:4000';
  constructor(private readonly http: HttpClient) {}

  getAllCasinos(): Observable<any> {
    return this.http.get(`${this.url_api}/api/v1/casino`);
  }
}
