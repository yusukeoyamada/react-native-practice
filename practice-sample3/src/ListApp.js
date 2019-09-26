import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList
} from "react-native";
import axios from "axios";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Card, ListItem, Button } from "react-native-elements";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://qiita.com/api/v2/items?page=1&per_page=5&query=react+native"
    );
    if (typeof response.data === "object" && response.data.length > 0) {
      this.setState({
        articles: response.data
      });
    }
  }

  render() {
    const { articles } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item }) => {
            return (
              <Card key={item.title} title={item.title}>
                <Image
                  style={{
                    width: 16,
                    height: 16
                  }}
                  resizeMethod="cover"
                  source={{
                    uri: "https://github.com/fluidicon.png"
                  }}
                />
                <Text>List</Text>
              </Card>
            );
          }}
          keyExtractor={(item, index) => index + item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default createAppContainer(
  createStackNavigator({
    Home: {
      screen: Home
    }
  })
);
