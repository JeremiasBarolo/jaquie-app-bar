import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VerPdfService } from '../../services/ver-pdf.service';
import { ActivatedRoute } from '@angular/router';
import { EstadisticaService } from '../../services/estadistica.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ver-pdf',
  templateUrl: './ver-pdf.component.html',
  styleUrl: './ver-pdf.component.css'
})
export class VerPdfComponent implements OnInit {
  id: number = 0
  data:any[] = []
  dia: any
  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;
 

  constructor(
    private verPdfService: VerPdfService, 
    private aRoute: ActivatedRoute,
    private estadisticaService: EstadisticaService
  ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    console.log('id',this.id);
    
    this.verPdfService.getAll(this.id).subscribe(data => {
     this.data = data
    })

    this.estadisticaService.getById(this.id).subscribe(data => {
      this.dia = data
     })
 
  }

  calcularTotal(data?: any): any{
    let subtotal = 0
    subtotal += data?.cantidad * data?.precio;
      
    

    return subtotal;
  }

  generarDocumento(): void {
    const data = this.pdfContent.nativeElement;
  
    html2canvas(data, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight - pageHeight;
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
  
      if (heightLeft > 0) {
        let position = -pageHeight;
  
        while (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          position -= pageHeight;
          heightLeft -= pageHeight;
        }
      }
  
      pdf.save(`ticket-${this.dia.createdAt}.pdf`);
    });
  }
}
