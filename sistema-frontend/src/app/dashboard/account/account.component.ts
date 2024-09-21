import { Component, signal } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  userForm: any;

  constructor(
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hideNew = signal(true);

  clickEventNew(event: MouseEvent) {
    this.hideNew.set(!this.hideNew());
    event.stopPropagation();
  }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      nuevo_usuario: ['', Validators.required],
      clave: ['', Validators.required],
      nueva_clave: ['', Validators.required],
    });

    this.accountService.getDatos().subscribe({
      next: (res: any) => {
        console.log("res", res);
        const estado = res.estado;
        if (estado == 1) {
          const datos = res.datos;
          this.userForm.patchValue(
            {
              usuario: datos.username
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
    if (this.userForm?.valid) {
      this.accountService.postCambios(this.userForm.value).subscribe({
        next: (res: any) => {
          const estado = res.estado;
          const mensaje = res.mensaje;
          if (estado == 1) {

            sessionStorage.setItem(environment.sessionName, "");

            this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

            setTimeout(() => {
              this.router.navigateByUrl('/ingreso');
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
