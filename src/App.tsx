import { url } from 'inspector';
import React, { Component, useEffect, useState } from 'react';
import { Modal } from './Components/Modal/Modal';
import './App.scss';
import { Afbeelding, Kavel } from './Components/Interfaces';
import { useMediaQuery } from 'react-responsive';
import "@fontsource/josefin-sans";

function App() {

  const [kavels, setKavels] = useState<Kavel[]>([]);
  const [modalContent, setModalContent] = useState<Element>();

  const [showModal, setShowModal] = useState(false);
  const handleKeyup = (e: KeyboardEvent) => e.keyCode === 27 && setShowModal(false);
  const toggleModal = (afbeelding: Afbeelding) => {

    const jsx = (
      <div
        onClick={() => setShowModal(false)}
        style={{
          backgroundImage: `url(/images/${afbeelding.path})`
        }}
        className='modal-image'
      >
      </div>
    );

    setModalContent(jsx as any);
    return setShowModal(!showModal);
  }

  useEffect(() => {
    if (showModal) window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  });

  const getKavelData = async () => {
    const response = await fetch(
      "kavels.json"
    ).then((response) => response.json());

    setKavels(response);
  }

  useEffect(() => {
    getKavelData();
  }, [])

  const isLaptop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  console.log(isLaptop);

  return (
    <div className='App'>
      <img src='placeholder.png' width='100%' />
      <h2>Kavels</h2>
      <div className='kavels'>
        {kavels.map((kavel) => (
          <div className='kavel' key={kavel.nummer}>
            <div className='kavel__poster'>
              {kavel.afbeeldingen.filter((e, index) => index === 0).map((afbeelding) => (
                <div className='kavel__poster__frame' key={afbeelding.path} onClick={() => toggleModal(afbeelding)}>
                  <img className='kavel__poster__frame--image' src={`/images/${afbeelding.path}`} />
                </div>
              ))}
            </div>
            <div className='kavel__content'>
              <h3>{kavel.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: kavel.omschrijving }}>{ }</div>
              <div className='thumbs'>
                {kavel.afbeeldingen.filter((e, index) => index > 0).map((afbeelding) => (
                  <div className='thumbs__frame' key={afbeelding.path} onClick={() => toggleModal(afbeelding)}>
                    <img className='thumbs__frame--image' src={`/images/${afbeelding.path}`} />
                  </div>
                ))}
            </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && modalContent && <Modal>
        {modalContent as any}
      </Modal>}
    </div>
  );
}

export default App;
