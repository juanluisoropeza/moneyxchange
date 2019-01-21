import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private http:HttpClient) {
  }

  getCotizacion() {
    const url_api = 'http://data.fixer.io/api/latest?access_key=33b23d6e01efe285daf21f65e1124757';
    return this.http.get(url_api);
  }

}
