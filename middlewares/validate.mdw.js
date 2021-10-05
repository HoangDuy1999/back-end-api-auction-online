const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv(/*{ allErrors: true }*/);
addFormats(ajv);
module.exports = function (schema, arequired = null) {
  return function (req, res, next) {
    let validate = null;
    if (arequired != null) {
      schema.required = arequired;
      validate = ajv.compile(schema);
    } else {
      validate = ajv.compile(schema);
    }
    //console.log(req.body);
    console.log(schema.required);
    const valid = validate(req.body);
    //console.log(validate.errors);
    if (!valid) {
      const temp = validate.errors;
      //console.log(temp);
      if (temp[0].params.missingProperty == undefined) {
        return res.status(400).json({ message: `Dư trường dữ liệu '${temp[0].params.additionalProperty}'` });
      }else{
        return res.status(400).json({ message: `Thiếu trường dữ liệu '${temp[0].params.missingProperty}'` });
      }
    }
    next();
  }
};