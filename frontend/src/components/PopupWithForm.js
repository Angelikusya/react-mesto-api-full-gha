function PopupWithForm({title, name, submitButton, children, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{title}</h2>
                <form 
                    className={"form popup__form"} 
                    name={name} 
                    onSubmit={onSubmit}
                    >
                {children}
                    <button 
                        className="popup__button" 
                        type="submit">{submitButton}
                    </button>
                </form>
            <button 
                type="button" 
                className={"button popup__button-close"} 
                onClick={onClose}
                />
        </div>
    </div>
  );
}

export default PopupWithForm;