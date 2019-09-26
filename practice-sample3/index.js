import { registerRootComponent } from "expo";
import { activateKeepAwake } from "expo-keep-awake";

// import App from "./src/App";
// import ListApp from "./src/ListApp";
import QiitaReader from "./src/QiitaReader";

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(QiitaReader);
