import React, { Component } from "react";
import { AsyncStorage, FlatList, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

class KeywordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Icon
          color="#f50"
          name="add"
          iconStyle={{ marginRight: 16 }}
          onPress={() => {
            navigation.navigate("KeywordForm");
          }}
        />
      )
    };
  };

  componentDidMount() {
    this.loadKeywords();
  }

  async loadKeywords() {
    try {
      const Keywords = await AsyncStorage.getItem("Keywords");
      let keywords = JSON.parse(Keywords);
      if (keywords != null) {
        this.setState({ keywords });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async removeKeyword(keyword) {
    try {
      const Keywords = await AsyncStorage.getItem("Keywords");
      let keywords = JSON.parse(Keywords);
      if (keywords == null) {
        return false;
      }

      if (typeof keywords != "object" && keywords.length < 0) {
        return false;
      }

      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] === keyword) {
          keywords = [].concat(
            keywords.slice(0, i),
            keywords.slice(i + 1, keywords.length)
          );
          this.setState({ keywords });
          await AsyncStorage.setItem("Keywords", JSON.stringify(keywords));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { keywords } = this.state;
    return (
      <FlatList
        data={keywords}
        renderItem={({ item }) => {
          return (
            <ListItem
              onPress={() => {
                this.props.navigation.navigate("KeywordPageList", {
                  keyword: item
                });
              }}
              rightIcon={
                <Icon name="clear" onPress={() => this.removeKeyword(item)} />
              }
              key={item}
              title={item}
            />
          );
        }}
        keyExtractor={item => item}
      />
    );
  }
}

export default KeywordList;
