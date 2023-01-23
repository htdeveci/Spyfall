import { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import Locations from "./pages/Locations";
import { initLocations } from "./store/locationsSlice";
import locationsDefaults from "./locations-defaults.json";

export default function Deneme({ navigation }) {
  const dispatch = useDispatch();

  const [locations, setLocations] = useState(null);

  const getLocations = async () => {
    try {
      console.log(" 1   " + (await AsyncStorage.getAllKeys()));
      const jsonValue = await AsyncStorage.getItem("activeLocations");
      console.log(" 2   " + jsonValue);
      const value =
        jsonValue === null ? locationsDefaults : JSON.parse(jsonValue);
      console.log(" 3   " + value);
      return value;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const storedLocations = await getLocations();

      console.log(" 4   " + storedLocations[0].enabled);
      dispatch(initLocations({ storedLocations }));
      setLocations(storedLocations);
    };
    fetchLocations();
  }, []);

  // let storedLocations = useSelector((store) => store.locations);

  // useEffect(() => {
  //   setLocations(storedLocations);
  // }, [storedLocations]);

  return (
    <>
      {/* {locations && <Locations locationsProp={locations} />} */}
      {/*   {locations && (
        <Text style={{ color: "white" }}>{locations[0].enabled}</Text>
      )} */}
      <Text style={{ color: "white" }}>Deneme</Text>
      <Text style={{ color: "white" }}>Deneme2</Text>
      {locations && (
        <Locations navigation={navigation} storedLocations={locations} />
      )}
    </>
  );
}
