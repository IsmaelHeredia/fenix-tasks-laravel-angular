import { ChangeDetectorRef, Component, Renderer2, signal } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../services/auth/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

import { Store, createSelector, select } from '@ngrx/store';
import { Theme } from '../theme/theme';
import { ThemeService } from '../theme/theme.service';
import { AppState } from '../states/app.state';
import { selectCurrentTheme } from '../states/themes/selectors/app.selector';
import { setTheme } from '../states/themes/action/app.action';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm: any;
  themes: any;

  currentTheme: string = '';

  constructor(
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private themeService: ThemeService,
    private renderer2: Renderer2,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>) { }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  initialize() {

    this.themes = this.store.pipe(select(selectCurrentTheme));

    this.themes.subscribe((data: string) => {
      this.currentTheme = data;
    });

    if (this.currentTheme == 'light') {
      this.themeService.setTheme(Theme.LIGHT, this.renderer2);
    }

    if (this.currentTheme == 'dark') {
      this.themeService.setTheme(Theme.DARK, this.renderer2);
    }

    this.cd.detectChanges();
  }

  clickChangeTheme() {
    if (this.currentTheme == 'light') {
      this.themeService.setTheme(Theme.DARK, this.renderer2);
      this.store.dispatch(setTheme({ mode: 'dark' }));
    } else {
      this.themeService.setTheme(Theme.LIGHT, this.renderer2);
      this.store.dispatch(setTheme({ mode: 'light' }));
    }
    this.cd.detectChanges();
  }

  changeTheme(theme: any) {
    this.themeService.setTheme(theme, this.renderer2);
  }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });

    this.initialize();

  }

  submitForm(): void {
    if (this.userForm?.valid) {
      this.loginService.login(this.userForm.value).subscribe(
        {
          next: (res: any) => {
            const estado = res.estado;
            const mensaje = res.mensaje;
            if (estado == 1) {
              const token = res.datos;
              sessionStorage.setItem(environment.sessionName, token);

              this.toastr.success(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

              setTimeout(() => {
                this.router.navigateByUrl('dashboard/home');
              }, Number(environment.timeoutRedirect));

            } else {
              this.toastr.warning(mensaje, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
            }
          },
          error: error => {
            this.toastr.error(error, '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });
            console.log(error);
          }
        }
      );
    }
  }

}
