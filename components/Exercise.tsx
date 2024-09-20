import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomCollapsible } from "./CustomCollapsible";
import { ThemedText } from "./ThemedText";
import { SchemaTypes } from "../types/SchemaTypes";

type ExerciseProps = {
  item: SchemaTypes["exercises"];
  index: number;
};

const Exercise: React.FC<ExerciseProps> = ({ item, index }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = (isOpen: boolean) => {
    // if (isOpen && images.length === 0) {
    //   fetchImages(); // Cargar las imágenes cuando se abre el toggle por primera vez
    // }
  };

  const formatInstructions = (instructions: string): string => {
    try {
      // Parse the JSON string to an array
      const instructionsArray = JSON.parse(instructions) as string[];

      // Join the array elements into a single string with new lines between them
      const instructionsString = instructionsArray.join(" ");

      // Ensure there is a space after each period
      const formattedString = instructionsString.replace(/(\.)(?!\s)/g, "$1 ");

      return formattedString;
    } catch (error) {
      console.error("Error parsing instructions:", error);
      return instructions; // Return raw instructions if parsing fails
    }
  };

  if (error) return <Text style={{ color: "white" }}>{error}</Text>;

  return (
    <CustomCollapsible index={index} title={item.name} onToggle={handleToggle}>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>
          {formatInstructions(item.instructions)}
        </Text>
        {isLoading && <ActivityIndicator />}
        {/* {images.length > 0 &&
          !isLoading &&
          images.map((imagePath, idx) => (
            <RemoteImage
              key={idx}
              fallback={
                "https://i.pinimg.com/236x/e9/04/c5/e904c5e5153bd1f31d60a3704a1bf3e3.jpg"
              }
              path={imagePath}
              style={styles.image}
              resizeMode="contain"
            />
          ))} */}
      </View>
    </CustomCollapsible>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: 200, // Ajusta según sea necesario
    marginTop: 10,
    borderRadius: 10,
  },
});

export default Exercise;
