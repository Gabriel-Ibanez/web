import Leaflet from "leaflet";
import IESBMarker from "../images/IESBMarker.svg";

const iconIESB = Leaflet.icon({
  iconUrl: IESBMarker,
  iconSize: [50, 50],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
});

export default iconIESB;