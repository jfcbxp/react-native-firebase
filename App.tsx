import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    realtime.ref("nome").once("value", (snapshot) => {
      setNome(snapshot.val());
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{nome}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
