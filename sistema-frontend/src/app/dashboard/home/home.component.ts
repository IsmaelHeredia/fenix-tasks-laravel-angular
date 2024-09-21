import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BaseChartDirective } from 'ng2-charts';
import { ChartsService } from '../../services/charts.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatListModule,
    BaseChartDirective,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  @ViewChildren(BaseChartDirective)
  charts!: QueryList<BaseChartDirective>;

  constructor(
    public chartService: ChartsService,
    private cd: ChangeDetectorRef) { }

  chart1_values: [] = [];
  chart1_labels: [] = [];

  chart2_values: [] = [];
  chart2_labels: [] = [];

  lista1: any[] = [];
  lista2: any[] = [];

  displayedColumns1: string[] = ['nombre', 'tiempo'];
  displayedColumns2: string[] = ['nombre', 'tiempo'];
  dataSource1 = this.lista1;
  dataSource2 = this.lista2;

  loadCharts(): void {

    this.chartService.getReporte().subscribe({
      next: (res: any) => {
        const estado = res.estado;
        if (estado == 1) {
          const datos = res.datos;

          const espacios_mayor_tiempo = datos.espacios_mayor_tiempo;
          const espacios_menor_tiempo = datos.espacios_menor_tiempo;
          const tareas_mayor_tiempo = datos.tareas_mayor_tiempo;
          const tareas_menor_tiempo = datos.tareas_menor_tiempo;

          this.chart1_labels = espacios_mayor_tiempo.map(
            (data: any) => {
              return data.nombre
            })

          this.chart1_values = espacios_mayor_tiempo.map(
            (data: any) => {
              return data.dias
            })

          this.chart2_labels = espacios_menor_tiempo.map(
            (data: any) => {
              return data.nombre
            })

          this.chart2_values = espacios_menor_tiempo.map(
            (data: any) => {
              return data.dias
            })

          this.lista1 = tareas_mayor_tiempo;
          this.lista2 = tareas_menor_tiempo;

          this.pieChartDataEspacio1.labels = this.chart1_labels;
          this.pieChartDataEspacio1.datasets = [
            {
              data: this.chart1_values,
            },
          ];

          this.pieChartDataEspacio2.labels = this.chart2_labels;
          this.pieChartDataEspacio2.datasets = [
            {
              data: this.chart2_values,
            },
          ];

          this.charts.forEach((child: any) => {
            child.chart.update()
          });

          this.cd.detectChanges();
        }
      },
      error: error => {
        console.log(error);
      }
    });

  }

  ngOnInit(): void {

    this.loadCharts();

  }

  public pieChartOptionsEspacio1: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 10 },
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.formattedValue;
            let name = context.label;
            return 'Cantidad de días : ' + value;
          }
        }
      }
    },
  };

  public pieChartDataEspacio1: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  public pieChartTypeEspacio1: ChartType = 'pie';

  public pieChartOptionsEspacio2: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true, padding: 10 },
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.formattedValue;
            let name = context.label;
            return 'Cantidad de días : ' + value;
          }
        }
      }
    },
  };

  public pieChartDataEspacio2: ChartData<'pie', number[], string | string[]> = {
    labels: this.chart2_labels,
    datasets: [
      {
        data: this.chart2_values,
      },
    ],
  };

  public pieChartTypeEspacio2: ChartType = 'pie';
}
