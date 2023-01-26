import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { COLORS } from "./constants/globalConstants";
import store from "./store/store";
import Deneme from "./Deneme";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      <Deneme />
    </Provider>
  );
}
