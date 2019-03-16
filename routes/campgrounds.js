var express         =   require("express"),
    router          =   express.Router(),
    campground      =   require("../models/campgrounds"),
    middleware      =   require("../middleware");
    
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