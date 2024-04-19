import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';
import { useGraphQL } from '../../utils/useGraphQL';
import Loading from '../loading';
import './panel.css';

const imageSizes = [
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

const Panel = ({ style, panel }) => {
  const persistentQuery = 'panels';
  const { data, errorMessage } = useGraphQL(persistentQuery);

  if (errorMessage) return;

  if (!data) return <Loading />;
  const panels = data.panelList.items.filter((p) => {
    if (p.slug === panel) return p;
  });

  const imageProps = {
    'data-aue-prop': 'asset',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset'
  };

  return (
    <div className={`panel ${style}`}>
      <div className='panel-left'>

        {panels.map((p) => (
          <span key={p.slug} dangerouslySetInnerHTML={{__html:p.links.html}} />
        ))}

      </div>
      {/* <div className='panel-right'>
        {panels.map((p) => (
          <Image key={p.slug} imageProps={imageProps} asset={p.asset} title={p.title} alt={p.description} imageSizes={imageSizes} />
        ))}
      </div> */}
    </div>
  );
};

Panel.propTypes = {
  panel: PropTypes.string,
  style: PropTypes.string
};

export default Panel;


//https://author-p124331-e1227315.adobeaemcloud.com/content/dam/amazon/assets/products/ullaj2263510687_1709571240895_2-0-_QL90_UX282_.jpg/_jcr_content/renditions/original?ch_ck=1711387638000