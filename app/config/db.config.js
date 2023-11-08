module.exports = {
  HOST: "localhost",
  USER: "valet",
  PASSWORD: "root",
  DB: "mp2",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
