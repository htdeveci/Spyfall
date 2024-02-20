import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

import CustomModal from "./CustomModal";
import { COLORS } from "../../constants/globalConstants";

export default function CustomDialog({ show, onClose, onSubmit, children }) {
  const { t } = useTranslation();

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      closeButtonText={t("CustomDialog.button.close")}
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
