export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    //подтягиваем карточки
    getInitialCards() {
        return fetch (`${this.baseUrl}/cards`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(this._checkResponse)
    }

    //подтягиваем имя и работу
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(this._checkResponse)
    }

    //отправляем имя и работу на сервер
    setUserInfo(name, about) {
        return fetch (`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about,
            })
        })
        .then(this._checkResponse)
    }

    // отправляем ссылку на новый аватар на сервер
    setUserAvatar(avatar) {
        return fetch (`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse)
    }

    //отправляем новую карточку на сервер
    addCard(name, link) {
        return fetch (`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
    }

    // удаляем карточку с сервера
    removeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(this._checkResponse);
    }

    // добавляем и убираем лайк карточке на сервере
    changeLikeCardStatus(card, isLiked) {
        return fetch(`${this.baseUrl}/cards/${card}/likes`, {
            method: !isLiked ? "DELETE" : "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
    }
}

// вызов Api
const api = new Api ({
    baseUrl: "https://api.mesto-angelikusya.nomoredomainsmonster.ru",
});

export {api};