import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Locations from "./pages/Locations";
import { initLocations } from "./store/locationsSlice";

export default function Deneme() {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState(null);
  const storedLocations = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(initLocations());
    setLocations(storedLocations);
  }, [storedLocations]);
  return (
    <>
      {/* {locations && <Locations locationsProp={locations} />} */}
      {locations && (
        <Text style={{ color: "white" }}>{locations[0].enabled}</Text>
      )}
    </>
  );
}
