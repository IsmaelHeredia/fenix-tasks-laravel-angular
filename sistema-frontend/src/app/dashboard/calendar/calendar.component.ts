import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarModule,
  CalendarView,
} from 'angular-calendar';

import { CalendarService } from '../../services/calendar.service';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, MatButtonToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  constructor(
    public calendarService: CalendarService,
    private cd: ChangeDetectorRef) { }

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = 'es';

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  events: CalendarEvent[] = [];

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  refresh = new Subject<void>();

  loadEvents(): void {

    this.calendarService.getFechas().subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          const datos = res.datos;
          const espacios_iniciados = datos.espacios_iniciados;
          const espacios_terminados = datos.espacios_terminados;
          const tareas_iniciadas = datos.tareas_iniciadas;
          const tareas_terminadas = datos.tareas_terminadas;

          const listaEventos: { start: Date; title: any; color: any }[] = [];

          espacios_iniciados.forEach((valor: any, index: number) => {
            const title = 'Inicio de espacio ' + valor.nombre;
            const start = new Date(valor.fecha_inicio);
            const color = this.colors.blue;
            listaEventos.push({ start: start, title: title, color: color });
          });

          espacios_terminados.forEach((valor: any, index: number) => {
            const title = 'Fin de espacio ' + valor.nombre;
            const start = new Date(valor.fecha_finalizado);
            const color = this.colors.red;
            listaEventos.push({ start: start, title: title, color: color });
          });

          tareas_iniciadas.forEach((valor: any, index: number) => {
            const title = 'Inicio de tarea ' + valor.nombre;
            const start = new Date(valor.fecha_inicio);
            const color = this.colors.blue;
            listaEventos.push({ start: start, title: title, color: color });
          });

          tareas_terminadas.forEach((valor: any, index: number) => {
            const title = 'Fin de tarea ' + valor.nombre;
            const start = new Date(valor.fecha_finalizada);
            const color = this.colors.red;
            listaEventos.push({ start: start, title: title, color: color });
          });

          this.events = listaEventos.map(
            (evt: any) => {
              return { start: evt.start, title: evt.title, color: evt.color }
            })

          this.cd.detectChanges();
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }

  ngOnInit(): void {
    this.loadEvents();
  }

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
  }
}