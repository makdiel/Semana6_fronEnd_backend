import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Alumno } from '../Modelos/Alumno';

export default function ListaAlumno() {

    const [listaAlumno, setListaAlumno] = useState<Alumno[]>([])

    async function listarAlumnos() {

        const response = await fetch('http://192.168.1.38:5000/alumno', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const listado = await response.json();
        setListaAlumno(listado)

    }

    useEffect(() => {
        listarAlumnos()
    }, []);

    useEffect(() => {
        console.log(listaAlumno)
    }, [listaAlumno])


    return (
        <View>
            <Text>Listado de Alumnos </Text>
            {
                listaAlumno.length == 0 ? (
                    <Text>Informacion Cargando</Text>
                )
                    : (

                        <FlatList data={listaAlumno}
                            keyExtractor={(item) => item.idAlumno.toString()}
                            renderItem={({ item }) =>
                                <View>
                                    <Text>Nombre Alumno: {item.nombreAlumno}</Text>
                                    <Text>Email Alumno: {item.emailAlumno}</Text>
                                    <Text>Cantidad Clase : {item.cantidadClases}</Text>

                                </View>

                            }
                        >

                        </FlatList>
                    )
            }
        </View>
    )
}