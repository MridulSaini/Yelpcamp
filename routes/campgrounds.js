var express         =   require("express"),
    router          =   express.Router(),
    campground      =   require("../models/campgrounds"),
    middleware      =   require("../middleware"),
    nodemailer = require('nodemailer');
router.get("/enquiry",function(req, res) {
   res.render("campgrounds/enquiry"); 
});

router.post("/enquiry",function(req, res) {
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mridulmali7@gmail.com',
        pass: 'Million$'
      }
    });
    
    var mailOptions = {
      from: '"Campground Enquiry!!"<mridulmali7@gmail.com>',
      to: 'mridulmali@rocketmail.com',
      subject: 'Enquiry',
      text: 
        'Name: '+req.body.name + '\n'+'Email: '+req.body.email+'\n'+'Enquiry: '+req.body.enquiry
      };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) 
      {
        console.log(error);
      }
      else
      {
        console.log('Email sent: ' + info.response);
      }
      req.flash("success","Enquiry Submitted!");
      res.redirect("/campgrounds");
    });
});

router.get("/campgrounds",function(req,res){
    campground.find({},function(err,allcampgrounds){
        if(err)
        {
            console.log(err);   
        }else
        {
            res.render("campgrounds/index",{campgrounds:allcampgrounds , currentUser:req.user}); 
        }
        });
});

router.post("/campgrounds",middleware.IsLoggedIn,function(req,res){
    var name   = req.body.name;
    var price  = req.body.price;
    var image  = req.body.image;
    var desc   = req.body.desc;
    var author = {
                    id: req.user._id,
                    username: req.user.username
                 };
    var newCampground = {name: name,price: price, image: image, desc: desc, author: author};
    campground.create(newCampground,function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            req.flash("success","Successfully added campground!");
            res.redirect("/campgrounds");     
        }
    });
});

router.get("/campgrounds/new",middleware.IsLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

router.get("/campgrounds/:id",function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        {
            console.log(err);    
        }
        else
        {
            console.log(foundCampground);
            res.render("campgrounds/show",{campgrounds:foundCampground});
        }
    });
});

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    campground.findById(req.params.id,function(err,foundCampground){
       if(err)
       {
           console.log(err);
       }else{
            res.render("campgrounds/edit",{campground: foundCampground});    
       }
    });
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else
        {
            req.flash("success","Successfully updated campground!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
   campground.findByIdAndRemove(req.params.id,function(err){
       if(err)
       {
           res.redirect("/campgrounds");
       }else
       {
           req.flash("success","Successfully deleted campground!");
           res.redirect("/campgrounds");
       }
   }) ;
});

module.exports = router;