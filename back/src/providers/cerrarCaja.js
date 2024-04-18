
var models = require('../models');
var models = require('../models');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const {listAllmaestro_articulos, listOnemaestro_articulos} = require('./maestro_articulos');

// <=================== fecha de realizacion =================>
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');





const cerrarCaja = async () => {
    try {
        const maestros = await listAllmaestro_articulos();
        // const mesas = await listAllventa();
        const mesas = await models.venta.findAll({
                include: [
                    {
                        model: models.maestro_articulos,
                        include: [
                            {
                                model: models.pedido_produccion,
                                include: [
                                    {
                                        model: models.maestro_articulos,
                                        attributes: ['descripcion', 'costo_unitario' ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        let costoTotal = 0
        let recaudacionTotal = 0



    // <=================================== Costo Total =====================================>
        // for (const maestroArticulo of maestros) {
        //     let costoTotalMesa = 0;

    
        //     for (const pedidoProduccion of maestroArticulo.pedido_produccions) {
                
        //         if (maestroArticulo.tipo_articulo.description === 'Comidas') {
        //             costoTotalMesa += pedidoProduccion.cant_requerida * maestroArticulo.costo_unitario;
        //         } else {
                    
        //             for (const receta of maestroArticulo.receta) {
        //                 const disponibilidadArticulo = receta.disponibilidad_articulo;
        //                 const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;
        //                 const cantidadNecesaria = receta.cant_necesaria;
        //                 const totalArticulo = costoUnitarioArticulo*cantidadNecesaria
        //                 const totalPedido = pedidoProduccion.cant_requerida * totalArticulo;
        //                 costoTotalMesa += totalPedido;
        //             }
        //         }
        //     }

            
        //     costoPorMesa.push({ id: maestroArticulo.id, costo: costoTotalMesa });
        // }

        await mesas.forEach(element => {
            costoTotal += element.precio;
            return costoTotal;
        })
    // <=================================== Final de  Costo Total =====================================>


    // <========================= Recaudacion =============================>
            await mesas.forEach(element => {
                recaudacionTotal += element.total;
                console.log(recaudacionTotal);
                return recaudacionTotal;
            })
    // <========================= Final Recaudacion =============================>

    // <========================= Ganancia =============================>

        let ganacia = recaudacionTotal - costoTotal;

    // // <========================= Final Ganancia =============================>





    // <================ Creacion de Estadistica ===========================>
    await models.estadistica.create({
        recaudacion: recaudacionTotal,
        costo_total: costoTotal,
        profit: ganacia,
    })




    // ACA VA LA INTEGRACION DEL PDF
    generarPdf(maestros, recaudacionTotal, costoTotal, ganacia)

    // <=================== Eliminar Pedidos ===========================>
    await models.pedido_produccion.destroy({
        where: { estado: 'FINALIZADO' }
    });

    await models.venta.destroy({
        where: { estado: 'FINALIZADO' }
    });




    return {recaudacion: recaudacionTotal, costo: costoTotal, ganancia: ganacia}
        
    } catch (error) {
        console.error('Error al cerrar la caja:', error);
        throw error;
    }
};


const calcularCosto = async (maestros) => {
    let costoTotalMesa = [];

    for (const maestroArticulo of maestros) {
        let costoMesa = []
        let costoArticulo = 0


        const tipo = await models.tipo_articulo.findByPk(maestroArticulo.tipoId);
        
        if (tipo.description === 'Comidas') {
            costoMesa.push(maestroArticulo.pedido_produccion.cant_requerida * maestroArticulo.costo_unitario);
        } else {
            let especifico = await listOnemaestro_articulos(maestroArticulo.id)
            for (const receta of especifico.receta) {
                const disponibilidadArticulo = receta.disponibilidad_articulo;
                const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;
                const cantidadNecesaria = receta.cant_necesaria;
                costoArticulo += costoUnitarioArticulo * cantidadNecesaria
            }

            costoMesa.push(costoArticulo*maestroArticulo.pedido_produccion.cant_requerida );
        }

        costoTotalMesa.push(costoMesa);
    }


    let sumaTotal = 0;

        for (const arrayInterno of costoTotalMesa) {
            for (const valor of arrayInterno) {
                sumaTotal += valor;
            }
        }
  

    return sumaTotal;
}


const generarPdf = async (maestro, subtotal,costo_total, ganancia) => {

    const generarPdf = async (maestro) => {
        const templatePath = path.join(__dirname, '../assets/index.html');
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        const documentosPath = path.join(__dirname, `../../../documentos/cajaCerrada_${day}_${month}_${year}_${hours}_${minutes}_${seconds}.pdf`)
        let fecha = `${day}/${month}/${year} : ${hours}:${minutes} hs`

        



        let mestro_articulos = maestro.filter((item) => item.tipo_articulo.description !== 'Insumos')

        let data = [];

        for (const maestro of mestro_articulos) {
            let costoTotal = 0;
            let cantidadTotal = 0;
    
            // Verificar el tipo de artículo
            if (maestro.tipo_articulo.description === 'Comidas') {
                // Calcular el costo total para Comidas
                for (const pedido of maestro.pedido_produccions) {
                    cantidadTotal += pedido.cant_requerida;
                    costoTotal += pedido.cant_requerida * maestro.costo_unitario;
                }
            } else if(maestro.tipo_articulo.description === 'Bebidas'){

                const Bebida = await models.Bebidas.findOne({
                        where: {nombre: maestro.id}
                    });

                let componentes =  await traerComponentesDeBebida(Bebida)

                for (const receta of componentes) {

                    let disponibilidadArticulo = await models.disponibilidad_articulos.findOne({
                        where:  { articuloId: receta.componente },
                        include: [
                            models.maestro_articulos,
                        ]

                    })

                    const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;

                    let alto = Bebida.cantidadTotalRecipiente * receta.cantidad
                    let total = alto / 100

                    let cant_principal = total / 1000
                     
                    
    
                    // Calcular el costo total del artículo en la receta
                    costoTotal += costoUnitarioArticulo * cant_principal;

                    
                }
            
            
                for (const pedido of maestro.pedido_produccions) {
                    cantidadTotal += pedido.cant_requerida;
                }

                costoTotal = costoTotal*cantidadTotal
            
            }else {
                // Calcular el costo total para Productos Elaborados y Bebidas
                for (const receta of maestro.receta) {
                    const disponibilidadArticulo = receta.disponibilidad_articulo;
                    const costoUnitarioArticulo = disponibilidadArticulo.maestro_articulo.costo_unitario;
                    const cantidadNecesaria = receta.cant_necesaria;
    
                    // Calcular el costo total del artículo en la receta
                    costoTotal += costoUnitarioArticulo * cantidadNecesaria;
                }
    
                // Sumar la cantidad total usada
                for (const pedido of maestro.pedido_produccions) {
                    cantidadTotal += pedido.cant_requerida;
                }

                costoTotal = costoTotal*cantidadTotal
            }
    
            // Crear el objeto con la descripción del artículo, cantidad usada y costo unitario
            const item = {
                descripcion: maestro.descripcion,
                cantidadUsada: cantidadTotal,
                uni_medida: `${maestro.conversion_UM.uni_medida} - ${maestro.conversion_UM.seg_umedida}`,
                costoUnitario: maestro.costo_unitario,
                costoTotal: costoTotal,
                Subtotal: maestro.costo_unitario*cantidadTotal
            };
    
            // Agregar el objeto a la lista externa
            data.push(item);
        }
    
        
        console.log(data);
    
        const productosHTML = data.map((item) => {
                return `
                    <tr>
                        <td>${item.descripcion}</td>
                        <td>${item.cantidadUsada}</td>
                        <td>${item.uni_medida}</td>
                        <td>$${item.costoUnitario}</td>
                        <td>$${item.costoTotal}</td>
                        <td>$${item.Subtotal}</td>
                        
                    </tr>
                `;
            }).join('');


        
        
        
        const facturaHTML = templateContent
            .replace('{{productosHTML}}', productosHTML)
            .replace( '{{subtotalTotal}}', subtotal )
            .replace( '{{costoTotal}}', costo_total)
            .replace( '{{Profit}}', ganancia)
            .replace( '{{Fecha}}', fecha)


    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        
        await page.setContent(facturaHTML);
    
        
        
        await page.pdf({ path: documentosPath, format: 'A4' });
    
        await browser.close();
    
        return console.log('PDF generado');
    };
    
    
    generarPdf(maestro).then((pdfPath) => {
        console.log(`PDF generado en: ${pdfPath}`);
    }).catch((error) => {
        console.error(`Error al generar el PDF: ${error}`);
    });
}



module.exports = {
cerrarCaja, calcularCosto, generarPdf
};


const traerComponentesDeBebida = async (bebida ) => {

    let componentes = []
    

    for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
      if (bebida[key] !== null && bebida[`${key}Cantidad`] !== null) {
        componentes.push({
          componente: bebida[key],
          cantidad: bebida[`${key}Cantidad`]
        });
      }
    }

    return componentes
}