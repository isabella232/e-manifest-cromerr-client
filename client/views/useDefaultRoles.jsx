UseDefaultRoles = React.createClass({
  render: function() {
    var useDefaultRoles = function() {
      var defaultRoles = [
        { roleId: "81030", roleName: "ApexTest" },
        { roleId: "81020", roleName: "Certifier" },
        { roleId: "81010", roleName: "Preparer" }
      ];
      
      Session.set("roles", defaultRoles);
      Session.set("dataflowName", "DEMO2: EPA Demonstration 2");
    };
    
    return <button onClick={useDefaultRoles}>use default roles</button>;
  }
});
