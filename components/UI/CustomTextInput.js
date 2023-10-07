import { useEffect } from "react";
import { useState } from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";

import { COLORS } from "../../constants/globalConstants";

export default function CustomTextInput({
  keyboardType = "default",
  style,
  placeholder,
  value,
  onChangeText,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        blurHandler();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const textChangeHandler = (changedText) => {
    setInputValue(changedText);
  };

  const blurHandler = () => {
    setInputValue((state) => {
      const trimmedInput = state.trim();
      onChangeText(trimmedInput);
      return trimmedInput;
    });
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
