import Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-log';
import path from 'path';
import routes from './routes';

const app = new Koa();
const ip = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;
const assetsPath = path.resolve(__dirname, '../dist/assets');

app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(mount('/assets', serve(assetsPath)));
routes(app);

if (!module.parent) {
  app.listen(port, ip, () => {
    // eslint-disable-next-line no-console
    console.log(`Now the app is running on http://${ip}:${port}`);
  });
}
