'use strict';

const Service = require('egg').Service;

const tableName = 'projectInterface';

class ProjectService extends Service {
  async getListByKey (id, key) {
    const list = await this.app.mysql.query(`select  * from  ${tableName} WHERE projectId = ${id} and instr(name, '${key}') > 0  or instr(interfaceType, '${key}') > 0 or instr(textDesc, '${key}') > 0`);
    return list
            .filter(d => d.isDelete === 0)
            .map(d => {
              delete d.isDelete
              return d
            });
  }
  async getAllById (id) {
    const list = await this.app.mysql.query(`select  * from  ${tableName} WHERE projectId = ${id}`);
    return list
            .filter(d => d.isDelete === 0)
            .map(d => {
              delete d.isDelete
              return d
            });
  }
  async add (data) {
  	try {
	  	let params = {
        isDelete: 0,
        ...data
	  	};
	  	const result = await this.app.mysql.insert(tableName, params);
	  	return result.affectedRows === 1;
  	} catch (e) {
      console.error(e)
  		return false;
  	}
  }
  async update (data) {
      try {
        let params = {
          isDelete: 0,
          ...data
        };
        const result = await this.app.mysql.update(tableName, params);
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

