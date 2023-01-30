import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { COLORS } from "../../constants/globalConstants";

export default function CustomDropdown({
  data,
  onSelect,
  defaultValue = null,
  customizedButtonChild = null,
}) {
  return (
    <SelectDropdown
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
            <AntDesign name="caretup" size={24} color={COLORS.secondary} />
          );
        else
          return (
            <AntDesign name="caretdown" size={24} color={COLORS.secondary} />
          );
      }}
      renderCustomizedButtonChild={customizedButtonChild}
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
}
