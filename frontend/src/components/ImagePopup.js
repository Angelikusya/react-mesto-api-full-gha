function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup-zoom ${card ? "popup_opened" : ""}`}>
            <div className="popup-zoom__container">
            <button
                type="button"
                className="button popup__button-close popup-zoom__button-close"
                onClick= {onClose} 
            />
            <img src={card?.link}  alt={card.name} className="popup-zoom__image" />
            <h2 className="popup-zoom__subheading">{card.name}</h2>
            </div>
        </div>
    )    
}

export default ImagePopup;
