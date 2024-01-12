import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import  { useContext } from 'react';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return(
    <main className="page">
        <section className="profile">
            <div className="profile__content">
                <button 
                        className="profile__edit-avatar"
                        id="edit-avatar-button"
                        type="button"                     
                        onClick={props.onEditAvatar}>
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`, backgroundSize: 'cover' }} 
                    />
                    <div className="profile__edit-avatar-icon" />
                </button> 

                <div className="profile__info">
                    <div className="profile__container">
                        <h1 id="profile__name" className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="button profile__edit-button"
                            onClick={props.onEditProfile}
                        >
                        </button>
                    </div>
                    <p id="profile__job" className="profile__job">{currentUser.about}</p>
                </div>
            </div>
            <button 
                type="button" 
                className="button profile__add-button"
                onClick={props.onAddPlace}
                >
            </button>
        </section>

        <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            name={card.name}
            likes={card.likes.length}
            src={card.link}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}

        </section>
    </main>
    );
}

export default Main;