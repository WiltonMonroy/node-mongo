const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

//create
router.post('/', product_controller.product_create);
//read one
router.get('/:id', product_controller.product_details);
//update
router.put('/:id?', product_controller.product_update);
//delete
router.delete('/:id?', product_controller.product_delete);
//all
router.get('/', product_controller.product_all);

module.exports = router;



