import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sid, setSid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUsersById = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const json = await response.json();
      setData(json);
      if (json.name != null){
        setName(json.name)
        setEmail(json.email)
      }
      else{
        alert(`el id ${id} no fue encontrado`)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //getUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: 'blue' }]}
        onPress={getUsers}
      >
        <Text style={{ color: 'yellow' }}>Listar Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons, { backgroundColor: 'red' }]}
        onPress={()=>getUsersById(sid) }
      >
        <Text style={{ color: 'yellow' }}>Buscar Por ID</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.Inputs}
        placeholder="Ingrese Id Usuario"
        onChangeText={sid => setSid(sid)}
        value={sid}
      />

      <TextInput
        style={styles.Inputs}
        value={name}
      />

      <TextInput
        style={styles.Inputs}
        value={email}
      />




      {isLoading ? <ActivityIndicator size="large" color="green" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (

            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: item.id % 2 == 0 ? 'green' : 'violet' }]}
              onPress={() => {
                if (confirm(`esta seguro de borrar el usuario ${item.name}?`)) {
                  alert("Borrado")
                }

              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}, {item.email}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Inputs: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'orange',
    textAlign: 'center',
    marginTop: 10
  }
});
