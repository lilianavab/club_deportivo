import fs from 'fs';
// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";

// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// Ruta al archivo de datos de deportes
const path = `${__dirname}/../db/deportes.json`;

// Arreglo para almacenar los datos de deportes
let deportes = [];


// Controlador para la creación de deporte
export const postManejadorHandler = (req, res) => {
    console.log(req.body);
    const { nombre, precio } = req.body;
    try {
      let deporte = { nombre, precio };
  
      const data = JSON.parse(fs.readFileSync(path, 'utf8'));
      console.log('Listado de la data:', data);
  
      data.deportes.push(deporte);
  
      fs.writeFileSync(path, JSON.stringify(data));
  
      console.log('Listado de la data:', data);
  
      res.status(200).json({ message: 'Deporte almacenado con éxito', nuevoDeporte: deporte });
    } catch (error) {
      console.error('Error al agregar deporte:', error);
      res.status(400).json({ message: error.message });
    }
  };

// Controlador para obtener datos de deportes
export const getManejadorHandler = (req, res) => {
    try {
     
        fs.readFile(path, (error, json)=>{
            if(error){
                res.status(500).send({ message: 'Error al leer el archivo de deportes', error: error.message});
            }else{
                res.status(200).send(JSON.parse(json))
            }
        })
        
    } catch (error) {
        res.status(500).send({ message: 'Error al leer el archivo de deportes', error: error.message});
    }
}

// Controlador para editar datos de deportes
export const putManejadorHandler = (req, res) => {
    try {
        const { nombre, precio } = req.body;
 
        let { deportes } = JSON.parse(fs.readFileSync(path, "utf8"));
        if (deportes) {
            deportes.forEach((e) => {
                if (e.nombre === nombre) {
                    e.precio = precio;
                }
            });

            fs.writeFileSync(path, JSON.stringify({ deportes }));
            res.status(200).send(`Se actualiza el precio del deporte ${nombre}`);
        } 
    } catch (error) {
        console.log('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Controlador para eliminar datos de deportes
export const deleteManejadorHandler = (req, res) => {
const { nombre } = req.params;
  try {
    let { deportes } = JSON.parse(fs.readFileSync(path, "utf-8"));

    const posicion = deportes.findIndex((e) => e.nombre === nombre);

    if (posicion !== -1) {
      deportes.splice(posicion, 1);
      fs.writeFileSync(path, JSON.stringify({ deportes }));
      res.status(200).json({ message: 'Deporte eliminado completamente' });
    } else {
      res.status(404).json({ message: 'No se encontró el deporte' });
    }
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}