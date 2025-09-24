//get --> consultar informacion
//post --> consultar informacion y para agregar informacion
//put --> actualizar informacion
//delete --> eliminar informacion 

// request --> es todo lo que el cliente envia al servicio
//response --> es lo que el api le devuelve al cliente


//200 --> todo ok
//400 --> advertencia 
//500 --> errores
//401 --> autenticacion
//403 --> autenticacion
//402  --> advertencia
//404 --> un recurso no existe

const express = require('express')
const Alumno = require('./Modelos/Alumno')
const Producto = require ('./Modelos/Producto')

const app = express()

app.use(express.json());

/////////// INICIO SECCION GET /////////////////
app.get('/alumno', async (req, resp) => {
    try {

        //select *from alumnos

        const respuesta = await Alumno.findAll();

        if (respuesta.length > 0) {
            resp.status(200).json(respuesta)
        }
        else {
            resp.status(400).json(respuesta);
        }

    } catch (error) {
        resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
})

app.get('/producto', async (req, resp) => {
    try {

        //select *from Producto
        const respuesta = await Producto.findAll();

        if (respuesta.length > 0) {
            resp.status(200).json(respuesta)
        }
        else {
            resp.status(400).json(respuesta);
        }

    } catch (error) {
        resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
})

/////////// FIN SECCION GET /////////////////

///////////INICIO SECCION POST /////////////////
app.post('/alumno', async (req, resp) => {
    try {

        console.log(req.body);

        //insert into alumno values(?,?,?,?)
        const respuesta = await Alumno.create(req.body);

        if (respuesta != null) {
            resp.status(200).json(respuesta)
        }
        else {
            resp.status(400).json(respuesta);
        }

    } catch (error) {
        resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
});

app.post('/producto', async (req, resp) => {
    try {

        console.log(req.body);

        //insert into product values(?,?,?,?)
        const respuesta = await Producto.create(req.body);

        if (respuesta != null) {
            resp.status(200).json(respuesta)
        }
        else {
            resp.status(400).json(respuesta);
        }

    } catch (error) {
        resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
});

/////////// FIN SECCION POST /////////////////

/////////// INICIO SECCION PUT /////////////////

app.put('/producto/:idproducto', async (req, resp) => {

    try {

        const [updated] = await Producto.update(req.body, {
            where: { idproducto: req.params.idproducto }
        });

        console.log(updated)
        if (!updated) {
            resp.status(200).json({'mensaje':'Actualizado correctamente'})
        }
        else {
            resp.status(400).json({'mensaje':'No existe el registro'})
        }

    } catch (error) {
        resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })

    }
})

/////////// FIIN SECCION PUT /////////////////

/////////// INICIO SECCION DELETE /////////////////

app.delete('/producto/:idproducto', async(req,resp) =>{
    
    try {

        const deleted= await Producto.destroy({
            where: {idproducto: req.params.idproducto}
        })

          if (deleted) {
            resp.status(200).json({'mensaje':'Eliminado correctamente'})
        }
        else {
            resp.status(400).json({'mensaje':'No existe el registro'})
        }
        
    } catch (error) {
             resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
})

app.delete('/alumno/:idAlumno', async(req,resp) =>{
    
    try {

        const deleted= await Alumno.destroy({
            where: {idAlumno: req.params.idAlumno}
        })

          if (deleted) {
            resp.status(200).json({'mensaje':'Eliminado correctamente'})
        }
        else {
            resp.status(400).json({'mensaje':'No existe el registro'})
        }
        
    } catch (error) {
             resp.status(500).json({ 'mensjae': 'Ocurrio un errr', 'detalle': error })
    }
})

/////////// FIN SECCION DELETE /////////////////


app.listen(5000, () => {
    console.log('Aplicacion ejecutando en puerto 5000')
})
