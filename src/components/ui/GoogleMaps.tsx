"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const GoogleMaps = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const locationInMap = {
        lat: 10.753271627821393,
        lng: 106.69544453918549,
      };

      //Marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 15,
        mapId: "NEXT_MAPS_TUTS",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);

      //add the marker in the map
      const marker = new Marker({
        map: map,
        position: locationInMap,
      });
    };

    initializeMap();
  }, []);

  return <div className="h-[600px] w-full" ref={mapRef} />;
};
