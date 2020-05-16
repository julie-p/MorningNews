import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';

function ScreenHome(props) {   

  const [ signUpUsername, setSignUpUsername ] = useState('');
  const [ signUpEmail , setSignUpEmail ] = useState('');
  const [ signUpPassword, setSignUpPassword ] = useState('');
  const [ user, setUser ] = useState(false);
  const [ signInEmail, setSignInEmail ] = useState('');
  const [ signInPassword, setSignInPassword ] = useState('');
  const [ errorHandlerSignUp, setErrorHandlerSignUp ] = useState([]);
  const [ errorHandlerSignIn, setErrorHandlerSignIn ] = useState([]);


  const handleSubmitSignUp = async() => {
        const response = await fetch(`/sign-up`, {
                method: 'POST',
                headers: {'content-Type':'application/x-www-form-urlencoded'},
                body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
        });
        const bodyResponse = await response.json();
        props.addToken(bodyResponse.token);

        if (bodyResponse.result) {
                setUser(true);
        } else {
                setErrorHandlerSignUp(bodyResponse.error);
        };
        console.log(bodyResponse.error)
  };

  const handleSubmitSignIn = async() => {
        const response = await fetch(`/sign-in`, {
                method: 'POST',
                headers: {'content-Type':'application/x-www-form-urlencoded'},
                body: `email=${signInEmail}&password=${signInPassword}`
        });
        const bodyResponse = await response.json();
        props.addToken(bodyResponse.token);
        
        if (bodyResponse.result) {
                setUser(true);
        } else {
                setErrorHandlerSignIn(bodyResponse.error);
        };
  };

  if (user) {
        return <Redirect to="/screensource" />
  };

  let errorSignUp = errorHandlerSignUp.map((error, i) => {
        return (<p key={i} style={{color: '#fff'}}>{error}</p>);
  });
  
  let errorSignIn = errorHandlerSignIn.map((error, i) => {
        return (<p key={i} style={{color: '#fff'}}>{error}</p>);
  });

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">

                  <Input 
                  className="Login-input" 
                  placeholder="Email"
                  onChange={(e) => setSignInEmail(e.target.value)}
                  value={signInEmail}          
                  />

                  <Input.Password 
                  className="Login-input" 
                  placeholder="Password" 
                  onChange={(e) => setSignInPassword(e.target.value)}
                  value={signInPassword}
                  />
            
                  {errorSignIn}

                  <Button 
                  style={{width:'80px'}} 
                  type="primary" 
                  onClick={() => handleSubmitSignIn()}>Sign-in</Button>
            
          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
                  <Input 
                  className="Login-input" 
                  placeholder="Username" 
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  value={signUpUsername}
                  />

                  <Input 
                  className="Login-input" 
                  placeholder="Email" 
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  value={signUpEmail}
                  />

                  <Input.Password 
                  className="Login-input" 
                  placeholder="Password" 
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  value={signUpPassword}
                  />
            
                  {errorSignUp}

                  <Button 
                  style={{width:'80px'}} 
                  type="primary" 
                  onClick={() => handleSubmitSignUp()}>Sign-up</Button>
                  

          </div>

      </div>
  );
};

function mapDispatchToProps (dispatch) {
        return {
                addToken: function(token) {
                        dispatch({type: 'addToken',
                                    token: token})
                }
        }
};

export default connect(
        null, 
        mapDispatchToProps
)(ScreenHome);
