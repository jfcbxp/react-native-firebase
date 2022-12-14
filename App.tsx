import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Listagem from "./src/components/Listagem";
import { realtime } from "./src/services/firebaseConnection";

export default function App() {
  const [nome, setNome] = useState("Carregando");
  const [usuarios, setUsuarios] = useState<any>([]);
  const renderItem: ListRenderItem<any> = ({ item }) => (
    <Listagem data={item} />
  );
  const keyItem: (item: any) => string = (item: any) => item.key.toString();

  useEffect(() => {
    //obter em tempo real as alteracoes
    /*
    realtime.ref("nome").on("value", (snapshot) => {
      setNome(snapshot.val());
    });
    */
    realtime.ref("usuarios").on("value", (snapshot) => {
      setUsuarios([]);
      snapshot.forEach((childItem) => {
        let data = {
          key: childItem.key,
          nome: childItem.val().nome,
          cargo: childItem.val().cargo,
        };
        setUsuarios((oldarray: any) => [...oldarray, data]);
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

  const teste = () => {
    realtime
      .ref("tipo")
      .set("Cliente")
      .then((result) => {
        realtime.ref("tipo").once("value", (snapshot) => {
          setNome(snapshot.val());

          realtime.ref("tipo").remove();
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{nome}</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNome(texto)}
      />
      <Button title="Novo funcionario" onPress={cadastrar} />
      <FlatList
        keyExtractor={keyItem}
        data={usuarios}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
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
