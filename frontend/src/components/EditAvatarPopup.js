import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef(null);

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        }); 
    }
    
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-avatar"
            submitButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
            <input
            id="popup-edit-avatar"
            type="url"
            className="popup__input popup__input_type_link"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef || ''}
            />
        </PopupWithForm>
    )
};

export default EditAvatarPopup;