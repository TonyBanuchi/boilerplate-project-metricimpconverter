'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
    try{
      const input = req.query.input;
      const convResult = convertHandler.getConversionOutput(input);
      if( convResult.outType === 'text' ){
        res.send(convResult.output);
      } else if ( convResult.outType === 'json' ){
        res.json(convResult.output);
      } else {
        throw new Error(`Unhandled output Type returned. "${convResult.outType}"`);
      }

    }catch(e){
      res.status(400).send(e);
    }
  });

};
