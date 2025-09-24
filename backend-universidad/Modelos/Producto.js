
const { DataTypes } = require('sequelize')
const sequelize= require('../Conexion/database')

const Producto= sequelize.define('Producto',{
    
    idproducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.STRING
    },
    categoria:{
        type: DataTypes.STRING
    },
    precio:{
        type:DataTypes.INTEGER
    },
     image_name:{
        type: DataTypes.STRING
    },
     image_url:{
        type: DataTypes.STRING
    }
},{
    tableName:'Producto',
    timestamps:false
});

module.exports=Producto;