/*****************************************************************************
 *   This program is free software: you can redistribute it and/or modify    *
 *   it under the terms of the GNU General Public License as published by    *
 *   the Free Software Foundation, either version 3 of the License, or       *
 *   (at your option) any later version.                                     *
 *___________________________________________________________________________*
 *   This program is distributed in the hope that it will be useful,         *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of          *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           *
 *   GNU General Public License for more details.                            *
 *___________________________________________________________________________*
 *   You should have received a copy of the GNU General Public License       *
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.   *
 *___________________________________________________________________________*
 *                             Created by  Qti3e                             *
 *        <http://Qti3e.Github.io>    LO-VE    <Qti3eQti3e@Gmail.com>        *
 *****************************************************************************/

const redis_search_lib  = require('../src');

const redis_search  = new redis_search_lib(3);
const content       = 'Lorem ipsum dolor sit amet, eu ius iusto populo, affert honestatis est ne. Ne debet perfecto oportere sea, ei sed labitur laboramus. Te ludus civibus eam, no regione similique eum. Persecuti persequeris ea sea, ius vidisse elaboraret ea.';
redis_search.index(content, 5, 2);
setTimeout(function () {
	redis_search.search('Lorip', (id, count) => {
		console.log(id, count);
		// We count pages from 0
		redis_search.results(id, 0, (data, count2)=> {
			console.log(data);
			console.log(count == count2); // True, they are the same things
		})
	});
}, 1000);