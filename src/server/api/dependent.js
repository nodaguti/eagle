/* eslint-disable no-param-reassign, no-console */
import sampleSize from 'lodash.samplesize';
import DB from './_kvs';

DB.set('answers', []);

const api = {
  async alternatives(ctx) {
    try {
      const rec = DB.get('recommendations');
      const candidates = [].concat(rec.seasonal, rec.ranking);
      const answer = DB.get('answer');
      let res = [];

      if (!answer) {
        res = sampleSize(candidates, 5);
      } else {
        res.push(answer);
        res = res.concat(sampleSize(candidates.filter((i) => i.title !== answer.title)), 4);
        res = res.sort(() => (Math.random() > 0.5 ? 1 : -1));
      }

      ctx.body = res;
      ctx.status = 200;
    } catch (err) {
      console.error(err.stack);
      ctx.body = {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : '',
      };
      ctx.status = 500;
    }
  },

  async answer(ctx) {
    const { user } = ctx.params;
    const answer = DB.get('answers').find((item) => item.user === user);

    ctx.body = answer || {};
    ctx.status = 200;
  },

  async decide(ctx) {
    const {
      answer,
      user,
    } = ctx.request.body;
    const answers = DB.get('answers');

    // TODO: Store the data in a database
    answers.unshift({
      date: Date.now(),
      answer,
      user,
    });

    DB.set('answers', answers);

    ctx.body = {
      success: true,
    };
    ctx.status = 200;
  },
};


export default function (router) {
  router.get('/api/dependent/alternatives', api.alternatives);
  router.get('/api/dependent/answer/:user', api.answer);
  router.post('/api/dependent/decide', api.decide);
}
