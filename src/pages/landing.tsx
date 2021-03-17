import React from 'react';
import { Link } from "react-router-dom";
import logoImg from "../images/logo.svg";

import "../styles/pages/landing.css";

export default function Landing(){
    return (
            <div className="fundo">
              <div id="page-landing">
                <div id="rectangle1">
                  <div id="r1-left-side">
                    <div id="s1">
                      <img src={logoImg} alt="LogoSK" />
                    </div>
                    <div id="s2">
                      <div className="frase1">SuaKit.net</div>
                      <div className="frase2">
                        <p>Aluguel de Kit nets</p>
                      </div>
                    </div>
                  </div>
                  <div id="r1-rigth-side">
                    <div id="s3">
                      <div className="frase3">Brasília-DF</div>
                      <div className="frase4">
                        <span>Encontre ou anuncie sua kit hoje mesmo!</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link id="botao" to="/app" className="enter-app"></Link>
              </div>
            </div>
    );
}
