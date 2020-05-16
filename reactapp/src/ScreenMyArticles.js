import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ visible, setVisible ] = useState(false);

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
  if (props.wishlist == 0) {
    emptyArticleList = <div style={{marginTop:'100px', fontWeight:'bold', fontStyle:'italic', color:'#DC143C'}}>No Articles Found.</div>
  };

  return (
    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {emptyArticleList}
              {props.wishlist.map((article, i) => {
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
                          <Icon type="delete" key="ellipsis" onClick={() => props.deleteFromWishlist(article.title)}/>
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
            )})}
 
             </div>
      
      </div>
  );
};

function mapStateToProps(state) {
  return {
      wishlist: state.wishlist,
    }
  };

function mapDispatchToProps(dispatch) {
  return {
      deleteFromWishlist: function(title) {
      dispatch({ type: 'deleteArticle',
                 title: title });
      }
    }
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
