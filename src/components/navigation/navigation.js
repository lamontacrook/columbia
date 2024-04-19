import React, { useState, useContext } from 'react';
import { useGraphQL } from '../../utils/useGraphQL';
import Loading from '../loading';
import Panel from '../panel';
import ColumbiaLogo from '../../media/columbia-logo.png';
import ShoppingBagIcon from '../../media/shopping-bag-icon.svg';
import UserAccountIcon from '../../media/user-account-icon-1.svg';
import SearchIcon from '../../media/search-icon.svg';
import { AppContext } from '../../utils/context';

import './navigation.css';

const Navigation = () => {
  const context = useContext(AppContext);
  const [panel, setPanel] = useState(null);
  const [style, setStyle] = useState('');
  
  const persistentQuery = 'navigation';
  const { data, errorMessage } = useGraphQL(persistentQuery, {project: context.project});

  if (errorMessage) return;

  let navs = [];
  if (!data) return <Loading />;
  else {
    navs = data.navigationList.items;
  }

  const changeHTML = (element) => {
    const div = document.createElement('div');
    div.innerHTML = element;
    const ul = div.querySelector('ul');
    let i = 0;
    const ret = [...ul.children].map((li) => {

      const anchor = li.querySelector('a');
      let NewAnchor = '';
      if (anchor) {
        const dataPanel = anchor.textContent.replace('\'', '').replace(' ', '-').toLowerCase();
        [...li.childNodes].forEach((item) => {
          if (item.nodeName != '#text') {
            [...item.childNodes].forEach(({ nodeName, textContent, href }) => {
              const TagName = nodeName.toLowerCase();
              const ParentName = `${item.nodeName.toLowerCase()}`;
              NewAnchor = <ParentName key={dataPanel}>
                <TagName href={href} title={dataPanel}
                  onMouseEnter={() => {setPanel(dataPanel);setStyle('show');}} 
                  onMouseLeave={() => {setStyle('');}} data-panel={dataPanel}>{textContent}</TagName></ParentName>;

            });
          }

        });
      }
      if (anchor)
        return (<li key={i++}>{NewAnchor}</li>);
      return (<li key={i++} dangerouslySetInnerHTML={{ __html: li.innerHTML }} />);
    });

    return ret;
  };
  
  return (
    <nav>
      <div className='nav-container'>
        {/* Hardcoded */}
        <div className='nav-logo'>
          <img src={ColumbiaLogo} alt='Columbia Logo' title='Columbia' />
        </div>
        {/* Hardcoded */}

        {navs && navs.map((nav) => (
          <div className='navigation' role='menubar' key={nav._path}>
            <ul>
              {changeHTML(nav.navigationItems.html)}
            </ul>
          </div>
        ))}

        {/* Hardcoded */}
        <div className='nav-options'>
          <div className='nav-search option'>
            <img src={SearchIcon} alt='Search Icon'/>
            <input type='search' placeholder='Search' autoComplete='off' aria-label='Search'/>
          </div>
          <div className='option'>
            <img src={UserAccountIcon} alt='User Account Icon'/>
          </div>
          <div className='option'>
            <img src={ShoppingBagIcon} alt='Shopping Bag Icon'/>
          </div>
        </div>
        {/* Hardcoded */}
      </div>
      
      <Panel style={style} panel={panel} />
    </nav>
  );
};

export default Navigation;