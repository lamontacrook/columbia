import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { mapJsonRichText } from '../../utils/renderRichText';
import { AppContext } from '../../utils/context';
import './productlist.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const ProductList = ({ content, editorProps }) => {
  const [products, setProducts] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const context = useContext(AppContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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

  useEffect(() => {
    fetch(context.commerceSheet).then((res) => {
      if (res) {
        res.json().then((json) => setProducts(json.data));
      }
    }).catch((error) => {
      throw (error);
    });
  }, [context]);

  const findProduct = (product, sku) => {
    return product.product_sku === sku;
  };

  const retrieveProduct = (sku) => {
    if (!products) return;
    const product = products.find((item) => findProduct(item, sku));

    return (
      <React.Fragment>
        <img src={product.category_image} />
        <div className='list-item-content'> 
          <div className='product-name'>{product.product_name}</div>
          {/* <div className='product-description'>{product.product_description}</div> */}
          <div className='product-price'>${Number(product.product_price).toFixed(2)}</div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className='productlist' {...editorProps}>
        <div className='product-list-title'>
          {mapJsonRichText(content?.headline?.json)}
        </div>
        <div className='list-items'>
          <Slider {...settings}>
            {products && content.products && content.products.map((product) => (
              <div key={product} className='list-item'>
                {retrieveProduct(product)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};

ProductList.propTypes = {
  content: PropTypes.object,
  editorProps: PropTypes.object
};

export default ProductList;


//https://author-p124331-e1227315.adobeaemcloud.com/content/dam/amazon/assets/products/ullaj2263510687_1709571240895_2-0-_QL90_UX282_.jpg/_jcr_content/renditions/original?ch_ck=1711387638000