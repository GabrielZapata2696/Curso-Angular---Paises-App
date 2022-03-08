import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../interfaces/pais.interfaces';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private API_URL = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }

  get httpParams() {
    return new HttpParams()
      .set('fields', 'name,capital,cca2,cca3,flags,population');
  }

  obtenerPais(filtro: string): Observable<Pais[]> {
    const url = `${this.API_URL}/name`;
    return this.http.get<Pais[]>(`${url}/${filtro}`, { params: this.httpParams });
  }

  obtenerPaisXCapital(filtro: string): Observable<Pais[]> {
    const url = `${this.API_URL}/capital`;
    return this.http.get<Pais[]>(`${url}/${filtro}`, { params: this.httpParams });
  }

  obtenerPaisPorCodigo(id: string): Observable<Pais> {
    const url = `${this.API_URL}/alpha`;
    return this.http.get<Pais>(`${url}/${id}`);
  }

  obtenerPaisesXRegion(region: string): Observable<Pais[]> {

    const url = `${this.API_URL}/region/${region}`;
    return this.http.get<Pais[]>(url, { params: this.httpParams })
      .pipe(
        tap(console.log)
      );
  }



}
