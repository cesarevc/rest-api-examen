'use strict'

var validator = require('validator');
var Person = require('./../models/person');



var controller = {
    add: (req, res) => {

        // receive data request
        var params = req.body;

        // validate data
        try {
            var validateName = !validator.isEmpty(params.name);
            var validateAge = !validator.isEmpty(params.age);
            var validateSex = !validator.isEmpty(params.sex);
            var validateCode = !validator.isEmpty(params.code);

        } catch (e) {
            return res.status(400).send({
                message: 'Hubo un error, faltan datos',
            });
        }


        if(validateName && validateAge && validateSex && validateCode) {

            // create object
            var person = new Person();
            // assign values
            person.name = params.name;
            person.age = params.age;
            person.sex = params.sex;
            person.code = params.code;
            // save in db
            person.save((err, personStored) => {
                if(err || !personStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'el articulo no se ah guardado',
                    });
                }
                
                // SUCCESS response to request
                return res.status(200).send({
                    status: 'success',
                    payload: { 
                        message: 'Persona agregada con exito',
                        person
                    }
                });

            });            
        }        
    },
    update: (req, res) => {
        // pick up person id
        var idPerson = req.params.id;

        // receive person new data
        var params = req.body;

        // validate data
        try {
            var validateName = !validator.isEmpty(params.name);
            var validateAge = !validator.isEmpty(params.age);
            var validateSex = !validator.isEmpty(params.sex);
            var validateCode = !validator.isEmpty(params.code);

        } catch (e) {
            return res.status(404).send({
                status: 'error',
                message: 'No se ah podido modificar, hubo un error en los datos'
            });
        }


        if(validateName && validateAge && validateSex && validateCode) {
            // find and update person
            Person.findByIdAndUpdate({_id: idPerson}, params, {new: true}, (err, personUpdated) => {

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });     
                }

                if (!personUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'hubo un error'
                    });
                }

                // SUCCESS response to request
                return res.status(200).send({
                    status: 'success',
                    payload: { 
                        message: 'Persona actualizada con exito',
                        person: personUpdated
                    }
                });
            });
        }
    },
    list: (req, res) => {
        var query = Person.find({});

        query.sort('-_id').exec((err, persons) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al devolver la lista de personas'
                });    
            }

            if(!persons){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay personas para mostrar'
                });    
            }
            
            // SUCCESS response to request
            return res.status(200).send({
                status: 'success',
                payload: { 
                    message: 'Listado de personas',
                    persons
                }
            });

        });

    },
    query: (req, res) => {
        //pick up person id
        var idPerson = req.params.id;

        //validate id
        if(!idPerson || idPerson == null) {
            return res.status(404).send({
                status: 'error',
                message: 'La persona no existe'
            }); 
        }

        //find person
        Person.findById(idPerson, (err, person) => {

            if(err || !person) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Persona no encontrada'
                }); 
            }

            // SUCCESS response to request
            return res.status(200).send({
                status: 'success',
                payload: { 
                    message: 'Persona encontrada',
                    person
                }
            }); 
        });
    },
    remove: (req, res) => {
        // pick up person id
        var idPerson = req.params.id;
        // find person and set state
        Person.findOneAndUpdate({_id: idPerson}, {state: 0}, {new:true}, (err, personUpdated) => {
            if(err || !personUpdated) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al borrar persona'
                });
            }
                        
            // SUCCESS response to request
            return res.status(200).send({
                status: 'success',
                payload : {
                    message: 'La persona ah sido borrada exitosamente',
                    person: personUpdated
                }
            });
        });
    },
    delete: (req, res) => {
        // pick up person id
        var idPerson = req.params.id;
        // find and delete person
        Person.findOneAndDelete({_id: idPerson}, (err, personRemoved) => {
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                }); 
            }

            if(!personRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe una persona con ese id'
                }); 
            }
            
            // SUCCESS response to request
            return res.status(200).send({
                status: 'success',
                payload: { 
                    message: 'Persona borrada con exito',
                    person: personRemoved
                }
            }); 

        });
    }    
};

module.exports = controller;