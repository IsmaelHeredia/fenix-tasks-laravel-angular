import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

interface DatosFiltrarEspacios {
  nombre: string;
  cantidad: number;
  pagina: number;
}

interface DatosEspacio {
  uuid: string;
  nombre: string;
  descripcion: string | null;
  fecha_inicio: string | null;
  fecha_finalizado: string | null;
  id_estado: string;
  imagenes: []
}

interface DatosEspacioImagen {
  uuid: any;
  imagen: any;
}

interface DatosFiltrarEspacioImagenes {
  uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkSpacesService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem(environment.sessionName)
    })
  }

  constructor(private httpClient: HttpClient) { }

  getEstados(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/espacios/estados', this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  getListaEspacios(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/espacios', this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  getEspacios(datos: DatosFiltrarEspacios): Observable<DatosFiltrarEspacios> {
    return this.httpClient.post<DatosFiltrarEspacios>(environment.apiUrl + '/espacios/listar', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  getEspacio(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/espacios/' + id, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  postEspacio(datos: DatosEspacio): Observable<DatosEspacio> {
    return this.httpClient.post<DatosEspacio>(environment.apiUrl + '/espacios', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  putEspacio(id: number, datos: DatosEspacio): Observable<DatosEspacio> {
    return this.httpClient.put<DatosEspacio>(environment.apiUrl + '/espacios/' + id, JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  deleteEspacio(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/espacios/' + id, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  postEspacioImagen(datos: DatosEspacioImagen): Observable<any> {

    let formData = new FormData();
    formData.append('uuid', datos.uuid);
    formData.append('imagen', datos.imagen);

    return this.httpClient
      .post(environment.apiUrl + '/espacios/imagenes', formData, {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + sessionStorage.getItem(environment.sessionName)
          },
        )
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  getEspacioImagenes(datos: DatosFiltrarEspacioImagenes): Observable<DatosFiltrarEspacioImagenes> {
    return this.httpClient.post<DatosFiltrarEspacioImagenes>(environment.apiUrl + '/espacios/imagenes/listar', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(() => this.errorMsg);
        })
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
