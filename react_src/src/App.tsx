import { YMaps, Map, Placemark, Circle } from "@pbe/react-yandex-maps";
import { useMainStore } from "./store";
import { useEffect } from "react";
import CoordinatesForm from "./CoordinatesForm";

export default function App() {
  const store = useMainStore();

  const defaultMapState = {
    center: [60, 24],
    zoom: 5,
  };

  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  const getTrilateratedCoordinates = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store.formData),
    };
    const data = await (
      await fetch(
        "http://localhost:8080/wp-json/myplugin/v1/trilateration",
        requestOptions
      )
    ).json();

    if (data) {
      store.setTrilaterationResult(data);
    }
  };

  useEffect(() => {
    getTrilateratedCoordinates();
  }, [store.formData]);

  return (
    <>
      <YMaps query={{ lang: "en_US" }}>
        <Map defaultState={defaultMapState} style={mapStyle}>
          <Circle
            geometry={[
              [store.formData.PointA.latitude, store.formData.PointA.longitude],
              store.formData.PointA.distance,
            ]}
            properties={{ hintContent: "PointA" }}
            options={{ fillColor: "ff000055" }}
          />
          <Circle
            geometry={[
              [store.formData.PointB.latitude, store.formData.PointB.longitude],
              store.formData.PointB.distance,
            ]}
            properties={{ hintContent: "PointB" }}
            options={{ fillColor: "00ff0055" }}
          />
          <Circle
            geometry={[
              [store.formData.PointC.latitude, store.formData.PointC.longitude],
              store.formData.PointC.distance,
            ]}
            properties={{ hintContent: "PointC" }}
            options={{ fillColor: "0000ff55" }}
          />
          <Placemark
            geometry={[
              store.trilaterationResult.latitude,
              store.trilaterationResult.longitude,
            ]}
          />
        </Map>
        <CoordinatesForm />
        <>
          <p>Result: </p>
          <p>
            Latitude -{" "}
            {store.trilaterationResult.latitude.toFixed(6) || "Error"}
          </p>
          <p>
            Longitude -{" "}
            {store.trilaterationResult.longitude.toFixed(6) || "Error"}
          </p>
        </>
      </YMaps>
    </>
  );
}
