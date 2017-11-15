/**
 * Server-side routing
 */
import fs from 'fs-extra';
import Router from 'koa-router';
import path from 'path';
import api from './api';

const indexPath = path.resolve(__dirname, '../dist/index.html');
let indexPage;

/* eslint-disable no-param-reassign */
const serveHome = async (ctx) => {
  console.log('Serve Home!');

  if (!indexPage) {
    indexPage = await fs.readFile(indexPath, 'utf8');
  }

  ctx.body = indexPage;
  ctx.type = 'text/html';
  ctx.status = 200;
};

const router = new Router();

router.get('/api/cook/recommendations', api.cook.recommendations);
router.post('/api/cook/decide', api.cook.decide);
router.get('/(.*)', serveHome);

export default function (app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}
