import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  SectionList,
  View
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: []
    };
  }

  componentDidMount() {
    this.fetchThreads();
  }

  _fetchThread(item) {
    return new Promise((resolve, reject) => {
      fetch(item.uri)
        .then(response => response.json())
        .then(responseJson => {
          let threads = responseJson.data.children.slice(0, 5);
          threads = threads.map(i => {
            i.key = i.data.url;
            return i;
          });
          return resolve({ data: threads, title: item.title });
        })
        .catch(error => {
          return reject(error);
        });
    });
  }

  fetchThreads() {
    let list = [
      {
        uri: "https://www.reddit.com/r/newsokur/hot.json",
        title: "人気"
      },
      {
        uri: "https://www.reddit.com/r/newsokur/controversial.json",
        title: "議論中"
      }
    ];

    Promise.all(list.map(i => this._fetchThread(i)))
      .then(r => {
        this.setState({ threads: r });
      })
      .catch(e => {
        console.warn(e);
      });
  }

  render() {
    const { threads } = this.state;
    const { width, height, scale } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={thread => {
            return (
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={{ uri: thread.item.data.thumbnail }}
                />
                <Text style={{ width: width - 50 }} key={thread.key}>
                  {thread.item.data.title}
                </Text>
              </View>
            );
          }}
          renderSectionHeader={({ section }) => {
            return <Text>{section.title}</Text>;
          }}
          sections={threads}
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
    backgroundColor: "#F5FCFF",
    paddingTop: 60
  },
  item: {
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  image: {
    width: 50,
    height: 50
  }
});
