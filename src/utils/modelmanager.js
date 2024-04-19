import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../components/banner/';
import ImageList from '../components/imagelist';
import ProductList from '../components/productlist';
import Teaser from '../components/teaser/teaser';
import CollectionsCarousel from '../components/collections-carousel/collections-carousel';
import CTAList from '../components/ctalist/ctalist';

export const componentMapping = {
  Banner,
  ImageList,
  ProductList,
  Teaser,
  CollectionsCarousel,
  CTAList
};

const ModelManager = ({ content, dataAueProp }) => {
  if (content && content._model) {
    const { title } = content._model;
    const editorProps = {
      'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
      'data-aue-type': 'reference',
      'data-aue-filter': 'cf',
      'data-aue-label': title,
      'data-aue-model': content?._model?._path,
      'data-aue-behavior': 'component',
      'data_aue-prop': dataAueProp
    };
    const Component = componentMapping[title.replace(' ', '')];

    if (typeof Component !== 'undefined')
      return <Component editorProps={editorProps} content={content} />;
    else return <p>Neet to add {title} to ModelManager.</p>;
  } else {
    console.log(content);
    return <p>content does not contain <pre>_model</pre>{content.__typename}</p>;
  }
};

ModelManager.propTypes = {
  content: PropTypes.object,
  dataAueProp: PropTypes.string
};

export default ModelManager;
