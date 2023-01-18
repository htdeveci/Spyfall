import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import COLORS from "../../constants/colors";

export default function CustomTextInput({
  style,
  placeholder,
  value,
  onChangeText,
}) {
  const [inputValue, setInputValue] = useState(value);

  const textChangeHandler = (changedText) => {
    setInputValue(changedText);
    onChangeText(changedText);
  };

  return (
    <TextInput
      style={[styles.textInput, style]}
      placeholder={placeholder}
      value={inputValue}
      selectionColor={COLORS.secondary}
      cursorColor={COLORS.primary}
      onChangeText={textChangeHandler}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: COLORS.textReverse,
    alignSelf: "stretch",
    // backgroundColor: "red",
  },
});
