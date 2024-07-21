import { forwardRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

import { COLORS } from "../../constants/globalConstants";

export default forwardRef(function CustomDropdown(
  {
    data,
    onSelect,
    defaultValue = null,
    customizedButtonChild = null,
    customizedRowChild = null,
  },
  ref
) {
  return (
    <SelectDropdown
      ref={ref}
      data={data}
      onSelect={onSelect}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultValue={defaultValue}
      renderDropdownIcon={(status) => {
        if (status)
          return (
            <AntDesign name="caretup" size={22} color={COLORS.secondary} />
          );
        else
          return (
            <AntDesign name="caretdown" size={22} color={COLORS.secondary} />
          );
      }}
      renderCustomizedButtonChild={customizedButtonChild}
      renderCustomizedRowChild={customizedRowChild}
      buttonStyle={{
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
      }}
      buttonTextStyle={{ color: COLORS.textReverse, fontSize: 24 }}
      dropdownStyle={{
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
      }}
      rowTextStyle={{ color: COLORS.textReverse }}
      selectedRowStyle={{ backgroundColor: COLORS.primary }}
      selectedRowTextStyle={{ color: COLORS.text }}
    />
  );
});
