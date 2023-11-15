module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blogs", {
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
    });
  
    return Blog;
  };
  