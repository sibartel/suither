import{S as t,i as a,s as e,a1 as s,v as r,X as o,a4 as n,n as c,w as l,p as i,a2 as h,t as d,b as u,j as m,G as p,k as f,l as b,H as k,o as g,A as $,M as v,c as w,a as y,m as E,d as j}from"./client.bc167d55.js";import{R as x,P}from"./recommender.36dc2d8e.js";function C(t){let a,e,s=t[2].message+"";return{c(){a=m("p"),e=p(s),this.h()},l(t){a=f(t,"P",{style:!0});var r=b(a);e=k(r,s),r.forEach(c),this.h()},h(){g(a,"color","red")},m(t,s){i(t,a,s),$(a,e)},p:v,i:v,o:v,d(t){t&&c(a)}}}function N(t){let a,e,s,r=JSON.stringify(t[1],null,2)+"";return{c(){a=m("pre"),e=m("code"),s=p(r),this.h()},l(t){a=f(t,"PRE",{});var o=b(a);e=f(o,"CODE",{style:!0});var n=b(e);s=k(n,r),n.forEach(c),o.forEach(c),this.h()},h(){g(e,"display","block"),g(e,"white-space","pre-wrap")},m(t,r){i(t,a,r),$(a,e),$(e,s)},p:v,i:v,o:v,d(t){t&&c(a)}}}function O(t){let a,e;return a=new P({props:{indeterminate:!0,color:"primary"}}),{c(){w(a.$$.fragment)},l(t){y(a.$$.fragment,t)},m(t,s){E(a,t,s),e=!0},p:v,i(t){e||(d(a.$$.fragment,t),e=!0)},o(t){u(a.$$.fragment,t),e=!1},d(t){j(a,t)}}}function R(t){let a,e,m,p={ctx:t,current:null,token:null,hasCatch:!0,pending:O,then:N,catch:C,value:1,error:2,blocks:[,,,]};return s(t[0],p),{c(){a=r(),e=o(),p.block.c(),this.h()},l(t){n('[data-svelte="svelte-1ptbtdw"]',document.head).forEach(c),a=l(t),e=o(),p.block.l(t),this.h()},h(){document.title="Info"},m(t,s){i(t,a,s),i(t,e,s),p.block.m(t,p.anchor=s),p.mount=()=>e.parentNode,p.anchor=e,m=!0},p(a,[e]){h(p,t=a,e)},i(t){m||(d(p.block),m=!0)},o(t){for(let t=0;t<3;t+=1){const a=p.blocks[t];u(a)}m=!1},d(t){t&&c(a),t&&c(e),p.block.d(t),p.token=null,p=null}}}function S(t){return[x.get().then((async t=>await t.model_status()),console.error)]}export default class extends t{constructor(t){super(),a(this,t,S,R,e,{})}}