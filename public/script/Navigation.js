/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Navigation = new Class({
	Implements: [Events, Options],
	options: {
	},
	initialize: function(options) {
		this.setOptions(options);

		this.options.title = this.options.title || this.options.site;

		this.pages = {
			all: [],
		};
	},
	get: function() {
		const self = this;
		console.log('requesting /pages/' + self.options.site);
		new Request.JSON({
			url: '/pages/' + self.options.site,
			onSuccess: function(pages) {
				pages.each(function(p) {
					const page = new Page({
						page: p.name, 
						url: '/pages/' + self.options.site + '/' + p.name,
						where: self.options.main,
						markdown: self.options.markdown
					});
					page.element.addEvent('click', function() {
						self.clear();
						page.get();
						history.pushState({}, self.options.title + ': ' + p.name, '/' + p.name);
						return false;
					});
					if(p.name != 'default')
						page.inject(self.options.menu);
					self.pages[p.name] = page;
					self.pages.all.push(page);
				});
				self.fireEvent('complete');
			},
		}).get();
	},
	clear: function() {
		this.pages.all.each(function(page) {
			page.clear();
		});
	},
});
