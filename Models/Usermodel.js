import { db } from "../Database/db.js";
import { DataTypes } from "sequelize";


export const Usermodel = db.define('User',{
    userid:{
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    dob : {
        type : DataTypes.STRING,
        allowNull : false
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    tableName : "Users",
    paranoid : true,
})