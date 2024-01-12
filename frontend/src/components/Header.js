import logo from '../images/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({email, onExit}) {
    return (
      <header className='header'>
        <img
          src={logo}
          alt='Лого карта'
          className='header__logo'
        />
        <div className='header__auth'>
          {email ? email : ''}
          <Routes>
            <Route path='signin' element={<Link to='/signup' className='header__link'>Регистрация</Link>} />
            <Route path='signup' element={<Link to='/signin' className='header__link'>Войти</Link>} />
            <Route path='/' element={<Link to='/signin' className='header__exit header__link' onClick={onExit}>Выйти</Link>} />
          </Routes> 
        </div>
      </header>
  );
}

export default Header;