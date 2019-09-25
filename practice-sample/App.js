import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      threads: []
    };
  }

  componentDidMount() {
    fetch("https://www.reddit.com/r/newsokur/hot.json")
      .then(response => response.json())
      .then(responseJson => {
        let threads = responseJson.data.children;
        threads = threads.map(i => {
          i.key = i.data.url;
          return i;
        });
        this.setState({ threads: threads, isLoading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { threads, isLoading } = this.state;
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={threads}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlist}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.data.thumbnail
                    }}
                  />
                  <View style={{ width: width - 50 }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Text>{item.data.title}</Text>
                      <Text style={{ color: "#000080", fontSize: 10 }}>
                        {item.data.domain}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 46
  },
  flatlist: {
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  image: {
    width: 50,
    height: 50
  }
});
