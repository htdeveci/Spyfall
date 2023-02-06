import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, GAP_BETWEEN_LAYERS } from "../../constants/globalConstants";
import Seperator from "./Seperator";

export default function CustomFlatList({
  data,
  listLabel,
  renderItem,
  FooterComponent,
  numColumns = 1,
}) {
  return (
    <>
      <Text style={styles.listLabel}>{listLabel}</Text>
      <FlatList
        key={numColumns}
        data={data}
        renderItem={renderItem}
        ListFooterComponent={FooterComponent}
        style={{ marginVertical: 20 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 && { justifyContent: "center" }}
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
