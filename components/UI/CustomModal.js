import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS, LINE_HEIGHT } from "../../constants/globalConstants";

import CustomButton from "./CustomButton";

export default function CustomModal({
  show,
  closeButtonText = "Kapat",
  submitButtonText = "Evet",
  onClose,
  onSubmit = null,
  children,
}) {
  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View style={styles.modalOuterContainer}>
        <View style={styles.modalInnerContainer}>
          {children}

          <View style={styles.buttonContainer}>
            <CustomButton onPress={onClose} cancel fullWidth={false}>
              {closeButtonText}
            </CustomButton>

            {onSubmit && (
              <CustomButton onPress={onSubmit} success fullWidth={false}>
                {submitButtonText}
              </CustomButton>
            )}
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    height: LINE_HEIGHT * 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
});
