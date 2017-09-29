import fse from 'fs-extra';
import path from 'path';
import config from '../config/services.json';

const rootName = path.dirname(require.main.filename || process.mainModule.filename);
const fileName = `${rootName}/config/services.json`;

const configController = {
  async readFile(req, res, next) {

    let data = null;

    try{
      data = await fse.readJSON(fileName);
    } catch (err) {
      return next({
        status: 500,
        message: err
      })
    }

    res.send(data);
  },

  async writeFile(req, res, next) {
    const data = req.body;
    if (!data)
      return next({
        status: 400,
        message: 'Empty data!'
      });

    try {
      await fse.writeJSON(fileName, data);
    } catch (err) {
      return next({
        status: 500,
        message: err
      });
    }

    res.send(data);
  }
};


export default configController;