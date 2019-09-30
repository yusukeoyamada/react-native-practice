import React, { Component } from "react";
import { View, Share } from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { WebView } from "react-native-webview";

class WebViewPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerRight: (
        <View
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          <Icon
            name="save"
            type="font-awesome"
            color="#fff"
            iconStyle={{ marginRight: 12 }}
            onPress={async () => {
              const response = await axios.get(
                navigation.state.params.url + ".md"
              );
              const text = await response.data;
              Share.share({
                title: navigation.state.params.title,
                message: text
              });
            }}
          />
          <Icon
            name="get-app"
            color="#fff"
            iconStyle={{ marginRight: 12 }}
            onPress={() => {
              Share.share({
                title: navigation.state.params.title,
                message: navigation.state.params.url,
                url: navigation.state.params.url
              });
            }}
          />
        </View>
      )
    };
  };

  render() {
    const { url } = this.props.navigation.state.params;
    return <WebView source={{ uri: url }} />;
  }
}

export default WebViewPage;
