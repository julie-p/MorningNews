import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  
  const [ articleList, setArticleList ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ visible, setVisible ] = useState(false);

  const id_sources = props.match.params.id;

  useEffect( () => {
    const loadArticles = async () => {
      var response = await fetch(`http://newsapi.org/v2/top-headlines?sources=${id_sources}&apiKey=998d7137956f48f5a9d967f0e785e0e6`);
      var jResponse = await response.json();
      setArticleList(jResponse.articles);
    };
    loadArticles();

  }, []); 

  const saveWishlist = async article => {

    props.addToWishlist(article);

    const saveResponse = await fetch('/wishlist-article', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${article.title}&content=${article.content}&desc=${article.description}&lang=${props.selectLanguage}&img=${article.urlToImage}&token=${props.token}`
    })
  };  

  const showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

   const handleOk = e => {
    setVisible(false);
  };

   const handleCancel = e => {
    setVisible(false);
  }; 

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
            {articleList.map((article, i) => (
              <div 
              key={i} 
              style={{display:'flex',justifyContent:'center'}}>

                <Card
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="article"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                      <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)} />,
                      <Icon type="like" key="ellipsis" onClick={() => {saveWishlist(article)}}/>
                  ]}
                  >

                  <Meta
                    title={article.title}
                    description={article.description}
                  />
                  
                </Card>

                <Modal
                title={title}
                visible={visible}
                onOk={() => handleOk()}
                onCancel={() => handleCancel()}
                >
                <p>{content}</p>
                </Modal>
                
              </div>
            ))};

           </div> 

      </div>
  );
};

function mapStateToProps(state) {
  return {
      token: state.token, selectLanguage: state.selectLanguage
    }
  };

function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function(article) {
      dispatch({ type: 'addArticle',
                articleLike: article })    
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);