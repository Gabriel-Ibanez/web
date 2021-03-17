import React, { ChangeEvent, FormEvent, useState } from "react";
import { MapContainer, Marker, MapConsumer, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import "../styles/pages/createKitnet.css";
import { useHistory } from "react-router-dom";

// importar das imagens
import imgAluguel from "../images/quadros/imgAluguel.svg";
import imgAutorizo from "../images/quadros/imgAutorizo.svg";
import imgCondominio from "../images/quadros/imgCondominio.svg";
import imgDescricao from "../images/quadros/imgDescricao.svg";
import imgElevador from "../images/quadros/imgElevador.svg";
import imgEndereco from "../images/quadros/imgEndereco.svg";
import imgIPTU from "../images/quadros/imgIPTU.svg";
import imgMetragem from "../images/quadros/imgMetragem.svg";
import imgMobiliado from "../images/quadros/imgMobiliado.svg";
import imgPet from "../images/quadros/imgPet.svg";
import imgPortaria from "../images/quadros/imgPortaria.svg";
import imgVaga from "../images/quadros/imgVaga.svg";
import imgWifi from "../images/quadros/imgWifi.svg";
import imgZapp from "../images/quadros/imgZapp.svg";

// importar de componentes
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import iconIESB from "../utils/iconIESB";
import api from "../services/api";

export default function CreateKitnet() {
  const history = useHistory();

  //capturando os dados do formulário utillizado estados
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [endereco, setEndereco] = useState("");
  const [metragem, setMetragem] = useState("");
  const [aluguel, setAluguel] = useState("");
  const [condominio, setCondominio] = useState("");
  const [iptu, setIptu] = useState("");
  const [descricao, setDescricao] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [portaria, setPortaria] = useState(false);
  const [elevador, setElevador] = useState(false);
  const [mobiliado, setMobiliado] = useState(false);
  const [pet, setPet] = useState(false);
  const [vaga, setVaga] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [autorizo, setAutorizo] = useState(false);
  const [mapaMarcado, setMapaMarcado] = useState(false);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setMapaMarcado(true);
    setPosition({
      latitude: lat,
      longitude: lng,
    });
    console.log(endereco);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); // TEST POINT: previne o reload padrão da página

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("endereco", endereco);
    data.append("metragem", metragem);
    data.append("aluguel", aluguel);
    data.append("condominio", String(condominio) + "0");
    data.append("iptu", String(iptu) + "0");
    data.append("descricao", descricao);
    data.append("whatsapp", whatsapp);
    data.append("portaria", String(portaria));
    data.append("elevador", String(elevador));
    data.append("mobiliado", String(mobiliado));
    data.append("pet", String(pet));
    data.append("vaga", String(vaga));
    data.append("wifi", String(wifi));
    // data.append("autorizo", String(autorizo));

    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("kitnets", data);
    alert("Cadastro realizado com sucesso!");

    history.push("/app");

    console.log({
      latitude,
      longitude,
      endereco,
      metragem,
      aluguel,
      condominio,
      iptu,
      descricao,
      whatsapp,
      portaria,
      elevador,
      mobiliado,
      pet,
      vaga,
      wifi,
      // autorizo,
      images,
    });
  }

  return (
    <div id="page-create-kitnet">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-kitnet-form">
          <fieldset>
            <legend>Cadastrar Kitnet</legend>

            <div className="map-container">
              <MapContainer
                center={[-15.83197593933444, -47.91762113571168]}
                zoom={15}
                style={{ width: "100%", height: "250px" }}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  // para mais estilos acessar: https://docs.mapbox.com/mapbox-gl-js/api/map/
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[
                      //marker do ponto selecionado
                      position.latitude,
                      position.longitude,
                    ]}
                  />
                )}

                <Marker
                  interactive={false}
                  icon={iconIESB}
                  position={[-15.8348569, -47.9134612]} // Marker do IESB
                />

                <MapConsumer>
                  {(map) => {
                    // console.log("map center:", map.getCenter());
                    map.on("click", handleMapClick); // captura o click
                    return null;
                  }}
                </MapConsumer>
              </MapContainer>
              <label className="switchHidden">
                {/* <input type="checkbox" id="autorizo" /> */}
                {mapaMarcado ? (
                  <input
                    className="switchHidden"
                    type="checkbox"
                    id="mapaMarcado"
                    checked={true}
                    required={true}
                    onChange={(event) => setMapaMarcado(false)}
                  />
                ) : (
                  <input
                    className="switchHidden"
                    type="checkbox"
                    id="mapaMarcado"
                    checked={false}
                    required={true}
                    onChange={(event) => setMapaMarcado(true)}
                  />
                )}
                {/* <span className="slider round"></span> */}
              </label>
              <footer>Clique no mapa para selecionar o local</footer>
            </div>

            <fieldset className="grupo">
              <div>
                <img src={imgEndereco} alt="imgEndereco" />
              </div>
              <div className="input-block">
                <label htmlFor="endereco">
                  Endereço<div className="obs">(Máximo de 200 caracteres)</div>
                </label>
                <textarea
                  className="textarea"
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
                  id="endereco"
                  maxLength={200}
                  required={true}
                />
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgMetragem} alt="imgMetragem" />
              </div>
              <div className="input-block">
                <label htmlFor="metragem">
                  Metragem<div className="obs">(m²)</div>
                </label>

                <input
                  id="metragem"
                  value={metragem}
                  onChange={(event) => setMetragem(event.target.value)}
                  type="number"
                  required={true}
                  min={5}
                />
              </div>

              <div>
                <img src={imgAluguel} alt="imgAluguel" />
              </div>
              <div className="input-block">
                <label htmlFor="aluguel">
                  Aluguel<div className="obs">(R$/mês)</div>
                </label>
                <input
                  id="aluguel"
                  value={aluguel}
                  onChange={(event) => setAluguel(event.target.value)}
                  type="number"
                  min="0"
                  required={true}
                />
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgCondominio} alt="imgCondominio" />
              </div>
              <div className="input-block">
                <label htmlFor="condominio">
                  Condomínio<div className="obs">(R$/mês)</div>
                </label>
                <input
                  id="condominio"
                  value={condominio}
                  onChange={(event) => setCondominio(event.target.value)}
                  type="number"
                  min="0"
                />
              </div>

              <div>
                <img src={imgIPTU} alt="imgIPTU" />
              </div>
              <div className="input-block">
                <label htmlFor="iptu">
                  IPTU <div className="obs">(R$/ano)</div>
                </label>
                <input
                  id="iptu"
                  value={iptu}
                  onChange={(event) => setIptu(event.target.value)}
                  type="number"
                  min="0"
                />
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgPortaria} alt="imgPortaria" />
              </div>
              <div className="input-block">
                <label htmlFor="portaria">Portaria</label>
                <label className="switch">
                  {portaria ? (
                    <input
                      type="checkbox"
                      id="portaria"
                      checked={true}
                      onChange={(event) => setPortaria(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="portaria"
                      checked={false}
                      onChange={(event) => setPortaria(true)}
                    />
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
                  {elevador ? (
                    <input
                      type="checkbox"
                      id="elevador"
                      checked={true}
                      onChange={(event) => setElevador(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="elevador"
                      checked={false}
                      onChange={(event) => setElevador(true)}
                    />
                  )}
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgMobiliado} alt="imgMobiliado" />
              </div>
              <div className="input-block">
                <label htmlFor="mobiliado">Mobilhado</label>
                <label className="switch">
                  {mobiliado ? (
                    <input
                      type="checkbox"
                      id="mobiliado"
                      checked={true}
                      onChange={(event) => setMobiliado(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="mobiliado"
                      checked={false}
                      onChange={(event) => setMobiliado(true)}
                    />
                  )}
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
                  {pet ? (
                    <input
                      type="checkbox"
                      id="pet"
                      checked={true}
                      onChange={(event) => setPet(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="pet"
                      checked={false}
                      onChange={(event) => setPet(true)}
                    />
                  )}
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgVaga} alt="imgVaga" />
              </div>
              <div className="input-block">
                <label htmlFor="vaga">Vaga</label>
                <label className="switch">
                  {vaga ? (
                    <input
                      type="checkbox"
                      id="vaga"
                      checked={true}
                      onChange={(event) => setVaga(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="vaga"
                      checked={false}
                      onChange={(event) => setVaga(true)}
                    />
                  )}
                  <span className="slider round"></span>
                </label>
              </div>

              <div>
                <img src={imgWifi} alt="imgWifi" />
              </div>
              <div className="input-block">
                <label htmlFor="wifi">Wi-fi</label>
                <label className="switch">
                  {wifi ? (
                    <input
                      type="checkbox"
                      id="wifi"
                      checked={true}
                      onChange={(event) => setWifi(false)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      id="wifi"
                      checked={false}
                      onChange={(event) => setWifi(true)}
                    />
                  )}
                  <span className="slider round"></span>
                </label>
              </div>
            </fieldset>

            <fieldset className="grupo">
              <div>
                <img src={imgDescricao} alt="imgDescricao" />
              </div>
              <div className="input-block">
                <label htmlFor="descricao">
                  Descrição<div className="obs">(Máximo de 200 caracteres)</div>
                </label>
                <textarea
                  className="textarea"
                  id="descricao"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  maxLength={200}
                />
              </div>
            </fieldset>

            <div className="fotos">
              <div className="input-block">
                <label className="labelFotos" htmlFor="images">
                  Fotos
                  <div className="obs">(Upload de até 6 fotos)</div>
                </label>

                <div className="images-container">
                  {previewImages.map((image) => {
                    return <img key={image} src={image} alt={whatsapp} />;
                  })}

                  {/* type="button" para não fazer o submit do formulário */}
                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>

                <input
                  multiple
                  onChange={handleSelectImages}
                  type="file"
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="grupo">
            <div>
              <img src={imgZapp} alt="imgZapp" />
            </div>
            <div className="input-block">
              <label htmlFor="whatsapp">Número WhatsApp</label>
              <input
                id="whatsapp"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                type="number"
                required={true}
              />
            </div>

            <div>
              <img src={imgAutorizo} alt="imgAutorizo" />
            </div>
            <div className="input-block">
              <label htmlFor="autorizo">
                Autorizo a verificação dos dados e fotos enviados
              </label>
              <label className="switch">
                {/* <input type="checkbox" id="autorizo" /> */}
                {autorizo ? (
                  <input
                    type="checkbox"
                    id="autorizo"
                    checked={true}
                    onChange={(event) => setAutorizo(false)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    id="autorizo"
                    checked={false}
                    required={true}
                    onChange={(event) => setAutorizo(true)}
                  />
                )}
                <span className="slider round"></span>
              </label>
            </div>
          </fieldset>

          <div className="conf">
            <button className="primary-button" type="submit">
              Confirmar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
