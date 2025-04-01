import express from "express";

const app = express();
app.use(express.json());

let escuelas = [];

app.get("/escuelas", (req, res) => {
    res.status(200).json(escuelas);
});

app.post('/nuevaescuela/:id/:nombre', (req, res) => {
    const { nombre, id } = req.params;
    if (!nombre || !id) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const nuevaEscuela = { nombre, id };
    escuelas.push(nuevaEscuela);
    res.status(201).json({ mensaje: 'Escuela creada', escuela: nuevaEscuela });
});

app.put('/actualizarescuela/:id/:nombre', (req, res) => {
    const {id, nombre} = req.params;
    const escuela = escuelas.find(s => s.id === id);
    if (!escuela) {
        return res.status(404).json({ mensaje: 'Escuela no encontrada' });
    }
    escuela.nombre = nombre || escuela.nombre;
    res.status(200).json({ mensaje: 'Escuela actualizada', escuela });
});

app.delete('/eliminarescuela/:id', (req, res) => {
    const {id} = req.params;
    const index = escuelas.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Escuela no encontrada' });
    }

    escuelas.splice(index, 1);
    res.status(200).json({ mensaje: 'Escuela eliminada' });
});

app.listen(1984, () => {
    console.log("Servidor abierto");
});
