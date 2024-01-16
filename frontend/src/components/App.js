import React, { useState, useEffect} from 'react';
import {useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import {api} from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddCardPopup.js';
import * as auth from '../utils/auth.js'
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import ImgSuccess from '../images/success.svg';
import ImgFail from '../images/Fail.svg';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData)
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.error(`Ошибка: ${err}`))
};

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then(res => {
        setCurrentUser(res);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  };

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data.avatar)
      .then(res => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  };

  function handleAddPlace(data) {
    api.addCard(data.name, data.link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  };

  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then((res) => {
      setCards((state) => state.filter((c) => card._id !== c._id ));
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
  }

  function handleRegister({email, password}) {
    auth 
    .register(email, password)
    .then(() => {
      setIsSuccessfulRegistration(true);
      navigate('/signin');
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);       
      setIsSuccessfulRegistration(false);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    });
  }  

  function handleLogin({email, password}) {
    auth 
    .login(email, password)
    .then((res) => {
      if(res.token) {
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
        return res;
      }
    })
    .catch((err) => console.error(`Ошибка: ${err}`)
    )
  }

  function handleExit() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  }

  
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) { handleTokenCheck(jwt) }
  }, [])
  
  const handleTokenCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/', {replace: true})
        }
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }
  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onExit={handleExit}/>
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
          <Route 
            path="/" 
            element={ 
              <ProtectedRoute 
                element={Main}
                onEditProfile={handleEditProfileClick}         
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}  
                />
              }
            />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        </Routes>

          {loggedIn && <Footer />}
          <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                          onClose={closeAllPopups}  
                          onUpdateAvatar={handleUpdateAvatar}
          /> 
          <AddPlacePopup isOpen={isAddPlacePopupOpen} 
                        onClose={closeAllPopups} 
                        onAddPlace={handleAddPlace}
          />
          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
          <InfoTooltip isOpen={isInfoTooltipOpen} 
                      onClose={closeAllPopups} 
                      alert={isSuccessfulRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                      image={isSuccessfulRegistration ? ImgSuccess : ImgFail}/>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
