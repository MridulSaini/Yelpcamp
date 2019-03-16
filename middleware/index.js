var campground = require("../models/campgrounds");
var comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.IsLoggedIn = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();   
    }else
    {
        req.flash("error","Please Login First!");
        res.redirect("/login");
    }
};
// 5c7fb7c711f2690e6edb2da6
middlewareObj.checkCommentOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        comment.findById(req.params.comment_id,function(err,foundComment)
        {
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }else
                {
                    res.redirect("back");
                }
            }
        });
    }else
    {
        res.redirect("back");       
    }
};
    
middlewareObj.checkCampgroundOwnership = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        campground.findById(req.params.id,function(err,foundCampground)
        {
            if(err)
            {
                res.redirect("back");
            }else
            {
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }else
                {
                    req.flash("error","You don't have permission to that...");
                    res.redirect("back");
                }
            }
        });
    }else
    {
        req.flash("error","You need to be logged in to do that...");
        res.redirect("back");       
    }
};

module.exports = middlewareObj;