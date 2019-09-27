import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import TagNavigation from "./components/TagNavigation";
import KeywordNavigation from "./components/KeywordNavigation";

const RootNavigator = createBottomTabNavigator({
  TagNavigation: {
    screen: TagNavigation,
    navigationOptions: {
      title: "Tag",
      tabBarLabel: "タグ",
      tabBarIcon: ({ tintColor, focused }) => <Icon name={"label"} />
    }
  },
  KeywordNavigation: {
    screen: KeywordNavigation,
    navigationOptions: {
      title: "Keyword",
      tabBarLabel: "キーワード",
      tabBarIcon: ({ tintColor, focused }) => <Icon name={"room"} />
    }
  }
});

const QiitaReader = createAppContainer(RootNavigator);
export default QiitaReader;
