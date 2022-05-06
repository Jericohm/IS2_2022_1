var express = require('express');
var router = express.Router();
// Simular base de datos
var tablaLibros = {'id':1, 'titulo':'el perfume', 'autor':'Patrik Sûskind'};
var tablaLibros2 = [
  {'id':1, 'titulo':'El Perfume', 'autor':'Patrik Sûskind'},
  {'id':2, 'titulo':'El Hobbit', 'autor':'Tolkien'},
  {'id':3, 'titulo':'La Biblia', 'autor':'Apostoles'}
];

router.get('/', function(req, res, next) {
  // Aquí se realiza la consulta a BD
  res.status(200).json(tablaLibros2);
});

// Solicitud de datos especificos
router.get('/:idLibro', (req, res, next)=>{
  // Aquí se realiza la consulta a BD
  var id = req.params.idLibro;

  res.status(200).json(tablaLibros2[id-1]);
});

router.post('/:idLibro', (req, res, next)=>{
  res.status(400).json({'error':'Operación no permitida'});
});

router.post('/', (req, res, next)=>{

  console.log(req.body);
  var libro = {
    'id':tablaLibros2[tablaLibros2.length-1]['id']+1,
    'titulo':req.body.titulo,
    'autor':req.body.autor
  };
  //  insert en CD del objeto
  tablaLibros2.push(libro);
  // Respuesta de DB al cliente
  res.status(200).json(tablaLibros2[tablaLibros2.length-1]);
});

router.patch('/:idLibro', (req, res, next)=>{
  var id = req.params.idLibro;
  //tablaLibros2[req.body.id]['titulo'] = req.body.titulo;
  tablaLibros2[id-1]['titulo'] = req.body.titulo;
  tablaLibros2[id-1]['autor'] = req.body.autor;
  res.status(200).json({'mensaje':"Actualizado"});
});

router.delete('/:idLibro', (req, res, next)=>{
  var id = req.params.idLibro;
  //tablaLibros2[req.body.id]['titulo'] = req.body.titulo;
  tablaLibros2.pop(tablaLibros2[id-1]);
  res.status(200).json({'mensaje':"Eliminado"});
});


module.exports = router;
