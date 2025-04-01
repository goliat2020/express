import https from 'https';
import http from 'http';

const url = "https://jsonplaceholder.typicode.com/todos/1";

const server = http.createServer((req, res) => {
    https.get(url, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data); // Enviar como string
        });

    }).on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al obtener datos: ' + err.message);
    });
});

server.listen(1984, () => {
    console.log('Servidor corriendo en http://localhost:1984');
});
