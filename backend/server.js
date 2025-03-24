const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

//Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados com sucesso!');
    }
});

//Middleware para tratar requisições JSON
app.use(express.json()); // Permite trabalhar com JSON

//Porta do servidor
const PORT = 3000;

//Rota para listar todos os produtos (teste da API)
app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

//Criar a tabela 'tasks' se não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            status TEXT
        )
    `);
});




//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})