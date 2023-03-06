import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.dev.config';

import route from './routes/router';
import bodyParser from 'body-parser';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);
const rtr = express.Router();

// Parse incoming request
rtr.use(express.static('asset'));
rtr.use(bodyParser.json());
rtr.use(bodyParser.urlencoded({ extended: false }));
rtr.use('/', route);

rtr.use(webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath
}));

rtr.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile( HTML_FILE, (err, result) => {

        if (err) {
            return next(err);
        }

        res.set('content-type', 'text/html');
        res.send(result),
        res.end();
    });
});

app.use('/parents-survey', rtr);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT} ...`);
});
