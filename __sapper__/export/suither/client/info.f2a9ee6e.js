import{S as a,i as t,s as e,_ as r,v as s,U as o,a5 as n,n as c,w as l,p as h,$ as i,t as f,b as m,a0 as p,j as d,G as u,k as $,l as g,H as b,o as k,A as E,M as v,c as y,a as w,m as S,I as D,d as O,a1 as N}from"./client.e5cc9c4d.js";import{R as P,D as j,P as x}from"./recommender.792fda05.js";function C(a){let t,e,r=a[3].message+"";return{c(){t=d("p"),e=u(r),this.h()},l(a){t=$(a,"P",{style:!0});var s=g(t);e=b(s,r),s.forEach(c),this.h()},h(){k(t,"color","red")},m(a,r){h(a,t,r),E(t,e)},p:v,i:v,o:v,d(a){a&&c(t)}}}function H(a){let t,e,r,o,n,i,p,v,N,P,x,C,H,J,M,R,U=JSON.stringify(a[2],null,2)+"",I=JSON.stringify(a[0],null,2)+"";return v=new j({props:{class:"mt-6 mb-4"}}),{c(){t=d("h4"),e=u("User Model"),r=s(),o=d("pre"),n=d("code"),i=u(U),p=s(),y(v.$$.fragment),N=s(),P=d("h4"),x=u("Data Store"),C=s(),H=d("pre"),J=d("code"),M=u(I),this.h()},l(a){t=$(a,"H4",{});var s=g(t);e=b(s,"User Model"),s.forEach(c),r=l(a),o=$(a,"PRE",{});var h=g(o);n=$(h,"CODE",{style:!0});var f=g(n);i=b(f,U),f.forEach(c),h.forEach(c),p=l(a),w(v.$$.fragment,a),N=l(a),P=$(a,"H4",{});var m=g(P);x=b(m,"Data Store"),m.forEach(c),C=l(a),H=$(a,"PRE",{});var d=g(H);J=$(d,"CODE",{style:!0});var u=g(J);M=b(u,I),u.forEach(c),d.forEach(c),this.h()},h(){k(n,"display","block"),k(n,"white-space","pre-wrap"),k(J,"display","block"),k(J,"white-space","pre-wrap")},m(a,s){h(a,t,s),E(t,e),h(a,r,s),h(a,o,s),E(o,n),E(n,i),h(a,p,s),S(v,a,s),h(a,N,s),h(a,P,s),E(P,x),h(a,C,s),h(a,H,s),E(H,J),E(J,M),R=!0},p(a,t){(!R||1&t)&&I!==(I=JSON.stringify(a[0],null,2)+"")&&D(M,I)},i(a){R||(f(v.$$.fragment,a),R=!0)},o(a){m(v.$$.fragment,a),R=!1},d(a){a&&c(t),a&&c(r),a&&c(o),a&&c(p),O(v,a),a&&c(N),a&&c(P),a&&c(C),a&&c(H)}}}function J(a){let t,e;return t=new x({props:{indeterminate:!0,color:"primary"}}),{c(){y(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,r){S(t,a,r),e=!0},p:v,i(a){e||(f(t.$$.fragment,a),e=!0)},o(a){m(t.$$.fragment,a),e=!1},d(a){O(t,a)}}}function M(a){let t,e,p,d={ctx:a,current:null,token:null,hasCatch:!0,pending:J,then:H,catch:C,value:2,error:3,blocks:[,,,]};return r(a[1],d),{c(){t=s(),e=o(),d.block.c(),this.h()},l(a){n('[data-svelte="svelte-1ptbtdw"]',document.head).forEach(c),t=l(a),e=o(),d.block.l(a),this.h()},h(){document.title="Info"},m(a,r){h(a,t,r),h(a,e,r),d.block.m(a,d.anchor=r),d.mount=()=>e.parentNode,d.anchor=e,p=!0},p(t,[e]){i(d,a=t,e)},i(a){p||(f(d.block),p=!0)},o(a){for(let a=0;a<3;a+=1){const t=d.blocks[a];m(t)}p=!1},d(a){a&&c(t),a&&c(e),d.block.d(a),d.token=null,d=null}}}function R(a,t,e){let r;p(a,N,(a=>e(0,r=a)));let s=P.get().then((async a=>await a.model_status()),console.error);return[r,s]}export default class extends a{constructor(a){super(),t(this,a,R,M,e,{})}}