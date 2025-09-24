import { View, Text, FlatList,TouchableOpacity ,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Producto } from '../Modelos/Producto';

export default function ListarProductos() {
    const [listaProducto, setListaProducto] = useState<Producto[]>([])
  
      async function listarProductos() {
  
          const response = await fetch('http://192.168.1.38:5000/producto', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const listado = await response.json();
          setListaProducto(listado)
      }
  
      useEffect(() => {
          listarProductos()
      }, []);
  
      useEffect(() => {
          console.log(listaProducto)
      }, [listaProducto])
  

  return (
    <View>
       <TouchableOpacity onPress={listarProductos}>
        <Text>Actualizar Lista</Text>
             
       {
                      listaProducto.length == 0 ? (
                          <Text>Informacion Cargando</Text>
                      )
                          : (   
                              <FlatList data={listaProducto}
                                  keyExtractor={(item) => item.idproducto.toString()}
                                  renderItem={({ item }) =>
                                      <View style={styles.container}>
                                          <Text style={styles.label}>Nombre: {item.nombre}</Text>
                                          <Text>Descr: {item.descripcion}</Text>
                                          <Text>Categoria : {item.categoria}</Text>
                                           <Text>Precio : {item.precio}</Text>
      
                                      </View>
      
                                  }
                              >
                              </FlatList>
                          )
                  }
                
      </TouchableOpacity>
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