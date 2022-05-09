const validator = require('../../helpers/validate');

const getAppointments = (req, res, next) => {
    const validationRule = {
        pageSize: 'numeric|required',
        pageNo: 'numeric|required',
        startDate:'required|date',
        endDate:'required|date',
        appointment:'boolean'
    }
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

const getScheduleDetails = (req, res, next) => {
    const validationRule = {
        pageSize: 'numeric|required',
        pageNo: 'numeric|required',
        appointment_id:'numeric|required'
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

const postReschecule = (req, res, next) => {
    const validationRule = {
        schedule_id: 'required|numeric',
        reschedule_id: 'required|numeric',
        appointment_id: 'required|numeric',
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

const putAppointmentApproved = (req, res, next) => {
    const validationRule = {
        id: 'required|numeric',
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

const postAppointment = (req, res, next) => {
    const validationRule = {
        patient_id: 'required|numeric',
        event_notes: 'string',
        patient_notes: 'string',
        waiting: 'boolean',
        schedule_id: 'required|numeric',
        appointment_type_id: 'required|numeric',
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

const updateAppointment = (req, res, next) => {
    const validationRule = {
        id: 'required|numeric',
        patient_id: 'required|numeric',
        event_notes: 'string',
        patient_notes: 'string',
        waiting: 'boolean',
        schedule_id: 'required|numeric',
        appointment_type_id: 'required|numeric',
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



const deleteAppointment = (req, res, next) => {
    const validationRule = {
        id: 'required|numeric',
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
    getAppointments,
    postAppointment,
    updateAppointment,
    deleteAppointment,
    postReschecule,
    putAppointmentApproved,
    getScheduleDetails,
}