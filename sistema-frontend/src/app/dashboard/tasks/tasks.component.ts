import { ChangeDetectionStrategy, Component, inject, signal, effect, model } from '@angular/core';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TaskComponent } from '../../components/task/task.component';
import { ToastrService } from 'ngx-toastr';

import { setFilterTaskName } from '../../states/filters/action/app.action';
import { selectFilterTask } from '../../states/filters/selectors/app.selector';

import { Store, select } from '@ngrx/store';

interface Estado {
  id: number;
  nombre: string;
}

export interface DialogData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    TaskComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  filterForm: any;
  tasks: any = [];

  data: any;

  filters: any;
  filter_name: any;

  item = 1;

  nombre_espacio: string = "";
  id_espacio: number = 0;

  constructor(
    public tasksService: TasksService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<any>) { }

  ngOnInit(): void {

    const param_id = this.activatedRoute.snapshot.paramMap.get('id_espacio');

    this.id_espacio = param_id ? Number(param_id) : 0;

    this.filters = this.store.pipe(select(selectFilterTask));

    this.filters.subscribe((data: string) => {
      this.filter_name = data;
    });

    this.filterForm = this.formBuilder.group({
      buscarNombre: [this.filter_name],
    });

    this.loadTasks();
  }

  loadTasks(): void {

    const datos = {
      'id_espacio': this.id_espacio,
      'nombre': this.filter_name
    }

    this.tasksService.getTareas(datos).subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          const space = res.datos.espacio;
          const tasks = res.datos.tareas;
          this.nombre_espacio = space.nombre;
          this.tasks = tasks;
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }

  reloadTasks(): void {
    this.router.navigateByUrl('dashboard/tareas');
  }

  filterSpaces(): void {

    const datosForm = this.filterForm.value;

    let buscarNombre = datosForm['buscarNombre'];

    this.store.dispatch(setFilterTaskName({ task_name: buscarNombre }));

    this.loadTasks();

  }

  clearFilter(): void {

    this.filterForm.patchValue({ buscarNombre: '' });

    this.store.dispatch(setFilterTaskName({ task_name: '' }));

    this.loadTasks();

  }
}
