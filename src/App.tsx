import './App.scss';
import "@fontsource/josefin-sans";
import "@fontsource/epilogue";
import { Kavels } from './Components/Kavels/Kavels';
import { Intro } from './Components/Intro/Intro';

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <img src='/images/musk_logo.svg' alt='Muskathlon logo' />
      </div>
      <div className='wrapper'>
        <Intro></Intro>
        <h2>Kavels</h2>
        <Kavels></Kavels>
      </div>
      <div className='footer'>
        <div className='footer__copyright'>
          Copyright ©{new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </div>
  );
}

export default App;
