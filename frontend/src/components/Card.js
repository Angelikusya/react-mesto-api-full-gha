import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({card, name, likes, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = (`element__vector ${isLiked ? 'element__vector_active' : ''}`);

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
      };

      function handleDeleteClick() {
        onCardDelete(card)
      }


    return (
        <div className="element-template" id="element-template">
            <article className="element">

            {isOwn && (<button 
                            type="button"
                            className="element__trash"
                            onClick={handleDeleteClick} >
                        </button>)}
                        
                <div 
                    className="element__image" 
                    onClick={handleClick} 
                    style={{ backgroundImage: `url(${card.link})`}}>
                </div>

                <div className="element__description">
                    <h2 className="element__subheading">{name}</h2>
                    <div className="element__group-like">
                        <button
                            type="button"
                            className={cardLikeButtonClassName}
                            onClick={handleLikeClick}
                        />
                        <p className="element__like-counter">{likes}</p>
                    </div>
                </div>

            </article>
        </div>
    );
}

export default Card;


