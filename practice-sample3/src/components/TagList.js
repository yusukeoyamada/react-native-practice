import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

const tags = [];

class TagList extends Component {
  render() {
    return (
      <FlatList
        data={tags}
        renderItem={({ item }) => {
          return (
            <ListItem
              key={item.id}
              title={item.id}
              roundAvatar
              avatar={item.icon_url}
            />
          );
        }}
      />
    );
  }
}

export default TagList;
