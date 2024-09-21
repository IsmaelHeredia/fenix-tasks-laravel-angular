import { Component, inject, ChangeDetectionStrategy, Injectable, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WorkSpacesService } from '../../../services/work-spaces.service';
import { TasksService } from '../../../services/tasks.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter } from '@angular/material/core';
import moment from 'moment';
import { Location } from '@angular/common';

interface Estado {
  id: number;
  nombre: string;
}

interface Espacio {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-save-task',
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
    MatAutocompleteModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './save.component.html',
  styleUrl: './save.component.scss'
})
export class SaveTaskComponent {

  taskForm!: FormGroup;

  estados: Estado[] = [];

  id_espacio: number = 0;
  id_tarea: number = 0;

  myControl = new FormControl();
  options: Espacio[] = [];
  filteredOptions: Espacio[];

  nombre: string = "";
  descripcion: string = "";
  fecha_inicio: string = "";
  fecha_finalizado: string = "";
  id_estado: number = 0;

  constructor(
    public workspacesService: WorkSpacesService,
    public tasksService: TasksService,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _location: Location,
    private dateAdapter: DateAdapter<Date>) {

    this.filteredOptions = this.options.slice();
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {

    const param_id = this.activatedRoute.snapshot.paramMap.get('id_espacio');
    const param_id_tarea = this.activatedRoute.snapshot.paramMap.get('id_tarea');

    this.id_espacio = param_id ? Number(param_id) : 0;
    this.id_tarea = param_id_tarea ? Number(param_id_tarea) : 0;

    this.taskForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_finalizada: [''],
      id_estado: ['', Validators.required],
    });

    this.workspacesService.getListaEspacios().subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          this.options = res.datos;
        }
      },
      error: error => {
        console.log(error);
      }
    });

    this.tasksService.getEstados().subscribe({
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

    this.tasksService.getTarea(this.id_tarea).subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          const datos = res.datos;

          const fecha_inicio = datos.fecha_inicio ? new Date(moment(datos.fecha_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD').toString() + " 00:00:00") : null;
          const fecha_finalizada = datos.fecha_finalizada ? new Date(moment(datos.fecha_finalizada, 'DD/MM/YYYY').format('YYYY-MM-DD').toString() + " 00:00:00") : null;

          this.taskForm.patchValue(
            {
              id_espacio: datos.espacio.id,
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              fecha_inicio: fecha_inicio,
              fecha_finalizada: fecha_finalizada,
              id_estado: datos.estado.id
            }
          );

        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  submitForm(): void {

    if (this.taskForm?.valid) {

      const id = this.id_tarea;
      const values = this.taskForm.value;

      const id_espacio = this.id_espacio;
      const nombre = values.nombre;
      const descripcion = values.descripcion ? values.descripcion : null;
      const fecha_inicio = values.fecha_inicio ? values.fecha_inicio : null;
      const fecha_finalizada = values.fecha_finalizada ? values.fecha_finalizada : null;
      const id_estado = values.id_estado;

      const datos = {
        id_espacio: id_espacio,
        nombre: nombre,
        descripcion: descripcion,
        fecha_inicio: fecha_inicio,
        fecha_finalizada: fecha_finalizada,
        tiempo: 0,
        id_estado: id_estado
      }

      if (this.id_tarea == 0) {

        this.tasksService.postTarea(datos).subscribe({
          next: (res: any) => {
            const estado = res.estado;
            const mensaje = res.mensaje;
            if (estado == 1) {

              this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

              setTimeout(() => {
                this.router.navigateByUrl('dashboard/espacios/' + this.id_espacio + '/tareas');
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

        this.tasksService.putTarea(id, datos).subscribe({
          next: (res: any) => {
            const estado = res.estado;
            const mensaje = res.mensaje;
            if (estado == 1) {

              this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

              setTimeout(() => {
                this.router.navigateByUrl('dashboard/espacios/' + this.id_espacio + '/tareas');
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

  }

  returnBack() {
    this._location.back();
  }

}
