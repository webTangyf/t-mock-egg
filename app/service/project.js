'use strict';

const Service = require('egg').Service;

const tableName = 'projects';

class ProjectService extends Service {
  async getAll () {
    const list = await this.app.mysql.select('projects');
    return list
            .filter(d => d.isDelete === 0)
            .map(d => {
              delete d.isDelete
              return d
            });
  }
  async add (name) {
  	try {
	  	let params = {
	  		name,
        isDelete: 0
	  	};
	  	const result = await this.app.mysql.insert(tableName, params);
	  	return result.affectedRows === 1;
  	} catch (e) {
      console.error(e)
  		return false;
  	}
  }
  async del(id) {
    try {
      let params = {
        id,
        isDelete: 1
      }
      const result = await this.app.mysql.update(tableName, params);
      return result.affectedRows === 1;
    } catch (e) {
      console.error(e)
      return false;
    }      
  }
}

module.exports = ProjectService;

