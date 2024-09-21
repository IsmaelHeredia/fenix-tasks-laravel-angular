import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

interface DatosFiltrarTareas {
  id_espacio: number | null;
  nombre: string;
}

interface DatosTarea {
  id_espacio: number;
  nombre: string;
  descripcion: string | null;
  fecha_inicio: string | null;
  fecha_finalizada: string | null;
  tiempo: any | null;
  id_estado: string;
}

interface DatosTiempo {
  tiempo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  errorMsg: string | undefined;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem(environment.sessionName)
    })
  }

  constructor(private httpClient: HttpClient) { }

  getEstados(): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/tareas/estados', this.httpOptions)
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

  getTareas(datos: DatosFiltrarTareas): Observable<DatosFiltrarTareas> {
    return this.httpClient.post<DatosFiltrarTareas>(environment.apiUrl + '/tareas/listar', JSON.stringify(datos), this.httpOptions)
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

  getTarea(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/tareas/' + id, this.httpOptions)
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

  postTarea(datos: DatosTarea): Observable<DatosTarea> {
    return this.httpClient.post<DatosTarea>(environment.apiUrl + '/tareas', JSON.stringify(datos), this.httpOptions)
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

  putTarea(id: number, datos: DatosTarea): Observable<DatosTarea> {
    return this.httpClient.put<DatosTarea>(environment.apiUrl + '/tareas/' + id, JSON.stringify(datos), this.httpOptions)
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

  deleteTarea(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/tareas/' + id, this.httpOptions)
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

  putTiempo(id: number, datos: DatosTiempo): Observable<DatosTiempo> {
    return this.httpClient.put<DatosTiempo>(environment.apiUrl + '/tareas/' + id + '/tiempo', JSON.stringify(datos), this.httpOptions)
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
