(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var o=t(2),c=t(14),r=t.n(c),a=(t(19),t(3)),u=t(4),i=t.n(u),s="http://localhost:3001/api/persons",l=function(){return i.a.get(s).then((function(e){return e.data}))},d=function(e){return i.a.post(s,e).then((function(e){return e.data}))},b=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},f=t(0),h=function(e){var n=e.onChange,t=e.filterName;return Object(f.jsxs)("div",{children:["filter shown with: ",Object(f.jsx)("input",{value:t,onChange:n})]})},m=function(e){var n=e.onSubmit,t=e.onNameChange,o=e.newName,c=e.onNumberChange,r=e.newNumber;return Object(f.jsxs)("form",{onSubmit:n,children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:o,onChange:t})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:r,onChange:c})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},g=function(e){var n=e.personsToShow,t=e.removePerson;return Object(f.jsx)("div",{children:n.map((function(e){return Object(f.jsxs)("p",{children:[e.name," ",e.number,Object(f.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},O=function(e){var n=e.message;if(!n)return null;return Object(f.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},v=function(e){var n=e.message;if(!n)return null;return Object(f.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},p=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1];console.log("render",t.length,"persons"),Object(o.useEffect)((function(){l().then((function(e){c(e)}))}),[]);var r=Object(o.useState)(""),u=Object(a.a)(r,2),i=u[0],s=u[1],p=Object(o.useState)(""),x=Object(a.a)(p,2),w=x[0],S=x[1],C=Object(o.useState)(!0),N=Object(a.a)(C,2),y=N[0],T=N[1],k=Object(o.useState)(""),P=Object(a.a)(k,2),B=P[0],D=P[1],F=Object(o.useState)(),L=Object(a.a)(F,2),I=L[0],z=L[1],A=Object(o.useState)(),E=Object(a.a)(A,2),J=E[0],R=E[1],U=y?t:t.filter((function(e){return e.name.toLowerCase().includes(B.toLowerCase())}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("h1",{children:"Phonebook"}),Object(f.jsx)(O,{message:I}),Object(f.jsx)(v,{message:J}),Object(f.jsxs)("div",{children:[Object(f.jsx)(h,{filterName:B,onChange:function(e){console.log(e.target.value),T(""===e.target.value),D(e.target.value)}}),Object(f.jsx)("h2",{children:"Add a new"}),Object(f.jsx)(m,{onSubmit:function(e){e.preventDefault();var n={name:i,number:w},o=t.find((function(e){return e.name===i}));o?window.confirm(i+" is already added to phonebook, replace the old number with a new one?")&&b(o.id,n).then((function(e){c(t.map((function(n){return n.name!==i?n:e}))),s(""),S(""),R("Updated '".concat(e.name,"'")),setTimeout((function(){R(null)}),3e3)})).catch((function(e){z("Information of '".concat(o.name,"' has already been removed from server")),setTimeout((function(){z(null)}),3e3)})):d(n).then((function(e){c(t.concat(e)),s(""),S(""),R("Added '".concat(e.name,"'")),setTimeout((function(){R(null)}),3e3)})).catch((function(e){z(e.response.data.message),setTimeout((function(){z(null)}),3e3)}))},newName:i,onNameChange:function(e){console.log(e.target.value),s(e.target.value)},newNumber:w,onNumberChange:function(e){console.log(e.target.value),S(e.target.value)}}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(g,{personsToShow:U,removePerson:function(e){window.confirm("Delete "+e.name+"?")&&j(e.id).then((function(){l().then((function(e){c(e)})),R("Deleted '".concat(e.name,"'")),setTimeout((function(){R(null)}),3e3)}))}})]})]})},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(n){var t=n.getCLS,o=n.getFID,c=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),o(e),c(e),r(e),a(e)}))};r.a.render(Object(f.jsx)(p,{}),document.getElementById("root")),x()}},[[39,1,2]]]);
//# sourceMappingURL=main.08734ed9.chunk.js.map