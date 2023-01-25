import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS, LINE_HEIGHT } from "../../constants/globalConstants";

import CustomButton from "./CustomButton";

export default function CustomModal({ show, onClose, children }) {
  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View style={styles.modalOuterContainer}>
        <View style={styles.modalInnerContainer}>
          {children}
          <View
            style={{
              height: LINE_HEIGHT * 0.8,
            }}
          >
            <CustomButton onPress={onClose} cancel>
              Kapat
            </CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.modalBackgroud,
  },
  modalInnerContainer: {
    width: "70%",
    height: "25%",
    borderColor: COLORS.border,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
