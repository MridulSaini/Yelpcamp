var express         =   require("express"),
    router          =   express.Router(),
    comment         =   require("../models/comment"),
    campground      =   require("../models/campgrounds"),
    middleware      =   require("../middleware");

router.get("/campgrounds/:id/comments/new",middleware.IsLoggedIn,function(req, res) {
    campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }else{
            res.render("comments/new",{campground : campground});      
        }
    });
});

router.post("/campgrounds/:id/comments",middleware.IsLoggedIn,function(req, res) 
{
    campground.findById(req.params.id,function(err,campground)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }else
        {
            comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });    
        }
    });
}
);

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err)
        {
            res.redirect("back");
        }else
        {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else
        {
            req.flash("success","Successfully updated comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
    comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err)
       {
           res.redirect("back");
       }else
       {
           req.flash("success","Successfully deleted comment!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

module.exports = router;