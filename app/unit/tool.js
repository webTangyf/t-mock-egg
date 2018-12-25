'use strict';

module.exports = {
	getType (obj) {
	    return Object.prototype.toString.call(obj).replace(/\[object|\]|\s/g, '').toLocaleLowerCase();
	}
}