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

const index = require('./indexing'),
	search  = require('./searching'),
	redis   = require('redis');

class redis_index{
	constructor(db = 0, db_prefix = 's:'){
		this._pendings  = [];
		this._client    = redis.createClient();
		if(typeof db != 'number')
			db = 0;
		this._client.select(db, (err, re) => {
			this._index     = index(this._client, db_prefix);
			this._search    = search(this._client, db_prefix);
			this._pendings.forEach(value => {
				this[value[0]](...value[1]);
			});
		});
	}
	index(){
		if(!this._index)
			return this._pendings.push(['index', arguments]);
		this._index(...arguments);
	}
	search(){
		if(!this._search)
			return this._pendings.push(['search'], arguments);
		this._search(...arguments);
	}
}
module.exports = redis_index;