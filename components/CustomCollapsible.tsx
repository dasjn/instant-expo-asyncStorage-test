import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type CustomCollapsibleProps = PropsWithChildren<{
  title: string;
  index: number;
  onToggle?: (isOpen: boolean) => void; // Nueva propiedad para manejar el cambio de estado
}>;

export function CustomCollapsible({
  children,
  title,
  index,
  onToggle,
}: CustomCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundColor = index % 2 === 0 ? "violet" : "yellow";

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState); // Llama a la función onToggle cuando cambie el estado
  };

  return (
    <View style={{ backgroundColor }}>
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.8 : 1.0 },
        ]}
      >
        <View style={styles.heading}>
          <ThemedText
            style={{ marginRight: 10, flexShrink: 1, fontSize: 18 }}
            type="title"
          >
            {title}
          </ThemedText>
          <Ionicons
            name={isOpen ? "chevron-down" : "chevron-up"}
            size={24}
            color={"black"}
          />
        </View>
      </Pressable>

      {isOpen && (
        <View style={[styles.content, { backgroundColor: "black" }]}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60, // Altura fija para la cabecera
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  content: {
    padding: 20,
  },
});
