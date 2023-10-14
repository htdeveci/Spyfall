import { StyleSheet, Text } from "react-native";
import CustomModal from "./CustomModal";
import { COLORS } from "../../constants/globalConstants";

export default function CustomDialog({ show, onClose, onSubmit, children }) {
  return (
    <CustomModal
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      closeButtonText="Hayır"
    >
      <Text style={styles.messageText}>{children}</Text>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 18,
    color: COLORS.textReverse,
    textAlign: "center",
  },
});
