/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const compress = require('koa-compress');
const config = require('./config.js');

const app = new koa();

app.use(logger());
app.use(compress());
app.use(conditional());
app.use(etag());

app.use(async (ctx, next) => {
	if(ctx.url.startsWith('/' + config.name))
		ctx.url = ctx.url.replace('/' + config.name, '');

	await next();
});

app.use(serve('public'));


app.listen(config.port);
