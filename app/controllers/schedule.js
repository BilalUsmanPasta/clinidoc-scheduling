const express = require("express");
const moment = require("moment")


const router = express.Router();
const {  Room, Schedule_Type, Practitioners,Branch ,Schedules } = require("../models");
const validationMiddleware = require('../middleware/validation/schedule');


router.get("/rooms", async (req, res) => {
  const { pageSize=10, pageNo=1} = req.query;
 
listOfRooms=  await Room.findAndCountAll({
pageSize,
pageNo
})

  res.json({ ResponseCode: 'Success', data: listOfRooms });

});


// schedule creation

router.post("/schedule", validationMiddleware.postSchedule, async (req, res) => {
  const {
      practitioner_id,
      days,
      start_date_time,
      end_date_time,
      schedule_type_id,
      per_slot_mints,
      room_id
  } = req.body;

let practitionerExist=  await Practitioners.findAll({where:{
      id:practitioner_id
  }})

  if(practitionerExist.length<=0){
      res.json({ ResponseCode: "Fail", errorMessage: "Practitioner not exist" });
  }

  let roomExist=  await Room.findAll({where:{
      id:room_id
  }});


  if(roomExist.length<=0){
      res.json({ ResponseCode: "Fail", errorMessage: "Room not exist" });
  }

  // schedule slot creation
  let x = {
      slotInterval: per_slot_mints,
      startDateTime: start_date_time,
      endDateTime: end_date_time
  };
  let schedule_slots = [];
  for (let i = 0; i < days; i++) {
      let startTime = moment(x.startDateTime, "YYYY-MM-DDTHH:mm").add(i, 'days');;
      let endTime = moment(x.endDateTime, "YYYY-MM-DDTHH:mm").add(i, 'days');;
      //Loop over the times - only pushes time with  minutes interval
      while (startTime < endTime) {
          //Push times
          // let start_time = { ...startTime };
          // let end_time = start_time.add(x.slotInterval, 'minutes')
          schedule_slots.push({ start_time: startTime.format("YYYY-MM-DDTHH:mm"), end_time: startTime.add(x.slotInterval, 'minutes').format("YYYY-MM-DDTHH:mm"), room_id: room_id, Date: startTime.format("YYYY-MM-DD"), schedule_type_id: schedule_type_id, practitioner_id: practitioner_id });
          //Add interval of  minutes
          // startTime.add(x.slotInterval, 'minutes');
      }
  }
  // schedule slot creation
  // insert data 
  schedule_slots = await Schedules.bulkCreate([...schedule_slots]).catch((err) => {
      res.json({ ResponseCode: "Fail", data: err });

  })
  res.json({ ResponseCode: "Success", data: schedule_slots });
});


router.get("/branches", async (req, res) => {
  const { pageSize=10, pageNo=1} = req.query;
 
listOfBranches=  await Branch.findAndCountAll({
pageSize,
pageNo
})

  res.json({ ResponseCode: 'Success', data: listOfBranches });

});





router.get("/schedule-types", async (req, res) => {
  const { pageSize=10, pageNo=1} = req.query;
 
listOfScheduleTypes=  await Schedule_Type.findAndCountAll({
pageSize,
pageNo
})

  res.json({ ResponseCode: 'Success', data: listOfScheduleTypes });

});


module.exports = router;