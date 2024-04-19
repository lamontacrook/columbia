import React from 'react';
import PropTypes from 'prop-types';
import './ctalist.css';

const CTAList = ({ content, config, component = true, editorProps }) => {
  const containerClass = content.ctas.length <= 6 ? 'container row' : 'container multiple';

  const ctaItem = (content) => {
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
    <div className='cta-list' {...editorProps}>
      <div className={`container ${content.styles}`}>
        {content.ctas.map((item) => (
          <div key={item.label} className='cta' {...ctaItem(content)}>
            <a href={item.cta._path}>{item.label}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

CTAList.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object,
  component: PropTypes.bool,
  editorProps: PropTypes.object
};

export default CTAList;