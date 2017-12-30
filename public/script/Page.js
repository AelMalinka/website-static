/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Page = new Class({
	Implements: [Options],
	options: {
		classes: {
			active: 'active',
			element: 'nav-link',
			container: 'nav-item',
		}
	},
	initialize: function(options) {
		this.setOptions(options);

		this.md = new showdown.Converter();
		this.element = new Element('a', {
			id: this.options.page,
			href: this.options.page,
			html: this.options.page,
		});
		this.element.addClass(this.options.classes.element);
		this.container = new Element('li');
		this.container.addClass(this.options.classes.container);
		this.element.inject(this.container);
	},
	get: function(id) {
		console.log('requesting ' + this.options.url);
		new Request({
			url: this.options.url,
			onSuccess: function(res) {
				if(this.options.markdown !== undefined) {
					this.options.markdown.set('html', res);
				}

				this.options.where.set('html', this.md.makeHtml(res));
				this.active();
			}.bind(this),
		}).get();
	},
	clear: function() {
		this.container.removeClass(this.options.classes.active);
	},
	active: function() {
		this.container.addClass(this.options.classes.active);
	},
	inject: function(where) {
		this.container.inject(where);
	}
});
