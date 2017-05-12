/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const Modal = new Class({
	Implements: [Options, Events],
	options: {
		id: '',
		Title: '',
	},
	initialize: function(options) {
		this.setOptions(options);

		this.modal = new Element('div', {
			'id': this.options.id,
			'class': 'modal fade',
			role: 'dialog',
		});

		this.buildHeader();
		this.body = new Element('div', {
			'class': 'modal-body',
		});
		this.footer = new Element('div', {
			'class': 'modal-footer',
		});

		this.build();
	},
	toElement: function() {
		return this.modal;
	},
	build: function() {
		this.modal.set('html', '');

		this.container = new Element('form', {
			role: 'form',
		}).inject(new Element('div', {
			'class': 'modal-content',
		}).inject(new Element('div', {
			'class': 'modal-dialog',
		}).inject(this.modal)));

		this.header.inject(this.container);
		this.body.inject(this.container);
		this.footer.inject(this.container);

		// 2017-04-28 AMR NOTE: $$ returns all objects matching, so use first 'body'
		this.modal.inject($$('body')[0], 'after');
		this.fireEvent('change');
	},
	buildHeader: function() {
		this.header = new Element('div', {
			'class': 'modal-header'
		});

		new Element('span', {
			'aria-hidden': true,
			html: '&times;',
		}).inject(new Element('span', {
			'class': 'sr-only',
			html: 'Close',
		}).inject(new Element('button', {
			'class': 'close',
			type: 'button',
			'data-dismiss': 'modal',
		}).inject(this.header)), 'after');

		this.titleElement = new Element('h4', {
			'class': 'modal-title',
			html: this.options.Title,
		}).inject(this.header);
	},
	Title: {
		get: function() {
			this.titleElement.get('html');
		},
		set: function(value) {
			this.titleElement.set('html', value);
		}
	},
	header: {
		get: function() {
			return this.header;
		},
		set: function(value) {
			this.header = value;
			this.build();
		}
	},
	body: {
		get: function() {
			return this.body;
		},
		set: function(value) {
			this.body = value;
			this.build();
		}
	},
	footer: {
		get: function() {
			return this.footer;
		},
		set: function(value) {
			this.footer = value;
			this.build();
		}
	},
	container: {
		get: function() {
			return this.container;
		},
	},
});
