import { View, Text } from 'react-native'
import React, { Children, ReactNode, useContext, useState } from 'react'
import { Alumno } from '../Modelos/Alumno'
import { contexAlumno } from '../Context/ContextAlumno'
import { Producto } from '../Modelos/Producto'

interface plantilla{
    children:ReactNode
}

export default function ProviderAlumno({children}:plantilla) {
    const [alumno,setAlumno]=useState<Alumno[]>([]);
    const [producto,setProducto]=useState<Producto[]>([]);

    function agregarAlumno(alumno:Alumno){
        setAlumno(item=>[...item,alumno])
    }

     function AgregarProductos(producto:Producto){
        setProducto(item=>[...item,producto])
    }

  return (
   <contexAlumno.Provider value={{alumno,agregarAlumno,AgregarProductos}}>
        {children}
   </contexAlumno.Provider>
  )
}

export function useContextAlumno(){
    return useContext(contexAlumno)
}