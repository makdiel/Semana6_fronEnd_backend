const {Sequelize}=require('sequelize')

const sequelize= new Sequelize(
    'universidad',
    'root',
    'ServerAcceso.1',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

sequelize.authenticate()
        .then(()=>console.log('Conexion a BD exitosa'))
        .catch((error)=>console.log('Ocurrio un error al conectar con la BD' + error));

module.exports=sequelize;