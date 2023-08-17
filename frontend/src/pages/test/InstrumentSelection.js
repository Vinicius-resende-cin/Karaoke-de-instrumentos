import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function InstrumentSelection() {
    const [showAcordes, setShowAcordes] = useState(false);
    const [showLetra, setShowLetra] = useState(false);

    const toggleShowAcordes = () => {
        setShowAcordes(!showAcordes);
    };

    const toggleShowLetra = () => {
        setShowLetra(!showLetra);
    };

    return (
        <div className="container">
            <div className="backButton">Voltar</div>
            <div className="songContainer">
                <img
                    src={require('../../assets/icons/home.ico')}
                    alt="Song Cover"
                    className="songImage"
                />
                <div className="songName">As It Was</div>
                <div className="artistName">Harry Styles</div>
            </div>
            <div className="select">
                <label htmlFor="instrument" className="instrumentClass">
                    Instrumento:
                </label>
                <div className="select-wrapper">
                    <select>
                        <option value="guitarra">Guitarra</option>
                        <option value="piano">Piano</option>
                        <option value="violino">Violino</option>
                        <option value="violao">Violão</option>
                        <option value="bateria">Bateria</option>
                    </select>
                    <span className="select-icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>
            </div>
            <div className="showOptions">
                <div className="showText">Mostrar Acordes:</div>
                <div
                    className={`checkbox ${showAcordes ? 'checked' : ''}`}
                    onClick={toggleShowAcordes}
                ></div>
            </div>
            <div className="showOptions">
                <div className="showText">Mostrar Letra:</div>
                <div
                    className={`checkbox2 ${showLetra ? 'checked' : ''}`}
                    onClick={toggleShowLetra}
                ></div>
            </div>
            <div className="playButton">
                <span className="playIcon">▶</span>
            </div>
        </div>
    );
}