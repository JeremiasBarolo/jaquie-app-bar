import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit {
  breadcrumbItems: string[] = ['Estadisticas','Inicio', 'Estadisticas'];
  estadisticas: any[] = [];
  profitPorMes: any[] = [];
  ultimos7Dias: any[] = [];

  // Configuración del gráfico
  chartOptions: any = {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories: [], // Aquí se llenarán las fechas
    },
    series: [
      {
        name: 'Profit',
        data: [], // Aquí se llenarán los profit
      }
    ]
  };

  constructor(private estadisticasService: EstadisticaService) { }

  ngOnInit(): void {
    this.obtenerEstadisticas();
    this.procesarUltimos7Dias()
  }

  obtenerEstadisticas(): void {
    this.estadisticasService.getAll().subscribe(
      (data) => {
        this.estadisticas = data;
        this.procesarDatosParaGrafico();
      },
      (error) => {
        console.error('Error al obtener las estadisticas:', error);
      }
    );
  }
  

  procesarDatosParaGrafico(): void {
    
    this.chartOptions.xaxis.categories = [];
    this.chartOptions.series[0].data = [];
    this.profitPorMes = []; 
  
    
    const datosAgrupados = this.estadisticas.reduce((acc, estadistica) => {
      const fecha = new Date(estadistica.createdAt);
      const mes = fecha.toLocaleString('default', { month: 'short' }); 
      const mesIndex = fecha.getMonth(); 
      acc[mesIndex] = acc[mesIndex] || [];
      acc[mesIndex].push(estadistica.profit);
      return acc;
    }, []);
  
    
    datosAgrupados.forEach((datos: any[], index: number) => {
      const profitTotal = datos.reduce((total, profit) => total + profit, 0);
      const nombreMes = this.mesAsString(index);
      this.profitPorMes.push({ mes: nombreMes, profit: profitTotal });
      
      this.chartOptions.xaxis.categories.push(nombreMes);
    });
  
    
    this.profitPorMes.forEach((data: any) => {
      this.chartOptions.series[0].data.push(data.profit);
    });
  }
  
  

  
  mesAsString(index: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[index];
  }

  procesarUltimos7Dias(): void {
    const fechaActual = new Date();
    const ultimos7Dias = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date(fechaActual);
      fecha.setDate(fecha.getDate() - i);
      const fechaString = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      const estadistica = this.estadisticas.find(stat => {
        const estadisticaFecha = new Date(stat.createdAt);
        return (
          estadisticaFecha.getDate() === fecha.getDate() &&
          estadisticaFecha.getMonth() === fecha.getMonth() &&
          estadisticaFecha.getFullYear() === fecha.getFullYear()
        );
      });
      const profit = estadistica ? estadistica.profit : 0;
      ultimos7Dias.push({ fecha: fechaString, profit: profit });
    }
    this.ultimos7Dias = ultimos7Dias;
  }
}
  

