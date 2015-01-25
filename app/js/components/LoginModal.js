/** @jsx React.DOM */

var React = require('react')
  , _ = require('lodash')
  , vent = require('../vent.js');

var LoginModal = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },
  toggleModal: function () {
    console.log('toggle modal');
    this.setState({open: !this.state.open});
  },
  render: function () {
    return (
      <div>
        <button className="btn" onClick={this.toggleModal}>Login</button>

        <div className={'modal ' + (this.state.open ? 'show' : '')}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                   <button type="button" onClick={this.toggleModal} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                  	<div className="col-sm-6">
                      <h4>Create a new account</h4>
                      <form action="">
                        <div className="form-group">
                          <label for="signup-username"></label>
                          <input id="signup-username" className="form-control" placeholder="Choose a username" type="text"/>
                        </div>
                        <div className="form-group">
                          <label for="signup-password"></label>
                          <input id="signup-password" className="form-control" placeholder="Password" type="password"/>
                        </div>
                        <div className="form-group">
                          <label for="signup-password2"></label>
                          <input id="signup-password2" className="form-control" placeholder="Verify your password" type="password"/>
                        </div>
                        <div className="form-group">
                          <label for="signup-email"></label>
                          <input id="signup-email" className="form-control" placeholder="Email (optional)" type="email"/>
                        </div>
                        <div className="checkbox pull-right">
                          <label>
                            <input type="checkbox" />
                            Remember me
                          </label>
                        </div>
                        <button className="btn btn-default" type="submit">Create your account</button>
                      </form>
                    </div>
                  	<div className="col-sm-6">
                      <h4>Log in</h4>
                      <form action="">
                        <div className="form-group">
                          <label for="signup-username"></label>
                          <input id="signup-username" className="form-control" placeholder="Choose a username" type="text"/>
                        </div>
                        <div className="form-group">
                          <label for="signup-password"></label>
                          <input id="signup-password" className="form-control" placeholder="Password" type="password"/>
                        </div>
                        <div className="checkbox pull-right">
                          <label>
                            <input type="checkbox" />
                            Remember me
                          </label>
                        </div>
                        <button className="btn btn-default" type="submit">Login</button>
                      </form>
                      <hr />
                      <a href="/auth/facebook" className="btn btn-primary">Login with facebook</a>
                    </div>
                  </div>
                </div>
                <div className="modal-footer"></div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginModal;
