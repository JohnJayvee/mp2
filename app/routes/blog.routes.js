module.exports = app => {
    const blog = require("../controllers/blog.controller");
  
    var router = require("express").Router();
  
    // !Create a new blogs
    router.post("/create", blog.create);
  
    // !Retrieve all blogs
    router.get("/", blog.findAll);
  
    // !Retrieve all published blog
    router.get("/published", blog.findAllPublished);
  
    // !Retrieve a single blog with id
    router.get("/:id", blog.findOne);   
  
    // !Update a Tutorial with id
    router.put("/update/:id", blog.update);
  
    // !Delete a blogs with id
    router.delete("/delete/:id", blog.delete);
  
    // !Delete all blogs
    router.delete("/", blog.deleteAll);
  
    app.use('/api/blogs', router);
  };
  