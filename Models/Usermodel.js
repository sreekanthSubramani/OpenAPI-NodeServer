import { db } from "../Database/db.js";
import { DataTypes, DATE, UUID } from "sequelize";


export const Usermodel = db.define('User',{
    userid:{
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true
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
    },
    refreshKey : {
        type : DataTypes.STRING,
        allowNull : true
    },
    profileLink : {
        type : DataTypes.STRING,
        allowNull : true
    }
},{
    tableName : "Users",
    paranoid : true,
})