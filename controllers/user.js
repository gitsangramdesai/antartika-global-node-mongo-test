const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi'); 
const jwt = require('jsonwebtoken');

const User = require('../models/user').User;
const userSchema = require('../models/user').userSchema;
const CONSTANT = require('../config/constant.js');
const JWT_SECRET = CONSTANT.JWT_SECRET;

exports.create = async(req, res) => {
  const saltRounds = 10;
  const pass =  await  bcrypt.hash(req.body.password, saltRounds);
  let isError = false;
  
  let message='';
  let data={};

  /*input validation*/
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),//om
    lastName: Joi.string().min(2).max(50).required(),//pk
    emailId: Joi.string().min(5).max(100).required(),//a@b.c
    password: Joi.string().min(8).max(150).required(),
    organization: Joi.string().min(2).max(100).required(),//ibm
    employeeId: Joi.string().min(1).max(150).required()//1
  });
  const { error }  = schema.validate(req.body); 

  if(error != null)
  {
    message = error.details[0].message.replace(/"/g,'');
    isError = true;
  }else{
        try{

        const postUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            organization: req.body.organization,
            password:pass,
            employeeId:req.body.employeeId
          });

          // Save User in the database
         data = await postUser.save();
         //delete data.password;

         data={
          firstName: data.firstName,
          lastName: data.lastName,
          emailId: data.emailId,
          organization: data.organization,
          employeeId:data.employeeId
         }

         message ="Registration is Successfull!"
        }
        catch(exp)
        {
          console.log("exp",exp);
          message = exp.message;
          isError = true;
        }
     
    }

    let statusCode = isError?"400":"200";

    res.status(statusCode).send({
      data,
      "message":message
    });
};

exports.login = async (req, res) => {
  
  let message='';
  let jwtoken='';
  let data={};
  let statusCode ="200";
  
  /*input validation*/
  const schema = Joi.object({
      emailId: Joi.string().min(5).max(100).required(),
      password: Joi.string().min(8).max(150).required(),
  });
  const { error }  = schema.validate(req.body); 

  if(error != null){
    message = error.details[0].message.replace(/"/g,'');
    statusCode = "400";
  }else{
    const saltRounds = 10;
    const userPassword = req.body.password;
    const condition =  { emailId: req.body.emailId };
    
    const rdata = await User.findOne(condition).exec();

    console.log("rdata",rdata);

    const passwordMatches = await bcrypt.compare(userPassword, rdata.password);

    const tokenData = {
      firstName:rdata.firstName,
      lastName:rdata.lastName,
      emailId:rdata.emailId,
      organization:rdata.organization,
      employeeId:rdata.employeeId
    }

    if(passwordMatches)
    {
        jwtoken =  jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),data: tokenData}, JWT_SECRET);
        data={
          "accessToken":jwtoken
        }
    }

    message = passwordMatches?"login Successfull" :"Username or password does not match";
    statusCode= passwordMatches?"200" :"401";
  }

  //send response
  res.status(statusCode).send({
      data,
      "message":message
  })
};

exports.userList = async (req,res)=>{
  let data={};
  let perPage =5;
  let message='';
  let condition={};
  let statusCode="200";

  //input
  const fName = req.query.firstName ? req.query.firstName:''; 
  const lName = req.query.lastName ? req.query.lastName:'';
  const eId = req.query.employeeId ? req.query.employeeId:'';
  const pageNumber = req.query.pageNumber ? req.query.pageNumber:1;

  //calculate offset
  const offset = ((pageNumber -1) * perPage)

  if(pageNumber==0)
  {
    data =await User.find(
      {
          firstName: { $regex: '.*' + fName + '.*' }, 
          lastName: { $regex: '.*' + lName + '.*' } ,
          employeeId: { $regex: '.*' + eId + '.*' } 
      }
    ).sort(
        {
          firstName: 1, 
          lastName: 1,
          emailId:1,
          employeeId:1,
          organization:1
        })
    .select({ 
        "firstName": 1,
        "lastName":1,
        "employeeId":1,
        "emailId":1,
        "organization":1, 
        "password":1,
        "_id": 0
      }).exec();

  }else{
    data =await User.find(
      {
          firstName: { $regex: '.*' + fName + '.*' }, 
          lastName: { $regex: '.*' + lName + '.*' } ,
          employeeId: { $regex: '.*' + eId + '.*' } 
      }
    ).sort(
      {
        firstName: 1, 
        lastName: 1,
        emailId:1,
        employeeId:1,
        organization:1
      })
    .select({ 
        "firstName": 1,
        "lastName":1,
        "employeeId":1,
        "emailId":1,
        "organization":1, 
        "password":1,
        "_id": 0
      }).skip(offset).limit(perPage).exec();
  }


  data = data.map((m)=>{
      return {
        "firstName": m.firstName,
        "lastName":m.lastName,
        "employeeId":m.employeeId,
        "emailId":m.emailId,
        "organization":m.organization
      }
  })





  message =  "Total " + data.length + " record(s) found !"  
 
   //statusCode = data.length > 0 ? "200":"204"

   statusCode = data.length > 0 ? "200":"200"

  res.status(statusCode).send({
    data,
    "message":message
  });
}