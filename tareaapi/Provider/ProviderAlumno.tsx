import { View, Text } from 'react-native'
import React, { Children, ReactNode, useContext, useState } from 'react'
import { Alumno } from '../Modelos/Alumno'
import { contexAlumno } from '../Context/ContextAlumno'

interface plantilla{
    children:ReactNode
}

export default function ProviderAlumno({children}:plantilla) {
    const [alumno,setAlumno]=useState<Alumno[]>([]);

    function agregarAlumno(alumno:Alumno){
        setAlumno(item=>[...item,alumno])
    }

  return (
   <contexAlumno.Provider value={{alumno,agregarAlumno}}>
        {children}
   </contexAlumno.Provider>
  )
}

export function useContextAlumno(){
    return useContext(contexAlumno)
}