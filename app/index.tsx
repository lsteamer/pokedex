import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

const colorsByType = {  
  "normal": "#8A8A5C",
  "fire": "#D2691E",
  "water": "#4A6FB0",
  "electric": "#D4B020",
  "grass": "#5CA830",
  "ice": "#78B0B0",
  "fighting": "#A02020",
  "poison": "#802080",
  "ground": "#C0A050",
  "flying": "#8870D0",
  "psychic": "#D84070",
  "bug": "#889018",
  "rock": "#988028",
  "ghost": "#584878",
  "dragon": "#5828D0",
  "dark": "#584030",
  "steel": "#9898B0",
  "fairy": "#CC7788",
  "stellar": "#303F8F",
  "unknown": "#508070"
}

export default function Index() {

  const[pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding: 16,
    }}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name}
        href={{
          pathname: "/details",
          params: {
            name: pokemon.name,
          }
        }}
        style={{
          backgroundColor: colorsByType[pokemon.types[0].type.name] + 80,
          padding: 20,
          borderRadius: 20,
        }}
        >

        <View>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View style={{
            flexDirection: "row",
          }}>
          <Image
            source={{uri: pokemon.image}}
            style={{width: 150, height: 150}}
          />
          </View>
        </View>
        </Link>
      )) }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})