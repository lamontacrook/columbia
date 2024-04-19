import React, { useState, useContext } from 'react';
import ModelManager from '../../utils/modelmanager';
import PropTypes from 'prop-types';
import { useErrorHandler } from 'react-error-boundary';
import { AppContext } from '../../utils/context';
import { Helmet } from 'react-helmet-async';
import Delayed from '../../utils/delayed';
import Navigation from '../navigation';
import Footer from '../footer';
import { useGraphQL } from '../../utils/useGraphQL';
import Loading from '../loading';
import './screen.css';

const Screen = () => {
  const context = useContext(AppContext);
  const [title, setTitle] = useState('');
 
  const persistentQuery = 'screen';

  const { data, errorMessage } = useGraphQL(persistentQuery, { tags: `${context.startScreen}` });

  if (errorMessage) return;

  if (!data) return <Loading />;

  let i = 0;

  const editorProps = {
    'data-aue-type': 'container',
    'data-aue-filter': 'screen',
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Columbia {title}</title>
      </Helmet>
      <header>
        <Navigation key='navigation' />
      </header>

      {data && data.screenList.items.map((item) => (
        <div key={item.path} className='main-body' {...editorProps} 
          data-aue-label={item._model.title} 
          data-aue-model={item._model._path}
          data-aue-prop='block'
          data-aue-resource={`urn:aemconnection:${item._path}/jcr:content/data/${item._variation}`}>
          <ModelManager key={item.path} content={item.hero} dataAueProp='hero'></ModelManager>
          {item && item.blocks.map((block) => (
            <Delayed key={block._path} waitBeforeShow={200}>
              <ModelManager dataAueProp='block' content={block}></ModelManager>
            </Delayed>
          ))}
        </div>
      ))}
      <Footer />
    </React.Fragment>
  );
};

Screen.propTypes = {
  content: PropTypes.object
};

export default Screen;