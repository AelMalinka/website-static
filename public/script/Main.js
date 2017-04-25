/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

function page() {
	return (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'Home');
}

function load(where) {
	Nav.clear();
	Nav.pages[where].get();
}

window.onpopstate = function(e) {
	load(page());
}

window.addEvent('domready', function() {
	const Nav = new Navigation($('menu'), $('main'), 'default');

	Nav.addEvent('complete', function() {
		if(Nav.pages[page()] !== undefined) {
			console.log('on page ' + Nav.pages[page()].name);
			Nav.pages[page()].get();
		} else {
			$('main').set('html', 'Page not found');
		}
	});
	$('home').addEvent('click', function() {
		Nav.clear();
		Nav.pages.Home.get();
		history.pushState({}, '', '/');
		return false;
	});

	Nav.get();
});
