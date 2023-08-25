import './Player.scss';
import Image from "next/image";

export default function Player(){
    return(
        <div className="container">
        <a className="backButton" href="/">voltar</a>
        <p className="playingNow">Tocando agora: music info</p>
        <div className="lyricsContainer"></div>
        <div className="buttonsContainer">
            <button className="pause">
                <Image src={"/icons/pause.ico"} alt="" className="pauseImage" width={50} height={50} />
            </button>
            <button className="stop">
                <Image src={"/icons/stop.ico"} alt="" className="stopImage" width={50} height={50} />
            </button>
            <button className="reset">
                <Image src={"/icons/reset.ico"} alt="" className="resetImage" width={50} height={50} />
            </button>
        </div>
    </div>
    )
}