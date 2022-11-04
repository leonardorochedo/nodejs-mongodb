const Product = require("../models/Product") // chamando o model

module.exports = class ProductController {
    static async showProducts(req, res) {

        const products = await Product.getProducts() // chamando o metodo que retorna todos os produtos do model

        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {

        // pegando o post do body
        const {name, image, price, description} = req.body

        // passando para o construtor
        const product = new Product(name, image, price, description) // criando o objeto

        // usando o metodo save de inserir no banco
        product.save()

        res.redirect('/')
    }

    // pegando produto indiv.
    static async getProduct(req, res) {

        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }

    // removendo produto
    static async removeProduct(req, res) {
        const id = req.params.id

        await Product.removeProductById(id)

        res.redirect('/')
    }

    // get na edit page
    static async editProduct(req, res) {
        const id = req.params.id

        const product = await Product.getProductById(id)
        
        res.render('products/edit', { product })
    }

    // post edit form
    static async editProductPost(req, res) {
        // pegando do body o post
        const {id, name, image, price, description} = req.body

        const product = new Product(
            name,
            image,
            price,
            description
        )

        // acessando o metodo referenciando dentro do objeto instanciado
        await product.editProduct(id)
        
        res.redirect('/')
    }
}