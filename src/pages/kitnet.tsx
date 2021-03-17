import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { useParams } from "react-router-dom";
import "../styles/pages/kitnet.css";
// import "../styles/pages/createKitnet.css";

// importar das imagens
import imgAluguel from "../images/quadros/imgAluguel.svg";
import imgCondominio from "../images/quadros/imgCondominio.svg";
import imgElevador from "../images/quadros/imgElevador.svg";
import imgEndereco from "../images/quadros/imgEndereco.svg";
import imgIPTU from "../images/quadros/imgIPTU.svg";
import imgMetragem from "../images/quadros/imgMetragem.svg";
import imgMobiliado from "../images/quadros/imgMobiliado.svg";
import imgPet from "../images/quadros/imgPet.svg";
import imgPortaria from "../images/quadros/imgPortaria.svg";
import imgVaga from "../images/quadros/imgVaga.svg";
import imgWifi from "../images/quadros/imgWifi.svg";
import relogio from "../images/relogio.svg";
import olho from "../images/olho.svg";
import imgZapp from "../images/quadros/imgZapp.svg";

// importar de componentes
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import iconIESB from "../utils/iconIESB";
import api from "../services/api";

interface KitnetInterface {
  id: number;
  latitude: number;
  longitude: number;
  metragem: number;
  aluguel: number;
  endereco: string;
  condominio: number;
  iptu: number;
  portaria: boolean;
  elevador: boolean;
  mobiliado: boolean;
  pet: boolean;
  vaga: boolean;
  descricao: boolean;
  whatsapp: boolean;
  wifi: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface KitnetParams {
  id: string;
}

export default function Kitnet() {
  const params = useParams<KitnetParams>();
  const [kitnet, setKitnet] = useState<KitnetInterface>();
  const [activeImageIndex, setActiveImageIndex] = useState(0); // armazena o index da foto ativa 
  console.log(kitnet);

  useEffect(() => {
    api.get(`/kitnets/${params.id}`).then((response) => {
      console.log(response.data);
      setKitnet(response.data);
    });
  }, [params.id]); // executa a função quando um dos valores do [] mudar

  if (!kitnet) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-create-kitnet">
      <Sidebar />
      <main>
        <form className="create-kitnet-form">
        
          <img className="imgMain" src={kitnet?.images[activeImageIndex].url} alt="Imagem" />
      
          <div className="blocoImages">
            <div className="imagesSquare">
                {kitnet.images.map((image, index) => {
                  return (
                    <button
                    key={image.id}
                    className={activeImageIndex == index ? 'active' : ''}
                    type="button"
                    onClick= {()=> {
                      setActiveImageIndex(index);
                    }}
                    >
                <img
                  src={image.url}
                  alt={kitnet.id.toString()}
                />
              </button>
                  )
                })}
            </div>
          </div>

          <fieldset>
            <div className="titulo">
              Kit net {`${kitnet.metragem}`}m² - R${`${kitnet.aluguel}`}/mês
            </div>

            <div className="descricao">{`${kitnet.descricao}`}</div>

            <div className="map-container">
              <MapContainer
                center={[kitnet.latitude, kitnet.longitude]}
                style={{ width: "100%", height: "250px" }}
                zoom={16}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  // para mais estilos acessar: https://docs.mapbox.com/mapbox-gl-js/api/map/
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[kitnet.latitude, kitnet.longitude]}
                />
                   <Marker
                  interactive={false}
                  icon={iconIESB}
                  position={[-15.8348569,-47.9134612]}
                />
              </MapContainer>
              <footer>
               
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${kitnet.latitude},${kitnet.longitude}`} >Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="detalhes1">
              <div>Detalhes da kitnet</div>
              <div className="detalhes2">
                  <img src={relogio} alt="relogio" />
                <div className="detalhes3">
                  <div>Publicado há 03 dias</div>
                </div>
                  <img src={olho} alt="olho" />
                <div className="detalhes3">
                  <div>62 visualizações</div>
                </div>
              </div>
            </div>
            <fieldset className="grupo">
              <div>
                <img src={imgEndereco} alt="imgEndereco" />
              </div>
              <div className="input-block">
                <label htmlFor="endereco">Endereço</label>
                <div className="">{`${kitnet.endereco}`}</div>
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgMetragem} alt="imgMetragem" />
              </div>
              <div className="input-block">
                <label htmlFor="metragem">Metragem</label>
                <div className="">{`${kitnet.metragem} m²`}</div>
              </div>

              <div>
                <img src={imgAluguel} alt="imgAluguel" />
              </div>
              <div className="input-block">
                <label htmlFor="aluguel">Aluguel</label>
                <div className="">{`${kitnet.metragem} R$/mês`}</div>
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgCondominio} alt="imgCondominio" />
              </div>
              <div className="input-block">
                <label htmlFor="condominio">Condomínio</label>
                <div className="">{`${kitnet.condominio} R$/mês`}</div>
              </div>

              <div>
                <img src={imgIPTU} alt="imgIPTU" />
              </div>
              <div className="input-block">
                <label htmlFor="iptu">IPTU</label>
                <div className="">{`${kitnet.metragem} R$/ano`}</div>
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgPortaria} alt="imgPortaria" />
              </div>
              <div className="input-block">
                <label htmlFor="portaria">Portaria</label>
                <label className="switch">
                  {kitnet.portaria ? (
                    <input type="checkbox" id="portaria" checked={true} />
                  ) : (
                    <input type="checkbox" id="portaria" checked={false} />
                  )}
                  
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgElevador} alt="imgElevador" />
              </div>
              <div className="input-block">
                <label htmlFor="elevador">Elevador</label>
                <label className="switch">
                  <input type="checkbox" id="elevador" checked={false} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgMobiliado} alt="imgMobiliado" />
              </div>
              <div className="input-block">
                <label htmlFor="mobiliado">Mobilhado</label>
                <label className="switch">
                  <input type="checkbox" id="mobiliado" />
                  <span className="slider round"></span>
                </label>
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgPet} alt="imgPet" />
              </div>
              <div className="input-block">
                <label htmlFor="pet">Aceita Pet</label>
                <label className="switch">
                  <input type="checkbox" id="pet" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgVaga} alt="imgVaga" />
              </div>
              <div className="input-block">
                <label htmlFor="vaga">Vaga</label>
                <label className="switch">
                  <input type="checkbox" id="vaga" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgWifi} alt="imgWifi" />
              </div>
              <div className="input-block">
                <label htmlFor="wifi">Wi-fi</label>
                <label className="switch">
                  <input type="checkbox" id="wifi" />
                  <span className="slider round"></span>
                </label>
              </div>
            </fieldset>
          </fieldset>

          <div className="conf">
            <button className="primary-button" type="submit">
              Entrar em contato
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
