import { useRef } from "react";
import { FlatList } from "react-native";
import { v1 as uuidv1 } from "uuid";

import { GAP_BETWEEN_LAYERS } from "../../constants/globalConstants";
import CustomPageTitle from "./CustomPageTitle";

let listRef;

export const goToBottom = () => {
  if (listRef && listRef.current) listRef.current.scrollToEnd();
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
      <CustomPageTitle title={listLabel} />

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
      />
    </>
  );
}
