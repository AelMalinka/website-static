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

		this.enabled = false;
		this.shown = false;
		this.md = new showdown.Converter();

		this.container = new Element('form');
		this.elem = new Element('textarea', {
			'class': 'form-control',
			rows: this.options.height,
			id: 'value',
		}).inject(new Element('div', {
			'class': 'form-group',
		}).inject(this.container));

		new Element('button', {
			'class': 'btn btn-default pull-right',
			type: 'submit',
			html: 'Save',
		}).inject(this.container);
		new Element('button', {
			'class': 'btn btn-default pull-right',
			type: 'button',
			html: 'Cancel',
		}).inject(this.container).addEvent('click', this.show.bind(this));

		this.options.button.addEvent('click', this.show.bind(this));
		this.container.addEvent('submit', this.submit.bind(this));
	},
	enable: function() {
		this.enabled = true;
		this.options.container.removeClass('disabled');
		this.options.container.addClass('active');
	},
	disable: function() {
		this.enabled = false;
		this.options.container.removeClass('active');
		this.options.container.addClass('disabled');
	},
	show: function() {
		if(!this.enabled) return;

		if(!this.shown) {
			this.options.where.set('html', '');
			this.elem.set('value', this.options.markdown.get('html'));
			this.container.inject(this.options.where);

			this.shown = true;
		} else {
			this.options.where.set('html', this.md.makeHtml(this.options.markdown.get('html')));

			this.shown = false;
		}
	},
	submit: function(e) {
		e.stop();

		console.log('saving page');
		new Request({
			url: '/pages/' + this.options.site + '/' + this.options.page(),
			onSuccess: function() {
				this.options.markdown.set('html', this.elem.get('value'));
				this.options.where.set('html', this.md.makeHtml(this.elem.get('value')));
			}.bind(this),
		}).post({
			f: this.elem.get('value'),
		});
	},
});
