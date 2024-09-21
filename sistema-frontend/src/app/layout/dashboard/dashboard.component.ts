import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

import { Theme } from '../../theme/theme';
import { ThemeService } from '../../theme/theme.service';
import { select, Store } from '@ngrx/store';
import { selectCurrentTheme } from '../../states/themes/selectors/app.selector';
import { setTheme } from '../../states/themes/action/app.action';
import { AppState } from '../../states/app.state';
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private breakpointObserver = inject(BreakpointObserver);

  themes: any;
  currentTheme: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private themeService: ThemeService,
    private renderer2: Renderer2,
    private cd: ChangeDetectorRef,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initialize();
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  readonly dialog = inject(MatDialog);

  about(): void {
    this.dialog.open(DialogAbout, {
      height: '30%',
      width: '60%'
    });
  }

  logout(): void {

    sessionStorage.setItem(environment.sessionName, "");

    this.toastr.success('La sesión fue cerrada', '', { timeOut: environment.timeoutToast, positionClass: 'toast-bottom-center' });

    setTimeout(() => {
      this.router.navigateByUrl('/ingreso');
    }, Number(environment.timeoutRedirect));
  }
}

@Component({
  selector: 'dialog-about',
  templateUrl: 'dialog-about.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAbout {

  readonly dialogRef = inject(MatDialogRef<DialogAbout>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor() { }

}
