import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
import { Icon, Button, Input } from "react-native-elements";

class KeywordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.onChangeInputText = this.onChangeInputText.bind(this);
    this.registerKeyword = this.registerKeyword.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon
          color="#f50"
          name="keyboard-arrow-left"
          iconStyle={{ marginRight: 16 }}
          onPress={() => {
            navigation.navigate("KeywordList");
          }}
        />
      )
    };
  };

  async registerKeyword() {
    try {
      const keyword = this.state.input;
      const Keywords = await AsyncStorage.getItem("Keywords");
      let keywords = JSON.parse(Keywords);

      if (keywords === null) {
        keywords = [];
      }

      if (typeof keywords != "object" && keywords.length < 0) {
        return false;
      }

      if (!keyword) {
        return false;
      }

      for (let i in keywords) {
        if (keywords[i] === keyword) {
          return false;
        }
      }

      keywords = keywords.concat(keyword);
      await AsyncStorage.setItem("Keywords", JSON.stringify(keywords));
      this.refs["form-input"].clear();
    } catch (error) {
      console.error(error);
    }
  }

  onChangeInputText(input) {
    this.setState({
      input,
      errorMessage: ""
    });
  }

  render() {
    return (
      <View style={{ paddingTop: 10 }}>
        <Input
          ref="form-input"
          label="新しく登録するキーワード"
          onChangeText={input => this.onChangeInputText(input)}
        />
        <Button onPress={this.registerKeyword} title="登録" />
      </View>
    );
  }
}

export default KeywordForm;
