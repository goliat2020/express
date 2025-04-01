import express from "express";

const app = express();
app.use(express.json());

let escuelas = [];

app.get("/escuelas", (req, res) => {
    res.status(200).json(escuelas);
});

app.post('/escuelas', (req, res) => {
    const { nombre, id } = req.body;
    if (!nombre || !id) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const nuevaEscuela = { nombre, id};
    escuelas.push(nuevaEscuela);
    res.status(201).json({ mensaje: 'Escuela creada', escuela: nuevaEscuela });
});

app.put('/escuelas/:id', (req, res) => {
    const escuela = escuelas.find(s => s.id === req.params.id);
    if (!escuela) {
        return res.status(404).json({ mensaje: 'Escuela no encontrada' }); // Respuesta 404 Not Found
    }

    Object.assign(escuela, req.body);
    res.status(200).json({ mensaje: 'Escuela actualizada', escuela });
});

app.delete('/escuelas/:id', (req, res) => {
    const index = escuelas.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Escuela no encontrada' });
    }

    escuelas.splice(index, 1);
    res.status(200).json({ mensaje: 'Escuela eliminada' });
});

app.listen(1984,()=>{
    console.log("Servidor abierto");
});
