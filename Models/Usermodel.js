import { db } from "../Database/db.js";
import { DataTypes } from "sequelize";
import {v4} from 'uuid'

export const Usermodel = db.define('User',{
    userid:{
        type : DataTypes.STRING,
        values : v4(),
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
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    tableName : "Users",
    paranoid : true
})