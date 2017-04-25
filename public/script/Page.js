/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Page = new Class({
	initialize: function(page, url, where) {
		this.md = new showdown.Converter();
		this.name = page;
		this.where = where;
		this.element = new Element('a', {
			id: page,
			href: page,
			html: page
		});
		this.container = new Element('li');
		this.element.inject(this.container);
		this.url = url;
	},
	get: function(id) {
		const self = this;
		console.log('requesting ' + self.url);
		new Request({
			url: this.url,
			onSuccess: function(res) {
				self.where.set('html', self.md.makeHtml(res));
				self.active();
			},
		}).get();
	},
	clear: function() {
		this.container.removeClass('active');
	},
	active: function() {
		this.container.addClass('active');
	},
	inject: function(where) {
		this.container.inject(where);
	}
});
