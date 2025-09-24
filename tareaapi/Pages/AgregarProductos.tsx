import { TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Producto } from '../Modelos/Producto'
import { Picker } from '@react-native-picker/picker';


export default function AgregarProductos() {
    const [NombreProducto, setNombreProducto] = useState('');
    const [DescripcionProducto, setDescripcionProducto] = useState('');
    const [Estado, setSelectEstado] = useState('');
    const [Categoria, setSelectCategoria] = useState('');
    const [Precio, setPrecio] = useState('');
   

    // Datos predeterminados para la lista de selección
    const ListaCategorias = [
        { label: 'Seleccione una Categoria', value: '' },
        { label: 'Lacteos', value: 'Lacteos' },
        { label: 'Carnes', value: 'Carnes' },
        { label: 'Verduras', value: 'Verduras' },
        { label: 'Aseo', value: 'Aseo' },
    ];

    // Datos predeterminados para la lista de selección
    const ListaEstado = [
        { label: 'Seleccione un precio', value: '' },
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' },
    ];
    async function agregarProducto() {

        let producto: Producto = {
            idproducto: 0,
            nombre: NombreProducto,
            descripcion: DescripcionProducto,
            estado: Estado,
            categoria: Categoria,
            precio: parseInt(Precio)
          
        }


        const respuesta = await fetch('http://192.168.1.38:5000/producto', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        const respuestaApi = await respuesta.json()

        if (respuestaApi) {
            Alert.alert("Producto agregado")
        }
        else {
            Alert.alert('Ocurrio un error')
        }
       
    }
     const handlePrecioChange = (text: string) => {
            // Eliminar cualquier cosa que no sea un número
            const cleanText = text.replace(/[^0-9.]/g, '');

            // Si el texto limpio tiene más de un punto decimal, lo elimina
            if ((cleanText.match(/\./g) || []).length > 1) return;

            setPrecio(cleanText);
        };
        
    return (
        <View style={styles.container}>
            <Text>Agregar Productos</Text>

            <TextInput placeholder='Nombre de Producto'
                value={NombreProducto}
                onChangeText={setNombreProducto}
            ></TextInput>

            <TextInput placeholder='Descripcion'
                value={DescripcionProducto}
                onChangeText={setDescripcionProducto}
            ></TextInput>



            <Text style={styles.label}>Seleccione la categoria:</Text>
            <Picker
                selectedValue={Estado}
                onValueChange={(itemValue) => setSelectEstado(itemValue)}
                style={styles.picker}
            >
                {ListaEstado.map((opcion, index) => (
                    <Picker.Item key={index} label={opcion.label} value={opcion.value} />
                ))}
            </Picker>
            <Text>Estado seleccionado: {Estado ? `$${Estado}` : 'Ninguno'}</Text>

            <Text style={styles.label}>Seleccione la categoria:</Text>
            <Picker
                selectedValue={Categoria}
                onValueChange={(itemValue) => setSelectCategoria(itemValue)}
                style={styles.picker}
            >
                {ListaCategorias.map((opcion, index) => (
                    <Picker.Item key={index} label={opcion.label} value={opcion.value} />
                ))}
            </Picker>
            <Text>Categoria seleccionada: {Categoria ? `$${Categoria}` : 'Ninguno'}</Text>

            <TextInput placeholder='Precio'
                value={Precio}
                onChangeText={handlePrecioChange}
                keyboardType="numeric"
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingLeft: 10,
                }}
            ></TextInput>


            <Button title='Agregar Producto' onPress={agregarProducto}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
});