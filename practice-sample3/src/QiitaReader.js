import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import TagNavigation from "./components/TagNavigation";

const RootNavigator = createBottomTabNavigator({
  TagNavigation: {
    screen: TagNavigation,
    navigationOptions: {
      title: "Tag",
      tabBarLabel: "タグ",
      tabBarIcon: ({ tintColor, focused }) => {
        return <Icon name="label" />;
      }
    }
  }
});

const QiitaReader = createAppContainer(RootNavigator);
export default QiitaReader;
