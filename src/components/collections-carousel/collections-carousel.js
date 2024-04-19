import React, { useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Image from '../image/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './collections-carousel.css';

const imageSizes = [
  {
    imageWidth: '660px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 660px'
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    size: '100vw',
  }
];

const CollectionsCarousel = ({ content, config, component = true, editorProps }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    afterChange: (slideIndex) => setCurrentSlide(slideIndex),
  };

  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  const carouselItem = (content) => {
    return {
      'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
      'data-aue-type': 'reference',
      'data-aue-filter': 'cf',
      'data-aue-label': content.title,
      'data-aue-model': content?._model?._path,
      'data-aue-behavior': 'component',
    };
  };

  editorProps['data-aue-behavior'] = 'component';
  editorProps['data-aue-type'] = 'container';

  return (
    <div className='coll-carousel' {...editorProps}>
      <h2 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h2>
      <div className="carousel">
        <Slider {...settings}>
          {content.collectionItems && content.collectionItems.map((item, i) => (
            <div className="carousel-item" key={i} {...carouselItem(item)}>
              <Image imageProps={imageProps} asset={item.asset} alt={item.title} config={config} imageSizes={imageSizes} />
              <h3 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{item.title}</h3>
              <span data-aue-prop='description' data-aue-type='text' data-aue-label='Description' dangerouslySetInnerHTML={{__html: item.description.html}} />
              <a href={item.link}>{item.callToAction}</a>
            </div>
          ))}
        </Slider>

      </div>
    </div>
  );
};

CollectionsCarousel.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  component: PropTypes.bool,
  editorProps: PropTypes.object
};

export default CollectionsCarousel;