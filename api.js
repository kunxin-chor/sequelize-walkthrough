const express = require('express');
const router = express.Router();
const ProductModel = require("./models/ProductModel");
const TagModel = require("./models/TagModel");

router.get('/products', async(req,res)=>{
    let results = await ProductModel.findAll();
    res.json(results.map(r=>r.toJSON()))
})

router.get('/products/tags/:tagid', async (req,res)=>{
    let results = await ProductModel.findAll({
        include:[
            {
                'model':TagModel,
                'where': {
                    'id': req.params.tagid
                }
            }
        ]
    })
    res.send(results.map(r=>r.toJSON()))
})

router.post('/products/tag/:name', async (req, res)=>{
    let product = await ProductModel.create({
        'name': req.body.productName,
        'quantity': req.body.quantity,
        'productCode': req.body.productCode,        
    })

    // find the tag by its name or create one if it doesn't exist
    let tag = await TagModel.findOrCreate({
        where: {
            name: req.params.name
        }
    })

    product.addTag(tag);

    // if your relationship is between teacher and class
    // teacher.addClass(theClass)


})

router.post('/products', async(req,res)=>{
    let productName = req.body.productName;
    let quantity = req.body.quantity;
    let productCode = req.body.productCode;
    let tags = req.body.tags;
    let product = await ProductModel.create({
        'name': productName,
        'quantity': quantity,
        'productCode': productCode
    })

    if (tags) {
        for (let t of tags) {
            const tag = await TagModel.findByPk(t);
            await product.addTag(tag);            
        }
    }

    res.json(product.toJSON());
})

module.exports = router;