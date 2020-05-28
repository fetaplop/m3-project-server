(this["webpackJsonpreact-auth-client"]=this["webpackJsonpreact-auth-client"]||[]).push([[0],{26:function(e,t,n){},63:function(e,t,n){e.exports=n(93)},91:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),s=n.n(o),l=n(34),c=n(38),i=n(48),u=[],p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ALL_STOPS":return[].concat(Object(i.a)(e),Object(i.a)(t.payload));default:return e}},m=n(10),h=n(5),d=n(6),g=n(13),v=n(12),f=(n(26),n(7)),E=n(25),b=n(62),y=n(14),L=n(27),O=n.n(L),S=new(function(){function e(){Object(h.a)(this,e),this.auth=O.a.create({baseURL:"https://oulu-bus-stops.herokuapp.com",withCredentials:!0})}return Object(d.a)(e,[{key:"signup",value:function(e){var t=e.username,n=e.password;return this.auth.post("/auth/signup",{username:t,password:n}).then((function(e){return e.data}))}},{key:"login",value:function(e){var t=e.username,n=e.password;return this.auth.post("/auth/login",{username:t,password:n}).then((function(e){return e.data}))}},{key:"logout",value:function(){return this.auth.get("/auth/logout",{}).then((function(e){return e.data}))}},{key:"me",value:function(){return this.auth.get("/auth/me").then((function(e){return e.data}))}}]),e}()),k=new(function(){function e(){Object(h.a)(this,e),this.user=O.a.create({baseURL:"https://oulu-bus-stops.herokuapp.com",withCredentials:!0})}return Object(d.a)(e,[{key:"favourites",value:function(){return this.user.get("/user/favourites").then((function(e){return e.data}))}},{key:"delete",value:function(){return this.user.delete("user/delete").then((function(e){return e.data}))}}]),e}()),j=r.a.createContext(),w=j.Consumer,C=j.Provider;function I(e){return function(t){return r.a.createElement(w,null,(function(n){return r.a.createElement(e,Object.assign({},t,{user:n.user,isLoggedIn:n.isLoggedIn,isLoading:n.isLoading,login:n.login,signup:n.signup,logout:n.logout,deleteUser:n.deleteUser}))}))}}var _=function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={user:null,isLoggedIn:!1,isLoading:!0},e.login=function(t,n){S.login({username:t,password:n}).then((function(t){e.setState({isLoggedIn:!0,isLoading:!1,user:t})})).catch((function(t){console.log(t),e.setState({isLoggedIn:!1,isLoading:!1,user:null})}))},e.signup=function(t,n){S.signup({username:t,password:n}).then((function(t){e.setState({isLoggedIn:!0,isLoading:!1,user:t})})).catch((function(t){console.log(t),e.setState({isLoggedIn:!1,isLoading:!1,user:null})}))},e.logout=function(){S.logout().then((function(){e.setState({isLoggedIn:!1,isLoading:!1,user:null})})).catch((function(e){return console.log(e)}))},e.deleteUser=function(){k.delete().then((function(){e.setState({isLoggedIn:!1,isLoading:!1,user:null})})).catch((function(e){console.log(e)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;S.me().then((function(t){e.setState({isLoggedIn:!0,isLoading:!1,user:t})})).catch((function(t){return e.setState({isLoggedIn:!1,isLoading:!1,user:null})}))}},{key:"render",value:function(){var e=this.state,t=e.user,n=e.isLoggedIn,a=e.isLoading,o=this.login,s=this.signup,l=this.logout,c=this.deleteUser;return r.a.createElement(C,{value:{user:t,isLoggedIn:n,isLoading:a,login:o,signup:s,logout:l,deleteUser:c}},this.props.children)}}]),n}(r.a.Component),D=I(function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"shouldComponentUpdate",value:function(e){return this.props.user!==e.user}},{key:"render",value:function(){var e=this.props,t=(e.user,e.logout,e.isLoggedIn);return r.a.createElement(b.a,{bg:"dark",variant:"dark"},r.a.createElement(E.a,{className:"nav",activeKey:"/",variant:"pills"},r.a.createElement(E.a.Item,null,r.a.createElement(m.c,{to:"/",activeClassName:"active"},r.a.createElement(y.a,{size:"lg",variant:"outline-info"}," Search for stops "))),t?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a.Item,null,r.a.createElement(m.b,{to:"/private"},r.a.createElement(y.a,{size:"lg",variant:"outline-info"}," My page "))),r.a.createElement(E.a.Item,null,r.a.createElement(y.a,{onClick:this.props.logout,size:"lg",variant:"outline-info"}," Logout "))):r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a.Item,null,r.a.createElement(m.b,{to:"/signup"},r.a.createElement(y.a,{size:"lg",variant:"outline-info"}," Signup "))),r.a.createElement(E.a.Item,null,r.a.createElement(m.b,{to:"/login"},r.a.createElement(y.a,{size:"lg",variant:"outline-info"}," Login "))))))}}]),n}(a.Component)),F=n(41),x=n(30),A=n(49),U=new(function(){function e(){Object(h.a)(this,e),this.stop=O.a.create({baseURL:"https://oulu-bus-stops.herokuapp.com",withCredentials:!0})}return Object(d.a)(e,[{key:"getAll",value:function(){return this.stop.get("/stops").then((function(e){return e.data}))}},{key:"getOne",value:function(e){return this.stop.get("/stops/".concat(e)).then((function(e){return e.data}))}},{key:"save",value:function(e){return this.stop.post("/stops/".concat(e,"/save")).then((function(e){return e.data}))}},{key:"unsave",value:function(e){return this.stop.post("/stops/".concat(e,"/unsave")).then((function(e){return e.data}))}}]),e}()),z=function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={searchFor:"",searchResults:[]},e.search=function(t){var n=e.props.stopsData.filter((function(e){return e.stop_name.toLowerCase().includes(t.toLowerCase())}));e.setState({searchResults:n})},e.handleSearchInput=function(t){var n=t.target.value;e.setState({searchFor:n},(function(){e.search(n)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.props.stopsData.length>0||U.getAll().then((function(t){console.log("serverData with stopService getAll me:",t),e.props.addAllStops(t)})).catch((function(e){return console.log("error while getting data from server",e)}))}},{key:"render",value:function(){var e=this.state.searchResults;return r.a.createElement("div",{class:"search-field"},this.props.stopsData.length>0?r.a.createElement(F.a,{className:"mb-3"},r.a.createElement(F.a.Prepend,null,r.a.createElement(F.a.Text,{id:"basic-addon1"},"Search")),r.a.createElement(x.a,{placeholder:"Search for bus stops by name","aria-label":"Search",value:this.state.searchFor,onChange:this.handleSearchInput,"aria-describedby":"basic-addon1"})):r.a.createElement("p",null,"Loading data..."),r.a.createElement("div",null,e.map((function(e){return r.a.createElement("div",{key:e.stop_code},r.a.createElement(A.a,null,r.a.createElement(A.a.Body,{style:{padding:"5px 10px"}},r.a.createElement(m.b,{to:"/stops/".concat(e._id)},r.a.createElement("h4",null,e.stop_name)))))}))))}}]),n}(a.Component),R=Object(c.b)((function(e){return{stopsData:e}}),(function(e){return{addAllStops:function(t){e({type:"ADD_ALL_STOPS",payload:t})}}}))(z);var N=I((function(e){return r.a.createElement("div",{class:"greeting"},e.isLoggedIn?r.a.createElement("h1",null,"Welcome, ",e.user.username,"! "):r.a.createElement("h1",null,"Welcome, traveller! "),r.a.createElement(R,null))})),P=n(37),M=n(15),T=n(23),G=n(29),H=I(function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e.handleFormSubmit=function(t){t.preventDefault();var n=e.state,a=n.username,r=n.password;e.props.signup(a,r)},e.handleChange=function(t){var n=t.target,a=n.name,r=n.value;e.setState(Object(P.a)({},a,r))},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.state,t=e.username,n=e.password;return r.a.createElement("div",{class:"userForm"},r.a.createElement("h1",null,"Sign Up"),r.a.createElement(M.a,{onSubmit:this.handleFormSubmit},r.a.createElement(M.a.Group,{as:G.a,controlId:"formHorizontalEmail"},r.a.createElement(M.a.Label,{column:!0,sm:2},"Username:"),r.a.createElement(T.a,{sm:10},r.a.createElement(M.a.Control,{type:"text",name:"username",value:t,onChange:this.handleChange}))),r.a.createElement(M.a.Group,{as:G.a,controlId:"formHorizontalPassword"},r.a.createElement(M.a.Label,{column:!0,sm:2,style:{textAlign:"center"}},"Password:"),r.a.createElement(T.a,{sm:10},r.a.createElement(M.a.Control,{type:"password",name:"password",value:n,onChange:this.handleChange}))),r.a.createElement(y.a,{type:"submit",value:"Signup"},"   Signup    ")),r.a.createElement("div",{id:"link-login"},r.a.createElement("p",null,"Already have an account?"),r.a.createElement(m.b,{to:"/login"}," ",r.a.createElement(y.a,null," Login ")," ")))}}]),n}(a.Component)),W=I(function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:""},e.handleFormSubmit=function(t){t.preventDefault();var n=e.state,a=n.username,r=n.password;e.props.login(a,r)},e.handleChange=function(t){var n=t.target,a=n.name,r=n.value;e.setState(Object(P.a)({},a,r))},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.state,t=e.username,n=e.password;return r.a.createElement("div",{class:"userForm"},r.a.createElement("h1",null,"Login"),r.a.createElement(M.a,{onSubmit:this.handleFormSubmit},r.a.createElement(M.a.Group,{as:G.a,controlId:"formHorizontalEmail"},r.a.createElement(M.a.Label,{column:!0,sm:2},"Username:"),r.a.createElement(T.a,{sm:10},r.a.createElement(M.a.Control,{type:"text",name:"username",value:t,onChange:this.handleChange}))),r.a.createElement(M.a.Group,{as:G.a,controlId:"formHorizontalPassword"},r.a.createElement(M.a.Label,{column:!0,sm:2,style:{textAlign:"center"}},"Password:"),r.a.createElement(T.a,{sm:10},r.a.createElement(M.a.Control,{type:"password",name:"password",value:n,onChange:this.handleChange}))),r.a.createElement(y.a,{type:"submit",value:"Login"},"   Login     ")))}}]),n}(a.Component)),X=I(function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={userFaves:null},e}return Object(d.a)(n,[{key:"componentWillUnmount",value:function(){}},{key:"componentDidMount",value:function(){var e=this;k.favourites().then((function(t){console.log("got this array of bus stops from server:",t),e.setState({userFaves:t})}))}},{key:"render",value:function(){return r.a.createElement("div",{id:"private"},this.props.isLoggedIn?r.a.createElement("div",{class:"greeting"}," ",r.a.createElement("h1",null,"Welcome, ",this.props.user.username,"!"),null!==this.state.userFaves&&0!==this.state.userFaves.length?r.a.createElement("h4",null,"Here are your saved bus stops:"):r.a.createElement("h4",null," You haven't saved any bus stops yet! ")):null,null!==this.state.userFaves?this.state.userFaves.map((function(e){return r.a.createElement("div",{class:"search-field",key:e.stop_code},r.a.createElement(m.b,{to:"/stops/".concat(e._id)}," ",r.a.createElement("h4",null,e.stop_name,", code: ",e.stop_code),"  "))})):null,this.props.isLoggedIn?r.a.createElement(y.a,{variant:"danger",onClick:this.props.deleteUser}," Delete user? "):null)}}]),n}(a.Component)),B=(n(91),I(function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(h.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={stop:{},isFave:null},e.handleLike=function(){var t=e.state.stop._id;console.log("stopID",t),!1===e.state.isFave&&U.save(t).then((function(t){console.log("saved from handleLike()",t),e.setState({isFave:!0})})),!0===e.state.isFave&&U.unsave(t).then((function(t){console.log("unsaved this stop from handleLike()",t),e.setState({isFave:!1})}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;console.log("id from componentDidMount:",t),U.getOne(t).then((function(n){console.log("stopfromServer inside StopPage compoenntDid*Mount:",n),e.setState({stop:n}),e.props.isLoggedIn&&k.favourites().then((function(n){var a=!1;n.length>0&&n.forEach((function(e){e._id===t&&(a=!0)})),e.setState({isFave:a})})).catch((function(e){console.log("error from trying to update user likes",e)}))})).catch((function(e){console.log("err from StopService.GetOne in componentDidmount",e)}))}},{key:"render",value:function(){var e=this.state.stop;return r.a.createElement("div",{class:"stopContain"},r.a.createElement("div",{class:"stopRows"},r.a.createElement("h1",null,e.stop_name),r.a.createElement("p",null,"Stop code: ",e.stop_code," "),r.a.createElement("p",null,"Zone: ",e.zone_id," "),r.a.createElement("p",null,"Coord. ",e.stop_lat," N ",e.stop_lon," E "),this.props.isLoggedIn?this.state.isFave?r.a.createElement(y.a,{onClick:this.handleLike,variant:"outline-danger",style:{backgroundColor:"pink"}},"Remove from favourites?"):r.a.createElement(y.a,{onClick:this.handleLike,variant:"outline-success"}," Not fave, wanna save? "):r.a.createElement(m.b,{to:"/login"},"Log in to save this stop to favourites ")))}}]),n}(a.Component)));var J=I((function(e){console.log("props :>> ",e);var t=e.exact,n=e.path,a=e.component,o=e.isLoggedIn,s=a;return r.a.createElement(f.b,{exact:t,path:n,render:function(e){return o?r.a.createElement(f.a,{to:"/private"}):o?void 0:r.a.createElement(s,e)}})}));var V=I((function(e){console.log("props :>> ",e);var t=e.exact,n=e.path,a=e.component,o=e.isLoggedIn,s=a;return r.a.createElement(f.b,{exact:t,path:n,render:function(e){return o?r.a.createElement(s,e):o?void 0:r.a.createElement(f.a,{to:"/login"})}})})),K=function(e){Object(g.a)(n,e);var t=Object(v.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(D,null),r.a.createElement(f.d,null,r.a.createElement(f.b,{exact:!0,path:"/",component:N}),r.a.createElement(J,{exact:!0,path:"/signup",component:H}),r.a.createElement(J,{exact:!0,path:"/login",component:W}),r.a.createElement(f.b,{exact:!0,path:"/stops/:id",component:B}),r.a.createElement(V,{exact:!0,path:"/private",component:X})))}}]),n}(a.Component),Y=(n(92),Object(l.b)(p,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));s.a.render(r.a.createElement(c.a,{store:Y},r.a.createElement(m.a,null,r.a.createElement(_,null,r.a.createElement(K,null)))),document.getElementById("root"))}},[[63,1,2]]]);
//# sourceMappingURL=main.e72c0f4f.chunk.js.map