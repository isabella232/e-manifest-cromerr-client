Authenticate = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      authUser: Session.get("authUser"),
      authError: Session.get("authError")
    };
  },
  getInitialState: function() {
    return {
      disabled: false
    };
  },
  render: function() {
    var that = this;
    var disabled = this.state.disabled;

    var showAuthError = function() {
      if (that.data.authError) {
        return <div data-error>{ that.data.authError }</div>;
      }
    };
    
    var authenticate = function() {
      that.setState({ disabled: true });
      postAuthToCDX();
    };

    var postAuthToCDX = function() {
      var userId = React.findDOMNode(that.refs["userId"]).value;
      var password = React.findDOMNode(that.refs["password"]).value;
      Meteor.call("authenticate", userId, password, function(error, result) {
        if (error) {
          Session.set("authError", error.error.description);
          that.setState({ disabled: false });
        } else {
          Session.set("authUser", result);
          Session.set("authError", undefined);
        }
      });
        
    };
    
    var clearUser = function() {
      that.setState({ disabled: false });
      Session.set("authUser", undefined);
    };

    if (!this.data.authUser) {
      return (
        <section>
          <h1>Authenticate (the end user)</h1>
          { showAuthError() }
          <label htmlFor="userId">userId <input id="userId" name="userId" disabled={disabled} ref="userId"/></label>
          <label htmlFor="password">password <input id="password" name="password" disabled={disabled} ref="password"/></label>
          <button type="submit" onClick={authenticate} disabled={disabled}>authenticate</button>
        </section>
      );
    }

    return (
      <section>
        <h1>Authenticate (the end user)</h1>
        Authenticated with user:
        <div>user id: {this.data.authUser.userId}</div>
        <div>first name: {this.data.authUser.firstName}</div>
        <div>middle initial: {this.data.authUser.middleInitial ? this.data.authUser.middleInitial : "n/a"}</div>
        <div>last name: {this.data.authUser.lastName}</div>
        <button onClick={clearUser}>authenticate different user</button>
      </section>
    );

  }
});
