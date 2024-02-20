import { Modal, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import CustomButton from "./CustomButton";
import { COLORS, LINE_HEIGHT } from "../../constants/globalConstants";

export default function CustomModal({
  show,
  closeButtonText,
  submitButtonText,
  onClose,
  onSubmit = null,
  children,
}) {
  const { t } = useTranslation();

  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <View style={styles.modalOuterContainer}>
        <View style={styles.modalInnerContainer}>
          {children}

          <View style={styles.buttonContainer}>
            <CustomButton onPress={onClose} cancel fullWidth={false}>
              {closeButtonText
                ? closeButtonText
                : t("CustomModal.button.close")}
            </CustomButton>

            {onSubmit && (
              <CustomButton onPress={onSubmit} success fullWidth={false}>
                {submitButtonText
                  ? submitButtonText
                  : t("CustomModal.button.submit")}
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
