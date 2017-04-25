/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

window.addEvent('domready', function() {
	const Nav = new Navigation($('menu'), $('main'), 'default');

	Nav.addEvent('complete', function() {
		const page = (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'default');
		console.log('on page ' + Nav.pages[page].name);
		Nav.pages[page].get();
	});
	$('home').addEvent('click', function() {
		Nav.clear();
		Nav.pages.default.get();
		history.pushState({}, '', '/');
		return false;
	});

	Nav.get();
});
