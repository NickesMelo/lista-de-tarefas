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

//Adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { title, description, priority} = req.body;

    if (!title || !priority) {
        return res.status(400).json({ error: 'Título e prioridade são obrigatórios' });
    }

    const query = `
        INSERT INTO tasks (title, description, priority)
        VALUES (?, ?, ?)
    `;
    const values = [title, description, priority];

    db.run(query, values, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar tarefa' });
        }
        res.status(201).json({
            id: this.lastID,
            title,
            description,
            priority
        });
    });
});

//Listar todas as tarefas
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar tarefas' });
        }
        res.status(200).json(rows);
    });
});

//Atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const {title, description, priority } = req.body;
    const { id } = req.params;

    if (!title || !priority) {
        return res.status(400).json({ error: 'Título e prioridade são obrigatórios' });
    }

    const query = `
        UPDATE tasks
        SET title = ?, description = ?, priority = ?
        WHERE id = ?
    `;

    const values = [title, description, priority, id];

    db.run(query, values, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.status(200).json({
            id: this.lastID,
            title,
            description,
            priority
        });
    });
});

//Deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params;

    const query = 'DELETE FROM tasks WHERE id=?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        res.status(204).json({ message: 'Tarefa deletada com sucesso'});
    });
});

//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})