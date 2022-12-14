import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  data: any;
};

const Listagem = (props: Props) => {
  return (
    <View>
      <Text>{props.data.nome}</Text>
    </View>
  );
};

export default Listagem;

const styles = StyleSheet.create({});
