
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Video from '../video';
import Image from '../image';
import { Link } from 'react-router-dom';
import { AppContext } from '../../utils/context';
import { TextWithPlaceholders } from '../../utils/placeholders';
import LinkManager from '../../utils/LinkManager';
import './teaser.css';
import FiftyFifty from '../fifty-fifty';

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


const imageSizesHero = [
  {
    imageWidth: '1600px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1200px',
    renditionName: 'web-optimized-xlarge.webp',
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
    renditionName: 'web-optimized-medium.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-small.webp',
  },
  {
    size: '100vw',
  }
];

const Teaser = ({ content, config, component = true }) => {
  const context = useContext(AppContext);

  const renderAsset = ({ asset }) => {
    const imageProps = {
      'data-aue-prop': 'asset',
      'data-aue-type': 'media',
      'data-aue-label': 'Asset'
    };
    if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'format'))
      return (<Video content={content.asset} />);
    else if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'mimeType'))
      return (<Image imageProps={imageProps} asset={content.asset} alt={content.title} config={config} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
    else
      return (<Image imageProps={imageProps} asset={content.asset} alt={content.title} config={config} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
  };

  const hero = () => {
    return (<div className='wrapper'>
      {renderAsset(content)}
      <div className='content-container'>
        <div className='content-column'>
          <div className='main-content'>
            {content.title && content.style === 'hero' && (
              <h1 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h1>
            )}
            {content.preTitle && content.style === 'featured' && (
              <h5 data-aue-prop='preTitle' data-aue-type='text' data-aue-label='Pre-Title'>{content.preTitle}</h5>
            )}
            {content.description && (
              <p data-aue-prop='description' data-aue-type='text' data-aue-label='Description'><TextWithPlaceholders>{content.description.plaintext}</TextWithPlaceholders></p>
            )}
            {content.callToAction && content.link && (
              <Link to={LinkManager(content.link._path, config, context)}
                data-aue-type='reference' data-aue-prop='callToActionLink' data-aue-label='Call to Action' className='teaser-cta-link'>{content.callToAction}</Link>
            )} </div>
        </div>
      </div>
    </div>);
  };


  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/master`,
    'data-aue-type': 'reference',
    'data-aue-label': `Teaser(${content.style})`,
    'data-aue-model': content?._model?._path
  };

  if (component) editorProps['data-aue-behavior'] = 'component';

  console.log(content.style);
  if(content && content.style === 'hero') return <div className={`teaser ${content.style}`} {...editorProps}>{hero()}</div>;
  if(content && content.style === 'fifty-fifty') return <FiftyFifty editorProps={editorProps} asset={renderAsset(content)} content={content}/>;
  
};

Teaser.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  component: PropTypes.bool
};

export default Teaser;

/***
 * 
 * const FiftyFifty = () => (
  <div className='fifty-fifty'>
    {data.map((item, i) => (
      i === 0 ? (
        <MediaContainer key={i} image={item.image} />
      ) : i === 1 ? (
        <DescriptionContainer key={i} item={item}/>
      ) : null
    ))}
  </div>
);
 */