import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav';
import { Link } from 'react-router-dom'; 

function ScreenSource(props) {

  const [ sourceList, setSourceList ] = useState([]);
  const [ selectLanguage, setSelectLanguage ] = useState(props.selectLanguage);

  useEffect( () => {
    const findLanguage = async () => {
      
      const reqFind = await fetch(`/user-language?token=${props.token}`);
      const respondeFind = await reqFind.json();
      setSelectLanguage(respondeFind.lang)

    };
    findLanguage();

  }, []);

  useEffect( () => {
    const loadData = async () => {
      let lang = 'fr';
      let country = 'fr';

      switch (selectLanguage) {

        case 'en' :
          if (selectLanguage == 'en') {
            lang = 'en';
            country = 'us';
            break;
          };
      };
      props.changeLanguage(selectLanguage);
      
      const response = await fetch(`http://newsapi.org/v2/sources?language=${lang}&country=${country}&&apiKey=998d7137956f48f5a9d967f0e785e0e6`);
      const jResponse = await response.json();
      setSourceList(jResponse.sources)

    };
    loadData();

  }, [selectLanguage]);

  const updateLang = async (lang) => {
    setSelectLanguage(lang);

    const reqLang = await fetch('/user-language', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `lang=${lang}&token=${props.token}`
    });
  };

  let borderLanguageFr = {width:'60px', margin:'10px',cursor:'pointer'};
  let borderLanguageEn = {width:'60px', margin:'10px',cursor:'pointer'};

  switch (selectLanguage) {
    case 'fr' :

      if (selectLanguage == 'fr'){
        borderLanguageFr.border = '1px solid black';
      };
  
    case 'en' :
      if (selectLanguage == 'en'){
        borderLanguageEn.border = '1px solid black';
      };
  };

  return (
    <div>
        <Nav/>
        {/* Sélection de la langue */}
       <div style={{justifyContent: 'center', display: 'flex'}} className="Banner">
          <img style={borderLanguageFr} src={'/images/fr.png'} onClick={() => updateLang('fr')}/>
          <img style={borderLanguageEn} src={'/images/us.png'} onClick={() => updateLang('en')}/>
       </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={(item, i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${item.id}`} key={i}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
};

function mapStateToProps(state) {
  return {
      selectLanguage: state.selectLanguage, token: state.token
    }
  };

function mapDispatchToProps(dispatch) {
  return {
      changeLanguage: function(selectLanguage) {
      dispatch({ type: 'changeLanguage',
                 selectLanguage: selectLanguage });
      }
    }
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource);
