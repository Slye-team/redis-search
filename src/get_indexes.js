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

const index_len = 3;
const regex_non_letters = /[!@#\$%\^&\(\)-=_\+\s\[\]`~,./<>\?{}\\\|'"]/gi;

function get_indexes(content) {
	content = content.replace(regex_non_letters, '').toLowerCase();
	var indexes = {},
		len     = Math.floor(content.length / index_len),
		row, col, index, i, k;
	for(row = 0;row < index_len;row++){
		for(col = 0;col < len;col++){
			index   = '';
			k       = col * index_len + row;
			for(i = 0;i < index_len && k + i < content.length;i++)
				index += content[k + i];
			if(index.length == index_len)
				indexes[index]  = indexes[index] ? indexes[index] + 1 : 1;
		}
	}
	return indexes;
}
module.exports  = get_indexes;