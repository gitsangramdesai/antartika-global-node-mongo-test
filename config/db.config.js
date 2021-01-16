module.exports = {
    HOST: "localhost",
    USER: "xdba",
    PASSWORD: "sangram",
    DB: "sangram",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};