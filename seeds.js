var mongoose = require("mongoose");
var campground = require("./models/campgrounds");
var comment = require("./models/comment");

var data = [
        {
            name:"Desert Mesa",
            image:"https://www.photosforclass.com/download/flickr-1430198323",
            desc:"Short ribs pork chop fatback burgdoggen andouille pig porchetta tail strip steak hamburger rump. Chicken corned beef shankle sirloin. Turducken strip steak sausage pork loin. Chuck swine strip steak leberkas doner."
        },{
            name:"Canyon Floor",
            image:"https://www.photosforclass.com/download/flickr-2770447094",
            desc:"Short ribs pork chop fatback burgdoggen andouille pig porchetta tail strip steak hamburger rump. Chicken corned beef shankle sirloin. Turducken strip steak sausage pork loin. Chuck swine strip steak leberkas doner."
        },{
            name:"Mountain Goat's Rest",
            image:"https://www.photosforclass.com/download/flickr-225912054",
            desc:"Short ribs pork chop fatback burgdoggen andouille pig porchetta tail strip steak hamburger rump. Chicken corned beef shankle sirloin. Turducken strip steak sausage pork loin. Chuck swine strip steak leberkas doner."
        }
    ]

    function seedDB()
    {
        campground.deleteMany({},function(err){
        if(err)
        {
            console.log(err)
        }
        console.log("Remove Campgrounds!!");
        // data.forEach(function(seed){
        //     campground.create(seed,function(err,campground){
        //       if(err)
        //       {
        //           console.log(err);
        //       }else
        //       {
        //           console.log("Campground Added!!");
                   
        //           comment.create({
        //               text:"This place is great!",
        //               author:"Homer"
        //           },function(err,comment){
        //               if(err)
        //               {
        //                   console.log(err);
        //               }else{
        //                   campground.comments.push(comment);
        //                   campground.save();
        //                   console.log("Created new comment");
        //               }
        //           });
        //       }
        //     });
        // });    
    });
}



module.exports = seedDB;