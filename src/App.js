import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import foto1 from './img/desktopBrochureResolucionMedia01.jpg'
import foto2 from './img/desktopUnitopia.jpg'
import foto3 from './img/desktopPantalla03.jpg'
import foto4 from './img/mobileBrochureResolucionMedia01.jpg'
import foto5 from './img/mobileUnitopia.jpg'
import foto6 from './img/mobilePantalla03.jpg'

const items = [
  {
    src: detectDevice(foto1, foto4),
    altText: 'Slide 1',
    caption: 'Slide 1',
    href: 'http://sergiomonva.com'
  },
  {
    src: detectDevice(foto2, foto5),
    altText: 'Slide 2',
    caption: 'Slide 2',
    href: 'http://facebook.com'
  },
  {
    src: detectDevice(foto3, foto6),
    altText: 'Slide 3',
    caption: 'Slide 3',
    href: 'http://youtube.com'
  }
];

function detectDevice(fotoA, fotoB) {
  if(window.screen.width<window.screen.height) {
    return fotoB;
  } else {
    return fotoA;
  }
}

const App = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="mainImage" src={item.src} alt={item.altText} width="100%"/>
        <a href={item.href} _target="_blank">{item.href}</a>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default App;