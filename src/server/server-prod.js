import path from 'path';
import express from 'express';
import cors from 'cors';
import route from './routes/router';
import bodyParser from 'body-parser';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

// Parse incoming request
app.use(bodyParser.json());
app.use(express.static('asset'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', route);

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT} ...`);
});