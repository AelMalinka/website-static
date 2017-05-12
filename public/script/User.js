/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

// 2017-04-27 AMR TODO: is it worth it?
function BadOptions(msg) {
	this.name = 'Bad Options';
	this.message = msg || 'Bad Options';
}

BadOptions.prototype = Object.create(Error.prototype);
BadOptions.prototype.constructor = BadOptions;

// 2017-04-28 AMR NOTE: Login/Logout buttons
const Login = new Element('a', {
	html: 'Login ',
	'data-toggle': 'modal',
	'data-target': '#login-modal'
});
const Logout = new Element('a', {
	html: 'Logout '
});
new Element('span', {
	'class': 'glyphicon glyphicon-user'
}).inject(Login);
new Element('span', {
	'class': 'glyphicon glyphicon-user'
}).inject(Logout);

const User = new Class({
	Implements: [Options, Events],
	options: {
		login: Login,
		logout: Logout,
	},
	initialize: function(options) {
		this.setOptions(options);

		if(this.options.where === undefined) {
			throw new BadOptions('Please specify where');
		}

		this.build();

		if(Cookie.read('user') === null || Cookie.read('auth') === null) {
			this.logged = false;
		} else {
			this.logged = true;
		}

		this.addEvent('login', this.show.bind(this));
		this.addEvent('logout', this.show.bind(this));
	},
	build: function() {
		const self = this;

		this.modal = new Modal({
			id: 'login-modal',
			Title: 'Login',
		});
		this.modal.container.addEvent('submit', this.login.bind(this));

		// 2017-04-28 AMR NOTE: modal body
		this.form = new Element('input', {
			id: 'user',
			'class': 'form-control',
			type: 'text',
			placeholder: 'Username',
		}).inject(new Element('label', {
			'class': 'sr-only',
			'for': 'user',
			html: 'Username',
		}).inject(new Element('div', {
			'class': 'form-group',
		}).inject(this.modal.body)), 'after');

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
		this.options[(this.logged ? 'logout' : 'login')].inject(this.options.where);
		this.fireEvent('show');
	},
	login: function(e) {
		e.stop();
		console.log('trying to log in as ' + this.form.get('value'));

		new Request({
			url: '/asdf',
			data: 'user=' + this.form.get('value'),
			onSuccess: function(res) {
				this.logged = true;
				this.fireEvent('login');
			}.bind(this),
			onFailure: function(res) {
				this.logged = false;
				this.fireEvent('logout');
			}.bind(this),
		}).send();
	},
});
