import { db } from "../Database/db.js";
import { DataTypes } from "sequelize";
import { UUID } from "sequelize";

export const Locationmodel =  db.define('Locations',{
    locationID : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },
    userid : {
        type : DataTypes.UUID,
        allowNull : false,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    latitude : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    longitude : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    state : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    tableName : "Location",
    paranoid : true,
    timestamps : true,
    indexes : [
        {fields : ['userid']},
        {fields : ['userid', 'createdAt' ]}
    ]
})


