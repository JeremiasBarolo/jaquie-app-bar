import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {
  breadcrumbItems: string[] = ['Estadisticas', 'Inicio', 'Estadisticas'];
  estadisticas: any[] = [];
  profitPorMes: any[] = [];
  ultimos7Dias: any[] = [];
  costoTotalPorMes: any[] = [];
  recaudacionPorMes: any[] = [];
  // Configuración del gráfico
  chartOptions: any = {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories: [],
    },
    series: [
      {
        name: 'Profit',
        data: [],
      }
    ]
  };

  constructor(private estadisticasService: EstadisticaService) { }

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.estadisticasService.getAll().subscribe(
      (data) => {
        this.estadisticas = data;
        this.procesarDatosParaGrafico();
        this.procesarUltimos7Dias();
      },
      (error) => {
        console.error('Error al obtener las estadísticas:', error);
      }
    );
  }

  procesarDatosParaGrafico(): void {
    this.chartOptions.xaxis.categories = [];
    this.chartOptions.series[0].data = [];
    this.profitPorMes = []; 
    this.recaudacionPorMes = [];
    this.costoTotalPorMes = [];

    const datosAgrupados = this.estadisticas.reduce((acc, estadistica) => {
        const fecha = new Date(estadistica.createdAt);
        const mesIndex = fecha.getMonth(); 
        acc[mesIndex] = acc[mesIndex] || { profit: 0, recaudacion: 0, costo_total: 0 };
        acc[mesIndex].profit += estadistica.profit;
        acc[mesIndex].recaudacion += estadistica.recaudacion;
        acc[mesIndex].costo_total += estadistica.costo_total;
        return acc;
    }, {});

    Object.keys(datosAgrupados).forEach((mesIndex: string) => {
        const datos = datosAgrupados[mesIndex];
        const nombreMes = this.mesAsString(parseInt(mesIndex, 10));
        
        this.profitPorMes.push({ mes: nombreMes, profit: datos.profit });
        this.recaudacionPorMes.push({ mes: nombreMes, recaudacion: datos.recaudacion });
        this.costoTotalPorMes.push({ mes: nombreMes, costo_total: datos.costo_total });
        
        this.chartOptions.xaxis.categories.push(nombreMes);
    });

    this.profitPorMes.forEach((data: any) => {
        this.chartOptions.series[0].data.push(data.profit);
    });

    console.log(this.recaudacionPorMes);
}
  mesAsString(index: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[index];
  }

  procesarUltimos7Dias(): void {
    const estadisticasOrdenadas = this.estadisticas.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const ultimas7Estadisticas = estadisticasOrdenadas.slice(0, 7);

    const ultimos7Dias = ultimas7Estadisticas.map(estadistica => {
      const fecha = new Date(estadistica.createdAt);
      return {
        fecha: `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`,
        profit: estadistica.profit,
        recaudacion: estadistica.recaudacion,
        costo_total: estadistica.costo_total
      };
    });

    this.ultimos7Dias = ultimos7Dias;
  }

  generarEstadisticasAleatorias(): void {
    this.estadisticasService.create({ generarEstadisticas: true }).subscribe(
      (data) => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      },
      (error) => {
        console.error('Error al generar estadísticas:', error);
      }
    );
  }

  borrarTodasLasEstadisticas(): void {
    this.estadisticasService.create({ generarEstadisticas: true, tirarDatos: true }).subscribe(
      (data) => {
        setTimeout(() => {
          window.location.reload();
        }, 600);
      },
      (error) => {
        console.error('Error al borrar todas las estadísticas:', error);
      }
    );
  }
}
