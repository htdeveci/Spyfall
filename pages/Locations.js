import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import locationsDefaults from "../locations-defaults.json";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locationsDefaults);
  }, []);

  return (
    <View style={styles.container}>
      {locations.map((location) => {
        return <Location key={uuidv1()} location={location} />;
      })}

      <View style={styles.buttonContainer}>
        <CustomButton cancel style={{ marginRight: 5 }}>
          İptal
        </CustomButton>
        <CustomButton style={{ marginLeft: 5 }}>Kaydet</CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 50,
  },
});
