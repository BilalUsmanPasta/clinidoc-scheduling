const validator = require('../../helpers/validate');

const getSchedules = (req, res, next) => {
    const validationRule = {
        pageSize: 'numeric',
        pageNo: 'numeric',
        Date:"date|required"
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


const postSchedule = (req, res, next) => {
    const validationRule = {
        practitioner_id: 'numeric|required',
        days: 'numeric|required',
        start_date_time: 'date|required',
        end_date_time: 'required|date',
        schedule_type_id: 'numeric|required',
        per_slot_mints: 'numeric|required',
        room_id: 'numeric|required'
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(402)
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

const updateSchedule = (req, res, next) => {
    const validationRule = {
        practitioner_id: 'numeric|required',
        start_date_time: 'date|required',
        end_date_time: 'required|date',
    }
    validator(req.body, validationRule, {}, (err, status) => {
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



const deleteSchedule = (req, res, next) => {
    const validationRule = {
        practitioner_id: 'numeric|required',
        start_date_time: 'date|required',
        end_date_time: 'required|date',
    }
    validator(req.body, validationRule, {}, (err, status) => {
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
    getSchedules,
    postSchedule,
    updateSchedule,
    deleteSchedule
}