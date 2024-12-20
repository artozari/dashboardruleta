import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RuletaService {
  url_api = 'http://sielcondev01.site:4000';
  constructor(private readonly http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get(`${this.url_api}/api/v1/table`);
  }

  getTable(key: string): Observable<any> {
    return this.http.get(`${this.url_api}/api/v1/table/${key}`);
  }

  postTable(table: any): Observable<any> {
    return this.http.post(`${this.url_api}/api/v1/table`, table);
  }

  enableTable(key: string): Observable<any> {
    return this.http.delete(`${this.url_api}/api/v1/table/${key}`);
  }
}
