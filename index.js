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

const config = require('config')(require('./config.js'));

const app = new koa();

app.use(logger());
app.use(conditional());
app.use(etag());
app.use(compress());
app.use(serve('public'));

config.onReady(function() {
	app.listen(config.port);
});
