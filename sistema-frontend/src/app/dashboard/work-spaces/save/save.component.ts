import { Component, inject, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { WorkSpacesService } from '../../../services/work-spaces.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter } from '@angular/material/core';
import { Location } from '@angular/common';
import moment from 'moment';

interface Estado {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-saveworkspace',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTableModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class SaveWorkSpaceComponent {

  isLinear = true;

  workspaceForm!: FormGroup;
  secondFormGroup!: FormGroup;

  estados: Estado[] = [];

  id_espacio: number = 0;

  nombre: string = '';
  descripcion: string = '';
  fecha_inicio: string = '';
  fecha_finalizado: string = '';
  id_estado: number = 1;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  barWidth: string = '0%';

  totalArchivosSubir: number = 0;
  totalArchivosSubidos: number = 0;
  subidoCorrectamente: boolean = false;
  listarImagenesSubidas: boolean = false;

  images: any = [];
  dataSource = this.images;
  displayedColumns: string[] = ['id', 'nombre', 'opcion'];

  uuid: string = uuidv4();

  urlImages: string = environment.imagesUrl;

  constructor(
    public workSpacesService: WorkSpacesService,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private _location: Location,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {

    const param_id = this.activatedRoute.snapshot.paramMap.get('id_espacio');

    this.id_espacio = param_id ? Number(param_id) : 0;

    this.workspaceForm = this._formBuilder.group({
      uuid: [this.uuid, Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_finalizado: [''],
      id_estado: ['', Validators.required],
    });

    if (this.id_espacio > 0) {
      this.workSpacesService.getEspacio(this.id_espacio).subscribe({
        next: (res: any) => {
          const estado = res.estado;
          if (estado == 1) {
            const datos = res.datos;
            this.uuid = datos.uuid;

            const fecha_inicio = datos.fecha_inicio ? new Date(moment(datos.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString() + " 00:00:00") : null;
            const fecha_finalizado = datos.fecha_finalizado ? new Date(moment(datos.fecha_finalizado, 'DD/MM/YYYY').format('YYYY-MM-DD').toString() + " 00:00:00") : null;

            this.workspaceForm.patchValue(
              {
                uuid: datos.uuid,
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                fecha_inicio: fecha_inicio,
                fecha_finalizado: fecha_finalizado,
                id_estado: datos.id_estado
              }
            );
            this.listarImagenes();
          }
        },
        error: error => {
          console.log(error);
        }
      });
    }

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.workSpacesService.getEstados().subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          this.estados = res.datos;
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  listarImagenes(): void {

    const datos = {
      uuid: this.uuid
    }

    this.workSpacesService.getEspacioImagenes(datos).subscribe({
      next: (res: any) => {
        const estado = res.estado;
        const mensaje = res.mensaje;
        if (estado == 1) {
          this.images = res.datos;
          this.listarImagenesSubidas = true;
          this.cd.detectChanges();
        } else {
          alert(mensaje);
        }
      },
      error: error => {
        this.toastr.error(error, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
        console.log(error);
      }
    });

  }


  imageUp(id: number): void {

    let lista = this.images;

    let data_imagen = lista.find((c: any) => c.id === id);
    let orden_imagen = data_imagen?.orden;

    let index_actual = 0;

    lista.forEach(function (valor: any, index: number) {
      if (valor.orden == orden_imagen) {
        index_actual = index;
      }
    });

    let index_anterior = index_actual - 1;

    if (typeof (lista[index_anterior]) !== "undefined") {
      let valor_anterior = lista[index_anterior];
      let valor_actual = lista[index_actual];
      lista[index_anterior] = valor_actual;
      lista[index_actual] = valor_anterior;
    }

    const datosNuevos = [...lista];

    this.images = datosNuevos;
  }

  imageDown(id: number): void {

    let lista = this.images;

    let data_imagen = lista.find((c: any) => c.id === id);
    let orden_captura = data_imagen?.orden;

    let index_actual = 0;

    lista.forEach(function (valor: any, index: number) {
      if (valor.orden == orden_captura) {
        index_actual = index;
      }
    });

    let index_siguiente = index_actual + 1;

    if (typeof (lista[index_siguiente]) !== "undefined") {
      let valor_siguiente = lista[index_siguiente];
      let valor_actual = lista[index_actual];
      lista[index_siguiente] = valor_actual;
      lista[index_actual] = valor_siguiente;
    }

    const datosNuevos = [...lista];

    this.images = datosNuevos;
  }

  openDialogConfirmDelete(id: number, nombre: string): void {
    let lista = this.images;

    let otraLista = Object.values(lista).filter((item: any) => item.id != id);

    const datosNuevos = [...otraLista];

    this.images = datosNuevos;
  }

  submitForm(): void {

    const id = this.id_espacio;
    const values = this.workspaceForm.value;

    const nombre = values.nombre;
    const descripcion = values.descripcion ? values.descripcion : null;
    const fecha_inicio = values.fecha_inicio ? values.fecha_inicio : null;
    const fecha_finalizado = values.fecha_finalizado ? values.fecha_finalizado : null;
    const id_estado = values.id_estado;
    const imagenes = this.images;

    const datos = {
      uuid: this.uuid,
      nombre: nombre,
      descripcion: descripcion,
      fecha_inicio: fecha_inicio,
      fecha_finalizado: fecha_finalizado,
      id_estado: id_estado,
      imagenes: imagenes
    }

    if (this.id_espacio == 0) {

      this.workSpacesService.postEspacio(datos).subscribe({
        next: (res: any) => {
          const estado = res.estado;
          const mensaje = res.mensaje;
          if (estado == 1) {

            this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

            setTimeout(() => {
              this.router.navigateByUrl('dashboard/espacios');
            }, Number(environment.timeoutRedirect));

          } else {
            this.toastr.warning(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
          }
        },
        error: error => {
          this.toastr.error(error, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
          console.log(error);
        }
      });

    } else {

      this.workSpacesService.putEspacio(id, datos).subscribe({
        next: (res: any) => {
          const estado = res.estado;
          const mensaje = res.mensaje;
          if (estado == 1) {

            this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

            setTimeout(() => {
              this.router.navigateByUrl('dashboard/espacios');
            }, Number(environment.timeoutRedirect));

          } else {
            this.toastr.warning(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
          }
        },
        error: error => {
          this.toastr.error(error, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
          console.log(error);
        }
      });

    }

  }

  upload(id_image: number, file: File): void {

    this.barWidth = '0%';

    this.progressInfos[id_image] = { value: 0, fileName: file.name };

    if (file) {

      let data = {
        uuid: this.uuid,
        imagen: file,
      };

      this.workSpacesService.postEspacioImagen(data).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[id_image].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.totalArchivosSubidos++;
            if (this.totalArchivosSubir == this.totalArchivosSubidos) {
              this.listarImagenesSubidas = true;
              this.listarImagenes();
              this.cd.detectChanges();
            }
          }
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.log(err);
          this.progressInfos[id_image].value = 0;
          this.totalArchivosSubidos++;
        }
      });
    }
  }

  uploadFiles(event: any): void {

    this.totalArchivosSubir = 0;
    this.totalArchivosSubidos = 0;
    this.listarImagenesSubidas = false;
    this.message = [];
    this.progressInfos = [];

    const selectedFiles = event.target.files;

    this.totalArchivosSubir = selectedFiles.length;

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        this.upload(i, selectedFiles[i]);
      }
    }

  }

  returnBack() {
    this._location.back();
  }

}
