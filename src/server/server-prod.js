import path from 'path';
import express from 'express';
import cors from 'cors';
import route from './routes/router';
import bodyParser from 'body-parser';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');
const rtr = express.Router();

rtr.use(express.static(DIST_DIR));

// Parse incoming request
rtr.use(bodyParser.json());
rtr.use(express.static('asset'));
rtr.use(bodyParser.urlencoded({ extended: true }));
rtr.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
rtr.use('/', route);

rtr.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

app.use('/parents-survey', rtr);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT} ...`);
});
