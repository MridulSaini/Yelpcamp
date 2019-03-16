var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    mongoose        =   require("mongoose"),
    methodOverride  =   require("method-override"),
    flash           =   require("connect-flash"),
    passport        =   require("passport"),
    localStrategy   =   require("passport-local"),
    campground      =   require("./models/campgrounds"),
    comment         =   require("./models/comment"),
    user            =   require("./models/user"),
    seedDB          =   require("./seeds");
    
    
var campgroundRoutes   =   require("./routes/campgrounds"), 
    commentRoutes      =   require("./routes/comments"),
    indexRoutes        =   require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

app.use(require("express-session")({
    secret: "Danger!!",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res ,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp!! Server has started");
});