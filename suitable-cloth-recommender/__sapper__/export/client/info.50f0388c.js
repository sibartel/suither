import{S as t,i as a,s as e,X as s,v as r,Z as o,a0 as n,n as c,w as l,p as i,Y as h,t as u,b as m,j as d,G as f,k as p,l as b,H as k,o as g,A as $,M as v,c as w,a as y,m as E,d as j}from"./client.043f108f.js";import{R as x,P}from"./recommender.954adb1e.js";function C(t){let a,e,s=t[2].message+"";return{c(){a=d("p"),e=f(s),this.h()},l(t){a=p(t,"P",{style:!0});var r=b(a);e=k(r,s),r.forEach(c),this.h()},h(){g(a,"color","red")},m(t,s){i(t,a,s),$(a,e)},p:v,i:v,o:v,d(t){t&&c(a)}}}function N(t){let a,e,s,r=JSON.stringify(t[1],null,2)+"";return{c(){a=d("pre"),e=d("code"),s=f(r),this.h()},l(t){a=p(t,"PRE",{});var o=b(a);e=p(o,"CODE",{style:!0});var n=b(e);s=k(n,r),n.forEach(c),o.forEach(c),this.h()},h(){g(e,"display","block"),g(e,"white-space","pre-wrap")},m(t,r){i(t,a,r),$(a,e),$(e,s)},p:v,i:v,o:v,d(t){t&&c(a)}}}function O(t){let a,e;return a=new P({props:{indeterminate:!0,color:"primary"}}),{c(){w(a.$$.fragment)},l(t){y(a.$$.fragment,t)},m(t,s){E(a,t,s),e=!0},p:v,i(t){e||(u(a.$$.fragment,t),e=!0)},o(t){m(a.$$.fragment,t),e=!1},d(t){j(a,t)}}}function R(t){let a,e,d,f={ctx:t,current:null,token:null,hasCatch:!0,pending:O,then:N,catch:C,value:1,error:2,blocks:[,,,]};return s(t[0],f),{c(){a=r(),e=o(),f.block.c(),this.h()},l(t){n('[data-svelte="svelte-1ptbtdw"]',document.head).forEach(c),a=l(t),e=o(),f.block.l(t),this.h()},h(){document.title="Info"},m(t,s){i(t,a,s),i(t,e,s),f.block.m(t,f.anchor=s),f.mount=()=>e.parentNode,f.anchor=e,d=!0},p(a,[e]){h(f,t=a,e)},i(t){d||(u(f.block),d=!0)},o(t){for(let t=0;t<3;t+=1){const a=f.blocks[t];m(a)}d=!1},d(t){t&&c(a),t&&c(e),f.block.d(t),f.token=null,f=null}}}function S(t){return[x.get().then((async t=>await t.model_status()),console.error)]}export default class extends t{constructor(t){super(),a(this,t,S,R,e,{})}}
