import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import "../styles/pages/kitnetMap.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerImg from "../images/mapMarker.svg";
import mapIcon from "../utils/mapIcon";
import iconIESB from "../utils/iconIESB";

import api from "../services/api";

interface Kitnet{
  id: number;
  latitude: number;
  longitude: number;
  metragem: number;
  aluguel: number;
}

export default function KitnetMap() {
  const [kitnets, setKitnets] = useState<Kitnet[]>([]);

  // console.log(kitnets);

  useEffect(() => {
    api.get('kitnets').then(response => {
      // console.log(response.data);
      setKitnets(response.data);
    })
  }, []); // executa a função quando um dos valores do [] mudar

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Logo" />
          <h2>Escolha uma Kit net no mapa</h2>
        </header>

        <footer>Brasília-DF</footer>
      </aside>
      <div id="div2">
        <MapContainer
          center={[-15.8237789,-47.9023266]}
          zoom={15}
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            // para mais estilos acessar: https://docs.mapbox.com/mapbox-gl-js/api/map/
          />

          {
            kitnets.map(kitnet=> {
              return (
                <Marker icon={mapIcon} position={[kitnet.latitude, kitnet.longitude]}
                key={kitnet.id}>
                <Popup closeButton={false} minWidth={220} maxWidth={220} className="map-popup">
                  {kitnet.metragem} m² - R$ {kitnet.aluguel}/mês
                  <Link to={`/kitnet/${kitnet.id}`}>
                  <FiArrowRight size='21' color="#9D445E"/>
                  </Link>
                </Popup>
              </Marker>
              )
            })
          }

<Marker
                  interactive={false}
                  icon={iconIESB}
                  position={[-15.8348569,-47.9134612]}
                />
        </MapContainer>

        <Link to="/kitnet/create" id="botaoCriar" ></Link>
      </div>
    </div>
  );
}
