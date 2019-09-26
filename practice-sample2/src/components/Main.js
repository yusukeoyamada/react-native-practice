import React, { Component } from "react";
import {
  Text,
  Button,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
  AsyncStorage
} from "react-native";

import { Spining } from "./Spining";

export class Main extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "新着記事",
    headerTintColor: "white",
    headerBackTitleStyle: { color: "white" },
    headerStyle: { backgroundColor: "#00aced" },
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 8 }}
        onPress={() => {
          navigation.navigate("Archive");
        }}
      >
        <Image
          source={require("../assets/cat.png")}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      threads: [],
      opacity: new Animated.Value(0),
      fontSize: new Animated.Value(0)
    };
  }

  componentWillMount() {
    fetch("https://www.reddit.com/r/newsokur/hot.json")
      .then(response => response.json())
      .then(responseJson => {
        let threads = responseJson.data.children;
        threads = threads.map(i => {
          i.key = i.data.url;
          return i;
        });
        this.setState({
          threads: threads,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  animate() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start();
    Animated.spring(this.state.fontSize, { toValue: 1, friction: 1 }).start();
  }

  save({ data }) {
    AsyncStorage.setItem(data["title"], JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return false;
      } else {
        return true;
      }
    });
  }

  render() {
    const { threads, isLoading, opacity, fontSize } = this.state;
    const { width } = Dimensions.get("window");
    const _fontSize = fontSize.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 12]
    });

    if (!isLoading) this.animate();

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Spining />
        ) : (
          <Animated.View style={{ opacity: opacity }}>
            <FlatList
              data={threads}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{ flex: 1, flexDirection: "row", width: "100%" }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.data.thumbnail }}
                    />
                    <View style={{ width: width - 50 }}>
                      <View style={{ flex: 1, flexDirection: "column" }}>
                        <Animated.Text style={{ fontSize: _fontSize }}>
                          {item.data.title}
                        </Animated.Text>
                        <Text style={{ color: "#ababab", fontSize: 10 }}>
                          {item.data.domain}
                        </Text>
                        <Button
                          onPress={() => {
                            this.save(item);
                          }}
                          title={"ストック"}
                        />
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}
