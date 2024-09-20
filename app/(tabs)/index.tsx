import Exercise from "@/components/Exercise";
import RenderItem from "@/components/RenderItem";
import { init, tx, id } from "@instantdb/react-native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

// ID for app: test
const APP_ID = "";

const db = init({ appId: APP_ID });

function App() {
  const { isLoading, error, data } = db.useQuery({
    exercises: {},
  });

  // const { isLoading, error, data } = db.useQuery({
  //   exercises: {},
  //   muscles_FK: {},
  // });

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="green" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return <Main data={data} />;
}

function Main({ data }: { data: any }) {
  const { exercises } = data;

  return (
    <View style={[styles.container, { backgroundColor: "black" }]}>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styles.itemContainer}>
            <RenderItem item={item} index={index} RenderComponent={Exercise} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  itemContainer: {
    paddingHorizontal: 20,
  },
  itemSeparator: {
    height: 10,
  },
});

export default App;
