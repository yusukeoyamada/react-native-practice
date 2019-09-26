import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Main } from "./components/Main";
import { Archive } from "./components/Archive";

const AppNavigation = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main
    },
    Archive: {
      screen: Archive
    }
  })
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
      </View>
    );
  }
}
