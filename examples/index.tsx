import { id, init, tx } from "@instantdb/react-native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FlatList } from "react-native";
import { useState } from "react";

// ID for app: test
const APP_ID = "cfc5e200-bc0f-416a-9e74-dda3e0386f2a";

const db = init({ appId: APP_ID });

function App() {
  const { isLoading, error, data } = db.useQuery({ messages: {} });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return <Main data={data} />;
}

function addMessage(text: string) {
  db.transact(
    tx.messages[id()].update({
      text,
      createdAt: new Date(),
    })
  );
}

function deleteMessage(id: string) {
  db.transact(tx.messages[id].delete());
}

function Main({ data }) {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add Task"
        keyboardType="default"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <Button
        title="Add Message"
        onPress={() => {
          addMessage(inputText);
          setInputText(""); // Clear the input after adding a message
        }}
      />
      <FlatList
        data={data.messages} // Adjust to match the structure of your data
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.text}</Text>
            <Button title="delete" onPress={() => deleteMessage(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 30,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
  messageContainer: {
    padding: 8,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default App;
