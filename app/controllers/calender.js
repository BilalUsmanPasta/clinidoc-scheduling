const express = require("express");
const router = express.Router();
const { Appointments, Posts, Patient, Schedules } = require("../models");
const validationMiddleware = require('../middleware/validation/appointment');

router.get("/s", validationMiddleware.getAppointments, async (req, res) => {
  const { pageSize, pageNo } = req.query;
  const listOfAppointments = await Appointments.findAll({
    limit: parseInt(pageNo),
    offset: (parseInt((pageNo - 1) * pageSize))
  }).catch((err) => res.json({ ResponseCode: 'Fail', data: err }));
  res.json({ ResponseCode: 'Success', data: listOfAppointments });
});

router.post("/appointment", validationMiddleware.postAppointment, async (req, res) => {
  const {
    patient_id,
    event_notes,
    patient_notes,
    waiting,
    schedule_id,
    appointment_type_id
  } = req.body;

  const patientExist = await Patient.findAll({
    where: {
      id: patient_id
    }
  });

  // Schedules
  const scheduleExist = await Schedules.findAll({
    where: {
      id: schedule_id
    }
  });
  if (scheduleExist.length <= 0) {
    res.json({ ResponseCode: "Fail", errorMessage: "schedule not exist" });

  }
  if (!patientExist.length <= 0) {
    res.json({ ResponseCode: "Fail", errorMessage: "patient not exist" });

  }
  const newAppointment = await Appointments.create({
    patient_id,
    event_notes,
    patient_notes,
    waiting,
    schedule_id,
    appointment_type_id
  }).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  })
  res.json({ ResponseCode: "Success", data: newAppointment });

});



router.put("/appointment", validationMiddleware.updateAppointment, async (req, res) => {
  const {
    id,
    patient_id,
    event_notes,
    patient_notes,
    waiting,
    schedule_id,
    appointment_type_id
  } = req.body;


  //apointment Exist
  const appointmentExist = await Appointments.findAll({
    where: {
      id: id
    }
  });
  if (appointmentExist.length <= 0) {
    res.json({ ResponseCode: "Fail", errorMessage: "appointment not exist" });

  }
  await Appointments.update({
    patient_id,
    event_notes,
    patient_notes,
    waiting,
    schedule_id,
    appointment_type_id
  },
    {
      where: { id: id }
    }
  ).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  });


  const updateApp = await Appointments.findAll({
    where: { id: id }
  }
  ).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  })
  res.json({ ResponseCode: "Success", data: updateApp });


  // res.json({ ResponseCode: "Success", data: newAppointment });

});


router.delete("/appointment", validationMiddleware.deleteAppointment, async (req, res) => {
  const { id } = req.body;
  const data = await Appointments.destroy({
    where: {
      id: id
    }
  }).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });

  });
  res.json({ ResponseCode: "Success", data: data });
});

module.exports = router;