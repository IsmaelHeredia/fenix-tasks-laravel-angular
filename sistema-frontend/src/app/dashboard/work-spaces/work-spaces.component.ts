import { ChangeDetectionStrategy, Component, inject, signal, effect, model, Injectable } from '@angular/core';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { WorkSpacesService } from '../../services/work-spaces.service';
import { Observable } from 'rxjs/internal/Observable';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

import { setFilterSpaceName } from '../../states/filters/action/app.action';
import { selectFilterSpace } from '../../states/filters/selectors/app.selector';

import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';

interface Estado {
  id: number;
  nombre: string;
}

export interface DialogData {
  id: number;
  nombre: string;
}

@Injectable()
export class SpanishPaginatorIntl extends MatPaginatorIntl {
  override changes = new Subject<void>();

  override itemsPerPageLabel = 'Items por Página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  };
}

@Component({
  selector: 'app-work-spaces',
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
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: SpanishPaginatorIntl,
  }],
  templateUrl: './work-spaces.component.html',
  styleUrl: './work-spaces.component.scss'
})
export class WorkSpacesComponent {

  filterForm: any;
  workSpaces: any = [];
  dataSource = this.workSpaces;
  displayedColumns: string[] = ['nombre', 'tareas', 'fecha_inicio', 'fecha_finalizado', 'estado', 'dias', 'opcion'];
  total: number | undefined;
  pageSize: number | undefined;
  pageIndex: number | undefined;

  data: any;

  filters: any;
  filter_name: any;

  constructor(
    public workSpacesService: WorkSpacesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<any>) { }

  ngOnInit(): void {

    this.total = 0;
    this.pageSize = 0;
    this.pageIndex = 0;

    this.filters = this.store.pipe(select(selectFilterSpace));

    this.filters.subscribe((data: string) => {
      this.filter_name = data;
    });

    this.filterForm = this.formBuilder.group({
      buscarNombre: [this.filter_name],
    });

    this.loadSpaces();
  }

  loadSpaces(cantidad: number = 10, pagina: number = 1): void {

    const datos = {
      'nombre': this.filter_name,
      'cantidad': cantidad,
      'pagina': pagina
    }

    this.workSpacesService.getEspacios(datos).subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          const total = res.datos.total;
          const espacios = res.datos.data;
          this.total = total;
          this.pageSize = datos.cantidad;
          this.workSpaces = espacios;
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }

  filterSpaces(): void {

    const datosForm = this.filterForm.value;

    let buscarNombre = datosForm['buscarNombre'];

    this.store.dispatch(setFilterSpaceName({ space_name: buscarNombre }));

    this.loadSpaces();
  }

  clearFilter(): void {

    this.filterForm.patchValue({ buscarNombre: '' });

    this.store.dispatch(setFilterSpaceName({ space_name: '' }));

    this.loadSpaces();

  }

  changePage(e: any) {

    const pagina = e.pageIndex + 1;
    const cantidad = e.pageSize;

    this.loadSpaces(pagina, cantidad);
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
        this.loadSpaces();
      }
    });
  }

}

@Component({
  selector: 'dialog-confirm-delete-dialog',
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
    public workSpacesService: WorkSpacesService,
    private router: Router,
    private toastr: ToastrService) { }

  confirmDelete(id: number): void {

    this.workSpacesService.deleteEspacio(id).subscribe({
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

