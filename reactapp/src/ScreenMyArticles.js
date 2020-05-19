import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ visible, setVisible ] = useState(false);
  const [ language, setLanguage ] = useState('');

  useEffect(() => {

    const findArticlesInWishlist = async() => {
      const wishlist = await fetch(`/wishlist-article?lang=${language}&token=${props.token}`);
      const wishlistResponse = await wishlist.json();

      props.saveArticle(wishlistResponse.articles);
      console.log(wishlistResponse.articles);
    };
    findArticlesInWishlist();
  }, [language]);

  const deleteArticle = async (title) => {
    props.deleteFromWishlist(title);

    const deleteDB = await fetch('/wishlist-article', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `title=${title}&token=${props.token}`
    });
  };

  const filtreLanguage = (lang) => {
    setLanguage(lang);
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

  let emptyArticleList;
  if (props.myArticles == 0) {
    emptyArticleList = <div style={{marginTop:'100px', fontWeight:'bold', fontStyle:'italic', color:'#DC143C'}}>No Articles Found.</div>
  };

  return (
    <div>
         
            <Nav/>

            <div style={{justifyContent: 'center', display: 'flex'}} className="Banner">
              <img style={{width:'60px', margin:'10px',cursor:'pointer'}} src={'/images/fr.png'} onClick={() => filtreLanguage('fr')}/>
              <img style={{width:'60px', margin:'10px',cursor:'pointer'}} src={'/images/us.png'} onClick={() => filtreLanguage('en')}/>
            </div>

            <div className="Card">
              {emptyArticleList}
              {props.myArticles.map((article, i) => {
                return (
            
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
                            alt="example"
                            src={article.urlToImage} 
                        />
                        }
                        
                        actions={[
                          <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)}/>,
                          <Icon type="delete" key="ellipsis" onClick={() => deleteArticle(article.title)}/>
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
                      onOk={handleOk}
                      onCancel={handleCancel}
                      >
                      <p>{content}</p>
                      </Modal>

                    </div>
            )})}
 
             </div>
      
      </div>
  );
};

function mapStateToProps(state) {
  return {
      myArticles: state.wishlist, token: state.token
    }
  };

function mapDispatchToProps(dispatch) {
  return {
      deleteFromWishlist: function(title) {
      dispatch({ type: 'deleteArticle',
                 title: title });
      },
      saveArticle: function(articles) {
        dispatch({ type: 'saveArticle',
                   articles: articles })
      }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
