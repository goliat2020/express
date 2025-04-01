import express from 'express';
import https from 'https';

const app = express();
const url = "https://jsonplaceholder.typicode.com/todos/1";

app.get('/', (req, res) => {
    https.get(url, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });

    }).on('error', (err) => {
        res.status(500).send('Error al obtener datos: ' + err.message);
    });
});

app.listen(1984, () => {
    console.log('Servidor corriendo en http://localhost:1984');
});
