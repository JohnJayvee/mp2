module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // !Create a new users
    router.post("/create", user.create);
  
    // !Retrieve all users
    router.get("/", user.findAll);
  
    // !Retrieve all published users
    router.get("/published", user.findAllPublished);
  
    // !Retrieve a single users with id
    router.get("/:id", user.findOne);   
  
    // !Update a Tutorial with id
    router.put("/update/:id", user.update);
  
    // !Delete a users with id
    router.delete("/delete/:id", user.delete);
  
    // !Delete all users
    router.delete("/", user.deleteAll);
  
    app.use('/api/users', router);
  };
  