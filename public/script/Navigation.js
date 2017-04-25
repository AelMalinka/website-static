/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Navigation = new Class({
	Implements: Events,
	initialize: function(where, main, site, title) {
		this.menu = where;
		this.main = main;
		this.site = site;
		this.title = title || this.site;
		this.pages = {
			all: [],
		};
	},
	get: function() {
		const self = this;
		console.log('requesting /pages/' + self.site);
		new Request.JSON({
			url: '/pages/' + self.site,
			onSuccess: function(pages) {
				pages.each(function(p) {
					const page = new Page(p.name, '/pages/' + self.site + '/' + p.name, self.main);
					page.element.addEvent('click', function() {
						self.clear();
						page.get();
						history.pushState({}, self.title + ': ' + p.name, '/' + p.name);
						return false;
					});
					page.inject(self.menu);
					self.pages[p.name] = page;
				});
				self.fireEvent('complete');
			},
		}).get();
	},
	clear: function() {
	},
});
