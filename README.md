
## Example

```
Database is ready, bring in the api routes

    const product = await ProductModel.create({
        name:"ACME Hammer",
        quantity: 10,
        productCode:"HAM01"
    });

    const tag = await TagModel.create({
        name:"Tools"
    });

    const tag2 = await TagModel.create({
        name:"Discount"
    });

    product.addTag(tag, {
        through: {
            selfGranted:false
        }
    });

    product.addTag(tag2, {
        through: {
            selfGranted:false
        }
    });

    const result = await ProductModel.findOne({
        where: { name: 'ACME Hammer'},
        include: TagModel
    });

    let object = result.toJSON();
    console.log(object);
```
  