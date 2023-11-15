const db = require("../models");
const Blog = db.blogs;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const blog = {
    title: req.body.title,
    content: req.body.content
  };

  // Save user in the database
  Blog.create(blog)
    .then(data => {
      // res.send({
      //   message: "blog created successfully!",
      //   data: data
      // });
      res.status(201).send({
        status: true,
        message: "Blog created successfully!",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the blog."
      });
    });
};
// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;


  Blog.findAll({ where: condition })
    .then(data => {
      // res.send(data);
      res.status(200).send({
        status: true,
        message: 'success fetch all blog',
        data: data
      });
      // console.log(Object.keys(req.query).length);
      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    });
};

// Find a single with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findByPk(id)
    .then(data => {
      if (data) {
        // res.send(data);
        res.status(200).send({
          status: true,
          message: `Success find Blog with id=${id}.`,
          data: data
        });
      } else {
        res.status(404).send({
          message: `Cannot find Blog with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error retrieving blog with id=" + id
      });
    });
};

// Update a blog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Blog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "blog was updated successfully."
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update user with id=${id}. Maybe blog was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "Blog was deleted successfully!"
        });
      } else {
        res.send({
          status: false,
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Blog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        status: true,
        message: `${nums} users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// find all published user
exports.findAllPublished = (req, res) => {
  Blog.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


