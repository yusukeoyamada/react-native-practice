import React, { Component } from "react";
import { AsyncStorage, FlatList, View, Text } from "react-native";
import { Icon, List, ListItem } from "react-native-elements";
import axios from "axios";
import moment from "moment";

const API_ENDPOINT = "https://qiita.com/api/v2/items";

class TagPageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "タグ: " + navigation.state.params.tag + "の新着記事"
    };
  };

  componentDidMount() {
    this.fetchArticles(1, this.props.navigation.getParam("tag"));
  }

  async fetchArticles(page, tag) {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}?page=${page}&per_page=20&query=tag:${tag}`
      );
      if (typeof response.data === "object" && response.data.length >= 0) {
        this.setState({ articles: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { articles } = this.state;
    return (
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return (
            <ListItem
              onPress={() => {
                this.props.navigation.navigate("WebViewPage", {
                  url: item.url,
                  title: item.title
                });
              }}
              key={item.id}
              title={item.title}
              leftAvatar={{
                source: { uri: item.user.profile_image_url },
                rounded: true
              }}
              subtitle={
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 5,
                    paddingTop: 5
                  }}
                >
                  <Text
                    style={{
                      color: "#ababab",
                      fontSize: 12,
                      paddingRight: 6,
                      paddingLeft: 6
                    }}
                  >
                    {`by ${item.user.id}`}
                  </Text>
                  <Icon name="favorite" color={"#ababab"} size={10} />
                  <Text
                    style={{
                      color: "#ababab",
                      fontSize: 12,
                      paddingRight: 6,
                      paddingLeft: 6
                    }}
                  >
                    {item.likes_count}
                  </Text>
                  <Icon name="comment" color={"#ababab"} size={10} />
                  <Text
                    style={{
                      color: "#ababab",
                      fontSize: 12,
                      paddingRight: 6,
                      paddingLeft: 6
                    }}
                  >
                    {item.comments_count}
                  </Text>
                  <Text
                    style={{
                      color: "#ababab",
                      fontSize: 12,
                      paddingRight: 6,
                      paddingLeft: 6
                    }}
                  >
                    {moment(item.created_at).format("YYYY/MM/DD")}
                  </Text>
                </View>
              }
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default TagPageList;
