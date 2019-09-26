import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  AsyncStorage,
  StatusBar
} from "react-native";

export class Archive extends Component {
  static navigationOptions = {
    title: "ストックした記事",
    headerTintColor: "white",
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#00aced" }
  };

  constructor(props) {
    super(props);
    this.state = { threads: [] };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    AsyncStorage.getAllKeys((err, keys) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        AsyncStorage.multiGet(keys, (err, data) => {
          threads = data.map(i => {
            return JSON.parse(i[1]);
          });
          this.setState({ threads });
          return true;
        });
      }
    });
  }

  render() {
    const { threads } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
        <FlatList
          data={threads}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5"
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: item.thumbnail }}
                />
                <View style={{ width: width - 50 }}>
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={{ color: "#000" }}>{item.title}</Text>
                    <Text style={{ color: "#ababab", fontSize: 10 }}>
                      {item.domain}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
