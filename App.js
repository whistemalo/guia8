import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Formulario from './src/components/Formulario'
import Pais from './src/components/Pais'

export default function App() {
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState({});

  useEffect(() => {
    const { pais } = busqueda;
    console.log(pais)
    const consultarPais = async () => {
      if (consultar) {
        const url = `https://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          console.log(resultado)
          guardarresultado(resultado);
          guardarconsultar(false);
        } 
        catch (error)
        {
          console.log(error)
          mostrarAlerta();
        }
      }
    };
    consultarPais();
  },[consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otraciudad o país'), [{ Text: 'Ok' }];
  };
  
  return (
    <View style={styles.app}>
      <View style={styles.contenido}>
        <Formulario
        busqueda={busqueda}
        guardarbusqueda={guardarbusqueda}
        guardarconsultar={guardarconsultar}
        />
        <Pais resultado={resultado} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  contenido: {
    margin: '2.5%',
  },
});


