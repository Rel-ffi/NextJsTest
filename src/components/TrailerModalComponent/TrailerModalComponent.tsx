import "./TrailerModalComponent.css";
import {type FC, useEffect, useState} from "react";

type TrailerModalProps = {
    isOpen: boolean;
    trailerKey: string | null;
    onClose: () => void;
}

const TrailerModalComponent: FC<TrailerModalProps> = ({isOpen, trailerKey, onClose,}) => {

    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && trailerKey) {
            setIframeSrc(`https://www.youtube.com/embed/${trailerKey}?autoplay=1`);
        } else {
            setIframeSrc(null);
        }
    }, [isOpen, trailerKey]);

    return (
        <div className={`fm-modal ${isOpen ? "open" : ""}`}>
            <div className="fm-modal-content">
                <span className="fm-modal-close" onClick={onClose}>❌</span>
                {iframeSrc ? (
                    <iframe
                        src={iframeSrc}
                        title="Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>): null}
            </div>
        </div>
    );
};

export default TrailerModalComponent;