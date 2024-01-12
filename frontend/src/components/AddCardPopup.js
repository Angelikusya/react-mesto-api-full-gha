import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
    const placeNameRef = useRef(null);
    const placeLinkRef = useRef(null);

    useEffect(() => {
        placeNameRef.current.value='';
        placeLinkRef.current.value='';
      }, [isOpen])

    function handleSubmit(e){
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value
        }); 
    }

    return (
    <PopupWithForm
        title="Новое место"
        name="add"
        submitButton="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <input
            id="place-input"
            type="text" 
            name="place"
            className="popup__input popup__input_type_place"
            placeholder="Название"
            minLength="2" maxLength="30"
            required
            ref={placeNameRef  || ''}
        />
        <span className="popup__input-error" id="place-input-error"></span>
        <input  
            id="image-input"
            name="image"
            className="popup__input popup__input_type_image"
            placeholder="Ссылка на картинку"
            type="url"
            required
            ref={placeLinkRef  || ''}
        />
        <span className="popup__input-error" id="image-input-error"></span>
    </PopupWithForm>
)
};

export default AddPlacePopup;  