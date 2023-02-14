import { useRef } from "react";
import { Button, KeyboardAvoidingView } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, GAP_BETWEEN_LAYERS } from "../../constants/globalConstants";
import Seperator from "./Seperator";

let listRef;

export const goToBottom = () => {
  listRef.current.scrollToEnd();
};

export default function CustomFlatList({
  data,
  listLabel,
  renderItem,
  FooterComponent,
  numColumns = 1,
  // initialScrollIndex,
}) {
  listRef = useRef();

  return (
    <>
      <Text style={styles.listLabel}>{listLabel}</Text>
      <FlatList
        ref={listRef}
        key={numColumns}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={FooterComponent}
        style={{ marginVertical: GAP_BETWEEN_LAYERS }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && { justifyContent: "center" }}
        keyboardDismissMode="on-drag"
        // initialScrollIndex={initialScrollIndex}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listLabel: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
  },
});
