
// Requires
const express = require("express")
const { 
    TipoArticuloRouter,
    conversion_UMRouter,
    estadisticaRouter,
    personaRouter,
    usuariosRouter,
    maestro_articulosRouter,
    disponibilidad_articulosRouter,
    recetaRouter,
    ventaRouter,
    pedido_stockRouter,
    pedido_produccionRouter,
    bebidasRouter,
    loginRouter,
    agregarPedidoRouter,
    TipoFormaPagosRouter,
    verPdfRouter
    
 } = require('./routes')
const { initializeDB } = require('./db/initializeDB');
require('dotenv').config();
const cors = require("cors");
const {checkAdmin} = require('./db/createAdminEntity');
// const { generarPdf } = require("./services/documentos");


// App Creation
const app = express();
const PORT = process.env.PORT || 3001;

// Aplication Middlewares
app.use(express.json()) 
app.use(cors());

// Routes
app.use("/tipo_articulo", TipoArticuloRouter)
app.use("/conversion_UM", conversion_UMRouter)
app.use("/estadistica", estadisticaRouter)
app.use("/personas", personaRouter)
app.use("/usuarios", usuariosRouter)
app.use("/maestro_articulos", maestro_articulosRouter)
app.use("/disponibilidad_articulos", disponibilidad_articulosRouter)
app.use("/receta", recetaRouter)
app.use("/venta", ventaRouter)
app.use("/pedido_stock", pedido_stockRouter)
app.use("/pedido_produccion", pedido_produccionRouter)
app.use("/bebidas", bebidasRouter)
app.use("/login", loginRouter)
app.use("/tipo_forma_pago", TipoFormaPagosRouter)
app.use("/agregarPedido", agregarPedidoRouter)
app.use("/traerPedidos", agregarPedidoRouter)
app.use("/pedidosVenta", agregarPedidoRouter)
app.use("/ver-pdf", verPdfRouter)






app.listen(PORT, 
    async () => {
        await initializeDB();
        await checkAdmin();
        console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`);
})


