import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function Details() {

    const params = useLocalSearchParams();
    console.log(params);
  return (
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding: 16,
    }}>

        <View>
            <Text style={{

    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
            }}>{params.name}</Text>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

})