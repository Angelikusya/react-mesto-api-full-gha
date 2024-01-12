function InfoTooltip({isOpen, onClose, image, alert}) {
    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container-registration'>
                <img className=' popup__registration' alt='Уведомление' src={image}></img>
                <p className='popup__allert'>{alert}</p>
                <button 
                    type='button'
                    className='button popup__button-close'
                    onClick={onClose}> 
                </button>
            </div>
        </div>
    )    
}

export default InfoTooltip;