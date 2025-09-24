import { View, Text, FlatList } from 'react-native'
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
      <Text>ListarProductos</Text>
       {
                      listaProducto.length == 0 ? (
                          <Text>Informacion Cargando</Text>
                      )
                          : (
      
                              <FlatList data={listaProducto}
                                  keyExtractor={(item) => item.idproducto.toString()}
                                  renderItem={({ item }) =>
                                      <View>
                                          <Text>Nombre: {item.nombre}</Text>
                                          <Text>Descr: {item.descripcion}</Text>
                                          <Text>Categoria : {item.categoria}</Text>
                                           <Text>Precio : {item.precio}</Text>
      
                                      </View>
      
                                  }
                              >
      
                              </FlatList>
                          )
                  }
    </View>
  )
}