import React, { Component } from "react";
import { AsyncStorage, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Icon
          color="#fff"
          name="add"
          iconStyle={{ marginRight: 16 }}
          onPress={() => {
            navigation.navigate("TagSubscriber");
          }}
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () =>
      this.componentDidFocus()
    );
    this.loadTags();
  }

  componentDidFocus() {
    this.loadTags();
  }

  async loadTags() {
    try {
      const Tags = await AsyncStorage.getItem("Tags");
      let tags = JSON.parse(Tags);
      if (tags === null) {
        return false;
      }

      if (typeof tags === "object" && tags.length > 0) {
        this.setState({ tags });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async removeTag(tag) {
    try {
      const Tags = await AsyncStorage.getItem("Tags");
      let tags = JSON.parse(Tags);
      if (tags == null) {
        return false;
      }

      if (typeof tags != "object" && tags.length < 0) {
        return false;
      }

      for (let i = 0; i < tags.length; i++) {
        if (tags[i].id === tag) {
          tags = [].concat(tags.slice(0, i), tags.slice(i + 1, tags.length));
          this.setState({ tags });
          await AsyncStorage.setItem("Tags", JSON.stringify(tags));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { tags } = this.state;
    return (
      <FlatList
        data={tags}
        renderItem={({ item }) => {
          return (
            <ListItem
              onPress={() => {
                this.props.navigation.navigate("TagPageList", { tag: item.id });
              }}
              rightIcon={
                <Icon name="clear" onPress={() => this.removeTag(item.id)} />
              }
              key={item.id}
              title={item.id}
              leftAvatar={{
                source: { uri: item.icon_url },
                rounded: true
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default TagList;
