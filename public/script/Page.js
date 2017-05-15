/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Page = new Class({
	Implements: [Options],
	options: {
	},
	initialize: function(options) {
		this.setOptions(options);

		this.md = new showdown.Converter();
		this.element = new Element('a', {
			id: this.options.page,
			href: this.options.page,
			html: this.options.page,
		});
		this.container = new Element('li');
		this.element.inject(this.container);
	},
	get: function(id) {
		const self = this;
		console.log('requesting ' + self.options.url);
		new Request({
			url: this.options.url,
			onSuccess: function(res) {
				if(self.options.markdown !== undefined) {
					self.options.markdown.set('html', res);
				}

				self.options.where.set('html', self.md.makeHtml(res));
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
