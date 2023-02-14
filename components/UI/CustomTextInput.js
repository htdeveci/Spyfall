import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { COLORS } from "../../constants/globalConstants";

export default function CustomTextInput({
  keyboardType = "default",
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

  const blurHandler = () => {
    setInputValue((state) => state.trim());
  };

  return (
    <TextInput
      keyboardType={keyboardType}
      style={[styles.textInput, style]}
      placeholder={placeholder}
      value={inputValue}
      selectionColor={COLORS.secondary}
      cursorColor={COLORS.primary}
      onChangeText={textChangeHandler}
      autoCapitalize="words"
      onBlur={blurHandler}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: COLORS.textReverse,
    alignSelf: "stretch",
  },
});
