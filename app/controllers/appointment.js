const express = require("express");
const { Op,fn,where,col } = require('sequelize')
const moment = require("moment")


const router = express.Router();
const { Appointments, Posts, Patients, Schedules, Profile, Room, Schedule_Type, Practitioners, AppointmentSchedule } = require("../models");
const validationMiddleware = require('../middleware/validation/appointment');


router.get("/calendar", validationMiddleware.getAppointments, async (req, res) => {
  const { pageSize, pageNo, startDate, endDate, practitioner_id, appointment } = req.query;


  let where_appointment_schedule = {
    reschedule_id: {
      [Op.is]: null, //Op.eq
    },
  }

  let where_schedule = {
    start_time: {
      [Op.gte]: startDate,
    },
    end_time: {
      [Op.lte]: endDate,
    },
  }

  if (practitioner_id) {
    where['practitioner_id'] = practitioner_id;
  }

  if (appointment == "false" || appointment == false) {
    return res.json({ ResponseCode: 'Success', data: [] });
  }

  let listOfAppointmentSchedule = await AppointmentSchedule.findAll({
    where: where_appointment_schedule,
    attributes: ['id'],
    include: [
      {
        model: Appointments,
        required: true,
        attributes: ['id', 'patient_notes', 'event_notes', 'is_completed'],
        include: [
          {
            model: Patients,
            required: true,
            attributes: ['id', 'referral_id', 'patient_name', 'phone'],
          }]
      },
      {
        model: Schedules,
        where: where_schedule,
        required: true,
        attributes: ['id', 'start_time', 'end_time', 'Date', 'booked', "task"],

        include: [
          {
            model: Room,
            attributes: ['id', 'room_no'],

            required: true,
          },
          {
            model: Schedule_Type,
            required: true,
            attributes: ['id', 'name', 'can_book', 'code'],

          },
          {
            model: Practitioners,
            attributes: ['id', 'name'],
            include: [{
              model: Profile,
              required: true,
              attributes: ['id', 'username', 'email'],
            }],
            required: true,
          },
        ]
      },
    ],
    limit: parseInt(pageSize),
    offset: (parseInt((pageNo - 1) * pageSize))
  }).catch((err) => res.json({ ResponseCode: 'Fail', data: err }));

  // listOfAppointments=listOfAppointments.map((item)=>({...item,schedule_info:{id:item.Schedule.id,end_time:item.Schedule.end_time,start_time:item.Schedule.start_time,task:item.Schedule.task,room_info:{id:item.Schedule.room_id},Date:item.Schedule.Date}}))


  res.json({ ResponseCode: 'Success', data: listOfAppointmentSchedule });

});

router.get("/appointment/schedule/details", validationMiddleware.getScheduleDetails, async (req, res) => {
  const {  appointment_id,pageSize,pageNo } = req.query;

  let listOfAppointmentSchedule = await AppointmentSchedule.findAll({
    where: {appointment_id},
    attributes: ['id','reschedule_id'],
    include: [
      // {
      //   model: Appointments,
      //   required: true,
      //   attributes: ['id', 'patient_notes', 'event_notes', 'is_completed'],
      //   include: [
      //     {
      //       model: Patients,
      //       required: true,
      //       attributes: ['id', 'referral_id', 'patient_name', 'phone'],
      //     }]
      // },
      {
        model: Schedules,
        required: true,
        attributes: ['id', 'start_time', 'end_time', 'Date', 'booked', "task"],

        include: [
          {
            model: Room,
            attributes: ['id', 'room_no'],

            required: true,
          },
          {
            model: Schedule_Type,
            required: true,
            attributes: ['id', 'name', 'can_book', 'code'],

          },
          {
            model: Practitioners,
            attributes: ['id', 'name'],
            include: [{
              model: Profile,
              required: true,
              attributes: ['id', 'username', 'email'],
            }],
            required: true,
          },
        ]
      },
    ],
    limit: parseInt(pageSize),
    offset: (parseInt((pageNo - 1) * pageSize))
  }).catch((err) => res.json({ ResponseCode: 'Fail', data: err }));

  // listOfAppointments=listOfAppointments.map((item)=>({...item,schedule_info:{id:item.Schedule.id,end_time:item.Schedule.end_time,start_time:item.Schedule.start_time,task:item.Schedule.task,room_info:{id:item.Schedule.room_id},Date:item.Schedule.Date}}))


  res.json({ ResponseCode: 'Success', data: listOfAppointmentSchedule });

});

router.get("/appointments", validationMiddleware.getAppointments, async (req, res) => {
  const { pageSize, pageNo, startDate, endDate, practitioner_id, appointment } = req.query;

  let where = {
    start_time: {
      [Op.gte]: startDate,
    },
    end_time: {
      [Op.lte]: endDate,
    },
  }

  if (practitioner_id) {
    where['practitioner_id'] = practitioner_id;
  }

  if (appointment == "false" || appointment == false) {
    return res.json({ ResponseCode: 'Success', data: [] });
  }

  let listOfAppointments = await Appointments.findAll({
    attributes: ['id', 'patient_notes', 'event_notes'],
    include: [
      {
        model: Schedules,
        where,
        required: true,
        attributes: ['id', 'end_time', 'start_time', 'Date', 'booked'],

        include: [
          {
            model: Practitioners,
            attributes: ['id', 'name'],
            include: [{
              model: Profile,
              required: true,
              attributes: ['id', 'username', 'email'],
            }],
            required: true,
          },
          {
            model: Room,
            attributes: ['id', 'room_no'],

            required: true,
          },
          {
            model: Schedule_Type,
            required: true,
            attributes: ['id', 'name', 'can_book', 'code'],
          }
        ]
      },
      {
        model: Patients,
        required: true,
        attributes: ['id', 'referral_id', 'patient_name', 'phone'],
      }
    ],
    limit: parseInt(pageSize),
    offset: (parseInt((pageNo - 1) * pageSize))
  }).catch((err) => res.json({ ResponseCode: 'Fail', data: err }));

  // listOfAppointments=listOfAppointments.map((item)=>({...item,schedule_info:{id:item.Schedule.id,end_time:item.Schedule.end_time,start_time:item.Schedule.start_time,task:item.Schedule.task,room_info:{id:item.Schedule.room_id},Date:item.Schedule.Date}}))


  res.json({ ResponseCode: 'Success', data: listOfAppointments });

});
router.post("/appointment", validationMiddleware.postAppointment, async (req, res) => {
  const {
    patient_id,
    event_notes,
    patient_notes,
    waiting = 1,
    schedule_id,
    appointment_type_id
  } = req.body;

  const patientExist = await Patients.findAll({
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
    return res.json({ ResponseCode: "Fail", errorMessage: "schedule not exist" });
  }

  if (patientExist.length <= 0) {
    return res.json({ ResponseCode: "Fail", errorMessage: "patient not exist" });

  }
  const newAppointment = await Appointments.create({
    patient_id,
    event_notes,
    patient_notes,
    waiting: waiting,
    schedule_id,
    appointment_type_id
  }).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  })
  // update schedule as booked
  // await Schedules.update({
  //   booked:true
  // },{where:{
  //   id:schedule_id
  // }})

  const newAppointmentSchedules = await AppointmentSchedule.create({
    schedule_id,
    appointment_id: newAppointment.id
  }).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  })
  return res.json({ ResponseCode: "Success", data: newAppointment });

});

router.put("/appointment", validationMiddleware.updateAppointment, async (req, res) => {
  const {
    id,
    patient_id,
    event_notes,
    patient_notes,
    waiting,
    schedule_id,
    appointment_type_id,
    is_completed,
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
    appointment_type_id,
    is_completed,
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

router.post("/appointment/reschedule", validationMiddleware.postReschecule, async (req, res) => {
  const {
    schedule_id,
    reschedule_id,
    appointment_id
  } = req.body;

  const appointmentExist = await Appointments.findAll({
    where: {
      id: appointment_id
    }
  });

  // Schedules
  const scheduleExist = await Schedules.findAll({
    where: {
      id: schedule_id
    }
  });

  // ReSchedules
  const reScheduleExist = await Schedules.findAll({
    where: {
      id: reschedule_id
    }
  });
  let appointmentScheduleExist = await AppointmentSchedule.findAll({
    where: {
      schedule_id,
      appointment_id,
      reschedule_id: {
        [Op.is]: null, //Op.eq
        // [Op.ne]: null, //Op.eq

      },
    }
  });

  if (appointmentExist.length <= 0) {
    return res.json({ ResponseCode: "Fail", errorMessage: "Appointment do not exist" });
  }
  else{
    if(appointmentExist[0].is_completed){
      return res.json({ ResponseCode: "Fail", errorMessage: "Appointment already executed" });
    }
  }

  if (appointmentScheduleExist.length <= 0) {
    //  let otherAppointmentScheduleExist = await AppointmentSchedule.findAll({
    //   where: {
    //     schedule_id,
    //     appointment_id,
    //   }
    // });
    // if(otherAppointmentScheduleExist.length > 0 ){
      return res.json({ ResponseCode: "Fail", errorMessage: "Appointment Schedule is invalid or no more active" });
    // }
    
  }
  else{
    let currentdateTime = new Date();
    let start_time = scheduleExist[0].start_time;
    start_timestamp  = moment(start_time).unix();
    currentdateTimestamp  = moment(currentdateTime).unix();

    if(start_timestamp < currentdateTimestamp){ // current 15 2022 22:00:52 GMT+0500      
      return res.json({ ResponseCode: "Fail", 
      errorMessage: "Appointment date passed " });
    }  
  }
  if (reScheduleExist.length <= 0) {
    return res.json({ ResponseCode: "Fail", errorMessage: "ReSchedule not exist" });
  }
 

  const updateAppointmentSchedule = await AppointmentSchedule.update({
    reschedule_id,
  }, {
    where: {
      schedule_id,
      appointment_id
    }
  })
  return res.json({ ResponseCode: "Success", data: updateAppointmentSchedule });


  const newAppointmentSchedules = await AppointmentSchedule.create({
    schedule_id: reschedule_id,
    appointment_id: appointment_id
  }).catch((err) => {
    res.json({ ResponseCode: "Fail", data: err });
  })

  return res.json({ ResponseCode: "Success", data: newAppointmentSchedules });
});

router.put("/appointment/approve", validationMiddleware.putAppointmentApproved, async (req, res) => {
  const {
    id
  } = req.body;

  const appointmentExist = await Appointments.findAll({
    where: {
      id
    }
  });

  if (appointmentExist.length <= 0) {
    return res.json({ ResponseCode: "Fail", errorMessage: "Appointment do not exist" });
  }
  const appointmentScheduledExist = await AppointmentSchedule.findAll({
    where: {
      appointment_id: id,
    },
    include: [
      {
        model: Schedules,
        required: true,
        attributes: ['id', 'start_time', 'end_time', 'Date', 'booked', "task"],
      }
    ]
  });
  
    let currentdateTime = new Date();
    let start_time = appointmentScheduledExist[0].Schedule.start_time;
    start_timestamp  = moment(start_time).unix();
    currentdateTimestamp  = moment(currentdateTime).unix();

    if(start_timestamp < currentdateTimestamp){ // current 15 2022 22:00:52 GMT+0500      
      return res.json({ ResponseCode: "Fail", 
      errorMessage: "Appointment date passed " });
    }     

  await Appointments.update({
    waiting:0,
  }, {
    where: {
      id
    }
  });
  const updatedAppointment = await Appointments.findAll({
    where: {
      id
    }
  });

  return res.json({ ResponseCode: "Success", data: updatedAppointment[0] });
});

module.exports = router;