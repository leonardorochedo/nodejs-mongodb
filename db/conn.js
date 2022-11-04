const { MongoClient } = require("mongodb")

// criando a URI, criando database
const uri = "mongodb://localhost:27017/testemongodb"

// atribuindo a URI ao mongoclient
const client = new MongoClient(uri)

async function run () {
    try {
        await client.connect() // criando a conexao
        console.log("MongoDB Conectado!")
    } catch(err) {
        console.log(`Erro: ${err}`)
    }
}

run()

module.exports = client