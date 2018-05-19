/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

// 2017-04-28 AMR NOTE: Login/Logout buttons
const Login = new Element('a', {
	html: 'Login \u{1F464}',
	'class': 'nav-link',
	'data-toggle': 'modal',
	'data-target': '#login-modal',
});
const Logout = new Element('a', {
	html: 'Logout \u{1F464}',
	'class': 'nav-link',
});

const User = new Class({
	Implements: [Options, Events],
	options: {
		login: Login,
		logout: Logout,
	},
	initialize: function(options) {
		this.setOptions(options);

		if(this.options.where === undefined) {
			throw new Error('Please specify where');
		}

		this.build();

		this.options.logout.addEvent('click', this.logout.bind(this));

		this.addEvent('login', this.show.bind(this));
		this.addEvent('logout', this.show.bind(this));
	},
	build: function() {
		this.modal = new Modal({
			id: 'login-modal',
			Title: 'Login',
		});
		this.modal.container.addEvent('submit', this.login.bind(this));

		// 2017-04-28 AMR NOTE: modal body
		this.name = new Element('input', {
			id: 'name',
			type: 'text',
			'class': 'form-control',
		}).inject(new Element('label', {
			'class': 'sr-only',
			'for': 'user',
			html: 'Username',
		})).inject(this.modal.body);
		this.pass = new Element('input', {
			id: 'pass',
			type: 'password',
			'class': 'form-control',
		}).inject(new Element('label', {
			'class': 'sr-only',
			'for': 'pass',
			html: 'Password',
		})).inject(this.modal.body);

		// 2017-04-28 AMR NOTE: modal footer
		new Element('button', {
			'class': 'btn btn-default',
			type: 'submit',
			html: 'Login',
		}).inject(this.modal.footer);
		new Element('button', {
			'class': 'btn btn-default',
			type: 'button',
			'data-dismiss': 'modal',
			html: 'Cancel',
		}).inject(this.modal.footer);
	},
	show: function() {
		console.log('Logged ' + (this.logged ? 'In' : 'Out'));

		this.options.where.set('html', '');
		this.options[(this.logged ? 'logout' : 'login')].inject(this.options.where);

		this.fireEvent('show');
	},
	login: function(e) {
		e.stop();

		const user = this.name.get('value');
		const pass = this.pass.get('value');

		this.name.set('value', '');
		this.pass.set('value', '');

		console.log('trying to log in as ' + user);

		new Request({
			url: '/users/login',
			data: {
				name: user,
				pass: pass,
			},
			onSuccess: function(text) {
				this.user = {
					name: user,
					sess: text,
				};

				this.logged = true;
				this.fireEvent('login');

				this.modal.hide();
			}.bind(this),
			onFailure: function() {
				this.logged = false;
				this.fireEvent('logout');

				this.modal.hide();
			}.bind(this),
		}).send();
	},
	logout: function(e) {
		e.stop();

		console.log('trying to logout');

		new Request({
			url: '/users/logout',
			data: {
				name: this.user.name,
			},
			onSuccess: function(res) {
				delete this.user;

				this.logged = false;
				this.fireEvent('logout');
			}.bind(this),
		}).send();
	},
});
