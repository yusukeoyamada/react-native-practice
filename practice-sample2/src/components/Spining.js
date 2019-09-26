import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";

export class Spining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.animated();
  }

  componentWillUnmount() {
    this.animated = () => {
      return false;
    };
  }

  animated() {
    Animated.timing(this.state.degree, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => {
      this.setState({ degree: new Animated.Value(0) });
      this.animated();
    });
  }

  render() {
    const { degree } = this.state;
    const _degree = degree.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <View>
        <Animated.Image
          source={require("../assets/cat.png")}
          style={{ transform: [{ rotate: _degree }] }}
        />
      </View>
    );
  }
}
