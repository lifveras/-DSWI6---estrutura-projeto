
// const ItemPatrimonioRepository = require("../repositories/ItemPatrimonioRepository");
const ItemPatrimonioService = require("../services/ItemPatrimonioService");

module.exports = {
    /* Perceba que o objeto response, do sequelize, 
       é recebido aqui. Importante para responder a 
       requisição de forma assíncrona. 
    */
    listAll: function (req, res) {
        //Blocking operation (Não fazer)
        //return ItemPatrimonioRepository.all()
        // console.log(ItemPatrimonioRepository.all());
        res.statusCode = 200; // Status HTTP para OK;
        ItemPatrimonioService.getAllItemPatrimonio().then(
            items => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(items));
            }            
        )
    },

    // handler para adcionar novo item no banco
    add: function (req, res) {
        ItemPatrimonioService.addNewItemPatrimonio(
            req.body
        ).then((status) => {
            res.statusCode = 201; // Status HTTP para created;
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        }).catch(error => {
            console.error(error);
            res.statusCode = 500; //Status HTTP para erro interno
            res.set("Content-Type", "application/text");
            res.send(error.message);
        });
    },

    // handler para recuperar um item por patrimonio
    get: function (req, res) {
        ItemPatrimonioService.getAllItemPatrimonioById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            req.params.patrimonio_id).then((item) => {
                res.statusCode = 200; // Status HTTP para OK;
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(item));
            });
    },

    // handler para remover um item pelo seu código de patrimonio
    remove: function (req, res) {
        ItemPatrimonioService.removeItemPatrimonioById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            req.params.patrimonio_id).then((status) => {
                res.statusCode = 204; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            });
    }
}