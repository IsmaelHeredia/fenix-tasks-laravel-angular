import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, model } from '@angular/core'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { TasksComponent } from '../../dashboard/tasks/tasks.component';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

export class Task {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public fecha_inicio: string,
    public fecha_finalizada: string,
    public tiempo: string,
    public id_estado: number,
  ) { }
}

export interface DialogData {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() id_espacio!: number;
  @Input() task!: Task;
  @Input() taskSelected: boolean = false;

  segundos: number = 0;
  minutos: number = 0;
  horas: number = 0;

  control: any;

  tiempo_total: string = "00:00:00";

  interval: any;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private compOne: TasksComponent) { }

  ngOnInit(): void {

    if (this.task.tiempo != null && this.task.tiempo != "0") {
      let split_tiempo = this.task.tiempo.split(':');

      this.segundos = split_tiempo[2] ? Number(split_tiempo[2]) : 0;
      this.minutos = split_tiempo[1] ? Number(split_tiempo[1]) : 0;
      this.horas = split_tiempo[0] ? Number(split_tiempo[0]) : 0;

      this.tiempo_total = this.task.tiempo;
    }

  }

  actualizarTiempo(): void {

    const datos = {
      tiempo: this.tiempo_total
    }

    this.tasksService.putTiempo(this.task.id, datos).subscribe(
      {
        next: (res: any) => {
          const estado = res.estado;
          if (estado == 1) {
            const datos = res.datos;
          }
        },
        error: error => {
          console.log(error);
        }
      });

  }

  startTimer() {
    this.interval = setInterval(() => {

      let stringHoras = "";
      let stringMinutos = "";
      let stringSegundos = "";

      this.segundos++;

      if (this.segundos > 59) {
        this.minutos++;
        this.segundos = 0;
        this.actualizarTiempo();
      }

      if (this.minutos > 59) {
        this.horas++;
        this.minutos = 0;
      }
      if (this.horas > 24) {
        this.horas = 0;
      }

      if (this.segundos < 10) {
        stringSegundos = "0" + this.segundos;
      } else {
        stringSegundos = String(this.segundos);

      }
      if (this.minutos < 10) {
        stringMinutos = "0" + this.minutos;
      } else {
        stringMinutos = String(this.minutos);

      }
      if (this.horas < 10) {
        stringHoras = "0" + this.horas;
      } else {
        stringHoras = String(this.horas);
      }

      this.tiempo_total = stringHoras + ":" + stringMinutos + ":" + stringSegundos;

    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  clickTimer(id: number): void {
    if (!this.taskSelected) {
      this.taskSelected = true;
      this.startTimer();
    } else {
      this.taskSelected = false;
      this.pauseTimer();
      this.actualizarTiempo();
    }
  }

  readonly dialog = inject(MatDialog);

  openDialogConfirmDelete(id: number, nombre: string): void {

    const dialogRef = this.dialog.open(DialogConfirmDeleteDialog, {
      height: '20%',
      width: '60%',
      data: { id: id, nombre: nombre },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.compOne.loadTasks();
      }
    });
  }

}

@Component({
  selector: 'dialog-confirm-deleteTask-dialog',
  templateUrl: 'dialog-confirm-delete-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmDeleteDialog {

  readonly dialogRef = inject(MatDialogRef<DialogConfirmDeleteDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly space_id = model(this.data.id);
  readonly space_nombre = model(this.data.nombre);

  constructor(
    public tasksService: TasksService,
    private router: Router,
    private toastr: ToastrService) { }

  confirmDelete(id: number): void {

    this.tasksService.deleteTarea(id).subscribe({
      next: (res: any) => {
        const estado = res.estado;
        const mensaje = res.mensaje;
        if (estado == 1) {
          this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
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