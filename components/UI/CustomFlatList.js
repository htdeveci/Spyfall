import { FlatList, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/globalConstants";

export default function CustomFlatList({
  data,
  listLabel,
  renderItem,
  FooterComponent,
}) {
  return (
    <>
      <Text style={styles.listLabel}>{listLabel}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={FooterComponent}
        style={{ marginVertical: 20 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
