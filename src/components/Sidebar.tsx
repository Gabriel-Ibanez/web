import { useHistory } from 'react-router-dom';
import mapMarker from "../images/mapMarker.svg";
import '../styles/pages/components/sidebar.css';

export default function Sidebar() {
    const { goBack} = useHistory();

    return(
        <aside className="app-sidebar">
        <img src={mapMarker} alt="Happy" />
        <footer>
            <button type="button" onClick={goBack}>
          </button>
        </footer>
      </aside>    
    );
}