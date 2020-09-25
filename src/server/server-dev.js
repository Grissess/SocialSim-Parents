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

// Parse incoming request
app.use(express.static('asset'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', route);

app.use(webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath
}));

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile( HTML_FILE, (err, result) => {

        if (err) {
            return next(err);
        }

        res.set('content-type', 'text/html');
        res.send(result),
        res.end();
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT} ...`);
});