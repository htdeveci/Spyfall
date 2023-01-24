import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import Locations from "./pages/Locations";
import { initLocations } from "./store/locationsSlice";
import locationsDefaults from "./locations-defaults.json";

export default function Deneme({ navigation }) {
  const dispatch = useDispatch();

  const [locations, setLocations] = useState(null);

  const getLocations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("activeLocations");
      return jsonValue === null ? locationsDefaults : JSON.parse(jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const storedLocations = await getLocations();
      dispatch(initLocations({ storedLocations }));
      setLocations(storedLocations);
    };
    fetchLocations();
  }, []);

  return (
    <>
      {locations && (
        <Locations navigation={navigation} storedLocations={locations} />
      )}
    </>
  );
}
