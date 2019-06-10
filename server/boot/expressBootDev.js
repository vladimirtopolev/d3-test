import _ from 'lodash';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigHandler from 'react-scripts/config/webpack.config';
import { AVAILABLE_ENVIROMENTS } from '../constants';
import path from 'path';

export default (app, dirname) => {
    // compile client-side on the fly and detect changes
    const webpackConfig = webpackConfigHandler(AVAILABLE_ENVIROMENTS.DEVELOPMENT);
    _.set(webpackConfig, 'output.path', dirname);

    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler));

    app.get('/*', (req, res, next) => {
        compiler.outputFileSystem.readFile(path.join(dirname, 'index.html'), (err, result) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end()
        })
    })

}