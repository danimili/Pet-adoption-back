const Ajv = require("ajv");
const ajv = new Ajv();
 
const validateBody = (schema) => {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body)
        if (!valid) {
            res.status(400).send(ajv.errors);
            return;
        }
        next()
    }
}

module.exports = {validateBody}
