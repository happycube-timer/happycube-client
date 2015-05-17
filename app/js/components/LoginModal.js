var React = require('react')
  , _ = require('lodash')
  , $ = require('jquery')
  , vent = require('../vent.js');

var LoginModal = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },
  toggleModal: function () {
    this.setState({open: !this.state.open});
  },
  onFormChange: function (key) {
    return (event) => this.setState({[key]: event.target.value});
  },
  onLogin: function () {
    console.log('this.state', this.state);
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
                    <h4>Log in</h4>
                    <div className="form-group">
                      <label for="login"></label>
                      <input name="login" className="form-control" placeholder="Choose a username" type="text" value={this.state.login} onChange={this.onFormChange('login')}/>
                    </div>
                    <div className="form-group">
                      <label for="password"></label>
                      <input name="password" className="form-control" placeholder="Password" type="password" value={this.state.password} onChange={this.onFormChange('password')}/>
                    </div>
                    <div className="checkbox pull-right">
                      <label>
                        <input type="checkbox" />
                        Remember me
                      </label>
                    </div>
                    <button className="btn btn-default" onClick={this.onLogin}>Login</button>
                    <hr />
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
