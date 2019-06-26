import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2',() => {
      window.gapi.client.init({
        clientId: '934740225345-kru89e44mkh5igegmudtoogtqk5tvtk9.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = isSignedIn => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSingInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
       return (
         <button className="ui red google button" onClick={this.onSignOutClick}>
           <i className="google icon" />   
           Sign Out
         </button>
       )
    } else {
      return (
        <button className="ui red google button" onClick={this.onSingInClick}>
          <i className="google icon" />   
          Sign In
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
};

const mapStateToProps = (state) => {
  return {isSignedIn: state.authReducer.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);