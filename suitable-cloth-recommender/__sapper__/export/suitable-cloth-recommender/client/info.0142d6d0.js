import{S as t,i as a,s,X as e,v as r,Z as o,a0 as n,n as c,w as l,p as i,Y as h,t as u,b as m,j as d,G as p,k as f,l as k,H as b,o as g,A as $,M as v,c as w,a as y,m as E,d as j}from"./client.09985990.js";import{R as x,P}from"./recommender.468aa1df.js";function C(t){let a,s,e=t[2].message+"";return{c(){a=d("p"),s=p(e),this.h()},l(t){a=f(t,"P",{style:!0});var r=k(a);s=b(r,e),r.forEach(c),this.h()},h(){g(a,"color","red")},m(t,e){i(t,a,e),$(a,s)},p:v,i:v,o:v,d(t){t&&c(a)}}}function N(t){let a,s,e,r=JSON.stringify(t[1],null,2)+"";return{c(){a=d("pre"),s=d("code"),e=p(r),this.h()},l(t){a=f(t,"PRE",{});var o=k(a);s=f(o,"CODE",{style:!0});var n=k(s);e=b(n,r),n.forEach(c),o.forEach(c),this.h()},h(){g(s,"display","block"),g(s,"white-space","pre-wrap")},m(t,r){i(t,a,r),$(a,s),$(s,e)},p:v,i:v,o:v,d(t){t&&c(a)}}}function O(t){let a,s;return a=new P({props:{indeterminate:!0,color:"primary"}}),{c(){w(a.$$.fragment)},l(t){y(a.$$.fragment,t)},m(t,e){E(a,t,e),s=!0},p:v,i(t){s||(u(a.$$.fragment,t),s=!0)},o(t){m(a.$$.fragment,t),s=!1},d(t){j(a,t)}}}function R(t){let a,s,d,p={ctx:t,current:null,token:null,hasCatch:!0,pending:O,then:N,catch:C,value:1,error:2,blocks:[,,,]};return e(t[0],p),{c(){a=r(),s=o(),p.block.c(),this.h()},l(t){n('[data-svelte="svelte-1ptbtdw"]',document.head).forEach(c),a=l(t),s=o(),p.block.l(t),this.h()},h(){document.title="Info"},m(t,e){i(t,a,e),i(t,s,e),p.block.m(t,p.anchor=e),p.mount=()=>s.parentNode,p.anchor=s,d=!0},p(a,[s]){h(p,t=a,s)},i(t){d||(u(p.block),d=!0)},o(t){for(let t=0;t<3;t+=1){const a=p.blocks[t];m(a)}d=!1},d(t){t&&c(a),t&&c(s),p.block.d(t),p.token=null,p=null}}}function S(t){return[x.get().then((async t=>await t.model_status()),console.error)]}export default class extends t{constructor(t){super(),a(this,t,S,R,s,{})}}
