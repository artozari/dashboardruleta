import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RuletaServiceService {
  url_api = 'http://sielcondev01.site:4000';
  constructor(private readonly http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get(`${this.url_api}/api/v1/table`);
  }

  putTable(table: any): Observable<any> {
    console.log(`${this.url_api}/api/v1/table`, table);

    return this.http.put(`http://sielcondev01.site:4000/api/v1/table`, table);
  }
}
