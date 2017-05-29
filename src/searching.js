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

const 	get_indexes         = require('./get_indexes');

function randomString(len = 16){
	const strings = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var re = '', i;
	for(i = 0; i < len;i++){
		re += strings[Math.floor(Math.random() * strings.length)]
	}
	return re;
}

function init(client, db_prefix, max_results) {
	return function (content, callback) {
		var indexes = get_indexes(content),
			id      = randomString();
		var sortable = [];
		for (var key in indexes) {
			sortable.push([key, indexes[key]]);
		}
		sortable.sort(function(a, b) {
			return b[1] - a[1];
		});
		var keys    = [];
		for(var i = 0; i < 10; i++){
			keys.push(sortable[i][0])
		}
		sortable = null;
		client.zinterstore(db_prefix + id, keys.length, ...keys, (err, re) => {
			// Just keep the first `max_results` in database
			client.zremrangebyrank(db_prefix + id, 0, -(max_results + 1));
			// The result page id is available for 30 minutes
			client.expire(db_prefix + id, 60 * 60 * 0.5);
			callback(db_prefix + id);
		})
	}
}
module.exports  = init;