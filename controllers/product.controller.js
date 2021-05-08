
const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//ceate
exports.product_create = function (req, res) {
    
    if(!req.body.name) return res.send({error: "input name"});
    if(!req.body.price) return res.send({error: "input price"});
    if(isNaN(req.body.price)) return res.send({error: "input numeric value in price"});

    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) return res.send("Error al crear un producto "+ req.body.name + "... " + req.body.price + "...."); // + next(err);
        return res.send('Product Created successfully');
    })
};

// find by id
exports.product_details = function (req, res) {
    if(!req.params.id) return res.send({error: "input id"});

    Product.findById(req.params.id, function (err, product) {
        if (err) return res.send("No se encontró el producto solicitado");
        res.send(product);
    })
};

//update
exports.product_update = function (req, res) {

    if(!req.params.id) return res.send({error: "input id"});
    if(!req.body.name) return res.send({error: "input name"});
    if(!req.body.price) return res.send({error: "input price"});
    if(isNaN(req.body.price)) return res.send({error: "input numeric value in price"});

    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return res.send("No fue posible actualizar, porque No se encontró el producto solicitado");
        res.send('Product udpated.');
    });
};

//delete
exports.product_delete = function (req, res) {

    if(!req.params.id) return res.send({error: "input id"});

    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

//all
exports.product_all = function (req, res) {
    Product.find(req.params.id, function (err, product) {
        if (err) return res.send("No se encontraron prodructos");
        res.send(product);
    })
};

