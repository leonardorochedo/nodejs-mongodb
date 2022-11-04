const conn = require("../db/conn")

// importando objectid
const { ObjectId } = require("mongodb")

class Product {

    constructor(name, image, price, description) {
        this.name = name
        this.image = image
        this.price = price
        this.description = description
    }

    // criar produto
    save() { // nao tem o static pois e referenciado dentro do objeto instanciado
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product
    }

    // pegar todos os produtos
    static async getProducts() {
        const products = await conn.db().collection('products').find().toArray()

        return products
    }

    // pegar somente um produto
    static async getProductById(id) {
        // buscando somente um produto pegando o id da req e transformando em objecid para o mongo entender
        const product = await conn.db().collection('products').findOne({_id: ObjectId(id)})

        return product
    }

    // remover produto
    static async removeProductById(id) {
        await conn.db().collection('products').deleteOne({_id: ObjectId(id)})
    
        return
    }

    // editar produto
    editProduct(id) { // sem o static pois o objeto ja esta sido instanciado no controller
        conn.db().collection('products').updateOne({_id: ObjectId(id)}, {$set: this}) // query de update
    
        return
    }
}

module.exports = Product