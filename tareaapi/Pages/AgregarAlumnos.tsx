import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Alumno } from '../Modelos/Alumno'

export default function AgregarAlumnos() {

    const [nombreAlumno, setNombreAlumno] = useState('')
    const [emailAlumno, setEmailAlumno] = useState('')
    const [cantidadClase, setCantidadClase] = useState('')

    async function agregarAlumno(){

        let alumno:Alumno={
            idAlumno:0,
            nombreAlumno:nombreAlumno,
            emailAlumno:emailAlumno,
            cantidadClases:parseInt(cantidadClase)
        }

        const respuesta= await fetch('http://192.168.1.38:5000/alumno', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(alumno)
        });

        const respuestaApi= await respuesta.json()

        if(respuestaApi){
            Alert.alert("ALumno agregado")
        }
        else{
            Alert.alert('Ocurrio un error')
        }
    }

    return (
        <View>
            <Text>Agregar Alumnos</Text>

            <TextInput placeholder='Nombre de Alumno'
                value={nombreAlumno}
                onChangeText={setNombreAlumno}
            ></TextInput>

            <TextInput placeholder='Email de Alumno'
                value={emailAlumno}
                onChangeText={setEmailAlumno}
            ></TextInput>

            <TextInput placeholder='Cantidad de clase del Alumno'
                value={cantidadClase}
                onChangeText={setCantidadClase}
            ></TextInput>

            <Button title='Agregar Alumno' onPress={agregarAlumno}></Button>
        </View>
    )
}