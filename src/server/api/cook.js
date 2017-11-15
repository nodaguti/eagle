/* eslint-disable no-param-reassign, no-console */
import fetch from 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';
import cheerio from 'cheerio';
import sampleSize from 'lodash.samplesize';

const recommendations = {
  seasonal: [],
  ranking: [],
  device: [],
};

let answer = null;

async function getRecipeDetails(uri) {
  const res = await fetch(uri);
  const page = await res.text();
  const $ = cheerio.load(page);

  const title = $('.heading-main .ttl').text().trim();
  const description = $('.recipe--detail-main > .description').text().trim();
  const relativeImgUri = $('.recipe--detail-main > .thumb > img').attr('src');
  const imgUri = `https://www.kyounoryouri.jp${relativeImgUri}`;
  const ingredients = [];

  $('#ingredients_list > dl').each((i, elem) => {
    const item = $(elem).find('.ingredient').text().trim();
    const amount = $(elem).find('span.floatright').text().trim();

    if (!item) return;

    ingredients.push(`${item} ${amount}`);
  });

  const instructions = [];

  $('.howto-sec-val').each((i, elem) => {
    instructions.push($(elem).text().trim().split('\n')[0]);
  });

  return {
    title,
    description,
    imgUri,
    ingredients,
    instructions,
    uri,
  };
}

async function getSeasonalRecommendations() {
  const res = await fetch('https://www.kyounoryouri.jp/recipe/');
  const page = await res.text();
  const $ = cheerio.load(page);

  const recipeUris = [];

  $('.recommend-list > .col').each((i, elem) => {
    recipeUris.push(`https://www.kyounoryouri.jp${$(elem).data('url')}`);
  });

  const promise = recipeUris.map((uri) => getRecipeDetails(uri));
  const recipes = await Promise.all(promise);

  return recipes;
}

async function getRanking() {
  const res = await fetch('https://www.kyounoryouri.jp/recipe/ranking');
  const page = await res.text();
  const $ = cheerio.load(page);

  const recipeUris = [];

  $('.recipe--ranking-list > .col').each((i, elem) => {
    recipeUris.push(`https://www.kyounoryouri.jp${$(elem).data('url')}`);
  });

  const promise = recipeUris.map((uri) => getRecipeDetails(uri));
  const recipes = await Promise.all(promise);

  return recipes;
}

async function getDeviceRecommendations() {
  return sampleSize(recommendations.seasonal.concat(recommendations.ranking), 3);
}

async function doRecommendationPolling(interval) {
  recommendations.seasonal = await getSeasonalRecommendations();
  recommendations.ranking = await getRanking();

  setInterval(() => doRecommendationPolling(), interval);
}


const api = {
  async recommendations(ctx) {
    try {
      recommendations.device = await getDeviceRecommendations();
      ctx.body = recommendations;
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

  async decide(ctx) {
    const menu = ctx.request.body;

    // TODO: Store the data in a database
    answer = menu;

    ctx.body = {
      success: true,
    };
    ctx.status = 200;
  },
};


export default function (router) {
  router.get('/api/cook/recommendations', api.recommendations);
  router.post('/api/cook/decide', api.decide);

  doRecommendationPolling(6 * 60 * 60 * 1000);
}
