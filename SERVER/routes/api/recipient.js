const router = require('express').Router();
let Recipient = require('../../models/recipient.model');

router.route('/').get((req,res)=>{
    Recipient.find()
        .then(recipient=> res.json(recipient))
        .catch(err => res.status(400).json('Error:'+err));
}); 

router.route('/').post((req,res)=>{
    Recipient.create({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        bloodgroup: req.body.bloodgroup,
        organ: req.body.organ,
        publicKey :req.body.publicKey,
        buffer:req.body.buffer,
    })
    .then(()=> res.json('Recipient added Successfully'))
    .catch(err => res.status(400).json('Email Registered'));
});

module.exports = router;