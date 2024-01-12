import PopupWithForm from './PopupWithForm.js';
import React, { useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription]= useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

	function handleNameChange(e) {
		setName(e.target.value);
	};

    function handleDescriptionChange(e) {
		setDescription(e.target.value)
	};

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name: name,
          about: description,
        }); 
    }

	return(
        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            submitButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <input
            id="name-input"
            type="text" 
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Введите имя"
            minLength="2" maxLength="40"
            required
            value={name || ''}
            onChange={handleNameChange}
        />
      <span className="popup__input-error" id="name-input-error"></span>
        <input 
            id="job-input"
            type="text" 
            name="job"
            className="popup__input popup__input_type_job"
            placeholder="Введите профессию"
            minLength="2" maxLength="200"
            required
            value={description || ''}
            onChange={handleDescriptionChange}
        />
            <span className="popup__input-error" id="job-input-error"></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;