import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { realtime } from "./src/services/firebaseConnection";

export default function App() {
  const [nome, setNome] = useState("Carregando");

  useEffect(() => {
    //obter em tempo real as alteracoes
    /*
    realtime.ref("nome").on("value", (snapshot) => {
      setNome(snapshot.val());
    });
    */
    realtime
      .ref("tipo")
      .set("Cliente")
      .then((result) => {
        realtime.ref("tipo").once("value", (snapshot) => {
          setNome(snapshot.val());

          realtime.ref("tipo").remove();
        });
      });
  }, []);

  const cadastrar = () => {
    //realtime.ref("usuarios").push().key;
    realtime.ref("usuarios").child("1").set({
      nome: nome,
      cargo: "teste2",
    });
  };

  return (
    <View style={styles.container}>
      <Text>{nome}</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNome(texto)}
      />
      <Button title="Novo funcionario" onPress={cadastrar} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 40,
  },
});
