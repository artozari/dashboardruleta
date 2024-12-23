import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url_api = 'https://my-json-server.typicode.com/artozari/Test-Usuario/users';
  constructor(private readonly http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get(`${this.url_api}`);
  }

  getTable(key: string): Observable<any> {
    return this.http.get(`${this.url_api}${key}`);
  }

  postTable(table: any): Observable<any> {
    return this.http.post(`${this.url_api}`, table);
  }

  enableTable(key: string): Observable<any> {
    return this.http.delete(`${this.url_api}${key}`);
  }
}

