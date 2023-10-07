import { useRef } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { COLORS, GAP_BETWEEN_LAYERS } from "../../constants/globalConstants";

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
}) {
  listRef = useRef();

  return (
    <>
      <Text style={styles.listLabel}>{listLabel}</Text>

      <FlatList
        ref={listRef}
        key={numColumns}
        keyExtractor={(item, index) => {
          return uuidv1();
        }}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={FooterComponent}
        style={{ marginVertical: GAP_BETWEEN_LAYERS }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && { justifyContent: "center" }}
        // keyboardDismissMode="on-drag"
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
