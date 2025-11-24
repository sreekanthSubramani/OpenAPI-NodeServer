import { Sequelize } from "sequelize";



export const db = new Sequelize(process.env.DB_Name, process.env.DB_Username,process.env.DB_Password,{
    host : process.env.DB_Host,
    dialect : "mysql",
    logging : console.log,
    port : process.env.DB_PORT
})


