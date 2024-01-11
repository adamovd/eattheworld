import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Country } from "@prisma/client";
import { MapContainer } from "../Styles/Components/Containers";
import { useRouter } from "next/navigation";

const UserMap = ({ countries }: { countries: Country[] }) => {
  const [lng, setLng] = useState(8);
  const [lat, setLat] = useState(10);
  const [zoom, setZoom] = useState(1.2);
  const router = useRouter();
  useEffect(() => {
    console.log(countries);

    if (countries.length > 0) {
      setLng(countries[0].lng);
      setLat(countries[0].lat);
    } else {
      return;
    }
  });

  return (
    <MapContainer>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom,
        }}
        mapboxAccessToken="pk.eyJ1IjoiYWRtb3ZkIiwiYSI6ImNscXc1ZHdqazNzdDEyanA5NHAybnp2cGEifQ.2PO4qpYX1CYEYqUawGcioQ"
        mapStyle="mapbox://styles/admovd/clqw54chs011b01nw7xdu4w53"
        style={{
          width: "92vw",
          overflow: "hidden",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
        }}
      >
        {countries &&
          countries.map((country) => (
            <Marker
              key={country.id}
              latitude={country.lat}
              longitude={country.lng}
              onClick={() => router.push(`/country/${country.id}`)}
            ></Marker>
          ))}
        Visited countries
      </Map>
    </MapContainer>
  );
};

export default UserMap;
