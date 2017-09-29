import fse from 'fs-extra';
import path from 'path';
import config from '../config/config.json';

const configController = {
  readFile(req, res, next) {
    res.send(
      req.query.name ?
        config[req.query.name] : config
    )
  },

  async writeFile(req, res, next) {
    const {data} = req.body;

    if (!data)
      return next({
        status: 400,
        message: 'Empty data!'
      });

    const rootName = path.dirname(require.main.filename || process.mainModule.filename);
    const fileName = `${rootName}/config/config.json`;

    try {
      await fse.outputFile(fileName, data);
    } catch (err) {
      console.log(err);
      return next({
        status: 500,
        message: err
      });
    }

    res.send(data);
  }
};


export default configController;