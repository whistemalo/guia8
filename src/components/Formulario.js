import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker';

const Formulario = ({ busqueda, guardarbusqueda, guardarconsultar }) => {

    const { pais } = busqueda;

    const consultarPais = () => {
        if(pais.trim() === '')
        {
            mostrarAlerta();
            return
        }

        guardarconsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert('Error', 'Debe de Seleccionar un pais', [{Text: 'Entendido'}])
    }

    const [ animacionBoton ] = useState(new Animated.Value(1));

    const animacionEntrada = () => {
        Animated.spring( animacionBoton, { toValue: .9 } ).start();
    }

    const animacionSalida = () => {
        Animated.spring( animacionBoton, { toValue: 1 }).start();
    }

    const estiloAnimacion = {
        transform:[{
            scale: animacionBoton
        }]
    }

  return(
    <>
      <View>
        <Text style = { styles.input }>País</Text>
      </View>
      <View>
        <Picker 
            style = { styles.itempais }
            selectedValue = { pais }
            onValueChange = { pais => guardarbusqueda({ ...busqueda, pais }) }
        >
          <Picker.Item  label = 'Seleccione un pais' value = '' />
          <Picker.Item  label = 'Canada' value = 'ca' />
          <Picker.Item  label = 'El Salvador' value = 'sv' />
          <Picker.Item  label = 'Guatemala' value = 'gt' />
          <Picker.Item  label = 'Honduras' value = 'hn' />
          <Picker.Item  label = 'Nicaragua' value = 'ni' />
          <Picker.Item  label = 'Panama' value = 'pa' />
          <Picker.Item  label = 'Costa Rica' value = 'cr' />
          <Picker.Item  label = 'Mexico' value = 'mx' />
          <Picker.Item  label = 'Argentina' value = 'ar' />
          <Picker.Item  label = 'Estados Unidos' value = 'us' />
          <Picker.Item  label = 'Colombia' value = 'co' />
          <Picker.Item  label = 'España' value = 'es' />
          <Picker.Item  label = 'Peru' value = 'pe' />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPress = { () => consultarPais() }
        onPressIn = { () => animacionEntrada() }
        onPressOut = { () => animacionSalida() }
      >
        <Animated.View style = {[ styles.btnBuscar, estiloAnimacion ]}>
            <View style = { styles.btnBuscar }>
                <Text style = { styles.textBuscar } >Buscar País</Text>
            </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
    input: {
        padding:10,
        height:50,
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
        color :'#000'
    },
    itempais: {
        height: 60,
        backgroundColor: '#FFF' 
    },
    btnBuscar: {
        marginTop:50,
        height:50,
        backgroundColor:'#000',
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },
    textBuscar: {
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:"center",
        fontSize:18
    }
})

export default Formulario;