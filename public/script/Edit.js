/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Edit = new Class({
	Implements: [Options, Events],
	options: {
	},
	initialize: function(options) {
		this.setOptions(options);

		if(this.options.where === undefined || this.options.container === undefined || this.options.button === undefined) {
			throw new Error('Please specify where and a container');
		}

		this.elem = new Element('textarea');
		this.shown = false;
		this.md = new showdown.Converter();

		this.options.button.addEvent('click', this.show.bind(this));
	},
	enable: function() {
		this.options.container.removeClass('disabled');
		this.options.container.addClass('active');
	},
	disable: function() {
		this.options.container.removeClass('active');
		this.options.container.addClass('disabled');
	},
	show: function() {
		if(!this.shown) {
			this.options.where.set('html', '');
			this.elem.inject(this.options.where);

			this.editor = new SimpleMDE({
				element: this.elem,
			});
			this.editor.value(this.options.markdown.get('html'));

			this.shown = true;
		} else {
			this.options.where.set('html', this.md.makeHtml(this.options.markdown.get('html')));

			this.shown = false;
		}
	},
});
