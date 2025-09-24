import { createContext } from "react";
import { Alumno } from "../Modelos/Alumno";
import { Producto } from "../Modelos/Producto"
import AgregarProductos from "../Pages/AgregarProductos";

export const contexAlumno=createContext({
    alumno : [] as Alumno[],
    agregarAlumno:(alumno:Alumno)=>{},
    listarAlumno:(alumno:Alumno)=>{},
    AgregarProductos:(producto:Producto)=>{},
    //AgregarProductos:(producto:Producto)=>{}
})