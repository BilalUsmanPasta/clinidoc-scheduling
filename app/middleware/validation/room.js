const validator = require('../../helpers/validate');


const getRooms = (req, res, next) => {
    const validationRule = {
        pageSize: 'numeric',
        pageNo: 'numeric',
        branch_code:"string|required"
    }
    console.log(req.query, "req.query")
    validator(req.query, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(404)
                .send({
                    ResponseCode: "Fail",
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    getRooms,
   
}