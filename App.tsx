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
import { realtime, firebaseAuth } from "./src/services/firebaseConnection";

export default function App() {
  const [nome, setNome] = useState("Carregando");
  const [usuarios, setUsuarios] = useState<any>([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    firebaseAuth
      .createUserWithEmailAndPassword(email, senha)
      .then((result) => {
        alert(result.user?.uid);
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("teste");
        }
        if (error.code === "auth/invalid-email") {
          alert("teste");
        }
      });
  };

  const teste = () => {
    //realtime.ref("usuarios").push().key;
    realtime.ref("usuarios").child("1").set({
      nome: nome,
      cargo: "teste2",
    });
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
      <Button title="Teste" onPress={teste} />
      <FlatList
        keyExtractor={keyItem}
        data={usuarios}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(senha) => setSenha(senha)}
      />
      <Button title="Cadastrar" onPress={cadastrar} />
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
