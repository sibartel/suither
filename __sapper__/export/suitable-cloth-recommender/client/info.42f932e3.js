import{S as a,i as e,s as t,_ as r,v as s,U as o,a5 as n,n as l,w as c,p as h,$ as i,t as f,b as m,a0 as p,j as d,G as u,k as $,l as g,H as b,o as k,A as E,M as v,c as y,a as w,m as S,I as D,d as O,a1 as N}from"./client.c4be40c3.js";import{R as P,D as j,P as x}from"./recommender.d66ef4de.js";function C(a){let e,t,r=a[3].message+"";return{c(){e=d("p"),t=u(r),this.h()},l(a){e=$(a,"P",{style:!0});var s=g(e);t=b(s,r),s.forEach(l),this.h()},h(){k(e,"color","red")},m(a,r){h(a,e,r),E(e,t)},p:v,i:v,o:v,d(a){a&&l(e)}}}function H(a){let e,t,r,o,n,i,p,v,N,P,x,C,H,J,M,R,U=JSON.stringify(a[2],null,2)+"",I=JSON.stringify(a[0],null,2)+"";return v=new j({props:{class:"mt-6 mb-4"}}),{c(){e=d("h4"),t=u("User Model"),r=s(),o=d("pre"),n=d("code"),i=u(U),p=s(),y(v.$$.fragment),N=s(),P=d("h4"),x=u("Data Store"),C=s(),H=d("pre"),J=d("code"),M=u(I),this.h()},l(a){e=$(a,"H4",{});var s=g(e);t=b(s,"User Model"),s.forEach(l),r=c(a),o=$(a,"PRE",{});var h=g(o);n=$(h,"CODE",{style:!0});var f=g(n);i=b(f,U),f.forEach(l),h.forEach(l),p=c(a),w(v.$$.fragment,a),N=c(a),P=$(a,"H4",{});var m=g(P);x=b(m,"Data Store"),m.forEach(l),C=c(a),H=$(a,"PRE",{});var d=g(H);J=$(d,"CODE",{style:!0});var u=g(J);M=b(u,I),u.forEach(l),d.forEach(l),this.h()},h(){k(n,"display","block"),k(n,"white-space","pre-wrap"),k(J,"display","block"),k(J,"white-space","pre-wrap")},m(a,s){h(a,e,s),E(e,t),h(a,r,s),h(a,o,s),E(o,n),E(n,i),h(a,p,s),S(v,a,s),h(a,N,s),h(a,P,s),E(P,x),h(a,C,s),h(a,H,s),E(H,J),E(J,M),R=!0},p(a,e){(!R||1&e)&&I!==(I=JSON.stringify(a[0],null,2)+"")&&D(M,I)},i(a){R||(f(v.$$.fragment,a),R=!0)},o(a){m(v.$$.fragment,a),R=!1},d(a){a&&l(e),a&&l(r),a&&l(o),a&&l(p),O(v,a),a&&l(N),a&&l(P),a&&l(C),a&&l(H)}}}function J(a){let e,t;return e=new x({props:{indeterminate:!0,color:"primary"}}),{c(){y(e.$$.fragment)},l(a){w(e.$$.fragment,a)},m(a,r){S(e,a,r),t=!0},p:v,i(a){t||(f(e.$$.fragment,a),t=!0)},o(a){m(e.$$.fragment,a),t=!1},d(a){O(e,a)}}}function M(a){let e,t,p,d={ctx:a,current:null,token:null,hasCatch:!0,pending:J,then:H,catch:C,value:2,error:3,blocks:[,,,]};return r(a[1],d),{c(){e=s(),t=o(),d.block.c(),this.h()},l(a){n('[data-svelte="svelte-1ptbtdw"]',document.head).forEach(l),e=c(a),t=o(),d.block.l(a),this.h()},h(){document.title="Info"},m(a,r){h(a,e,r),h(a,t,r),d.block.m(a,d.anchor=r),d.mount=()=>t.parentNode,d.anchor=t,p=!0},p(e,[t]){i(d,a=e,t)},i(a){p||(f(d.block),p=!0)},o(a){for(let a=0;a<3;a+=1){const e=d.blocks[a];m(e)}p=!1},d(a){a&&l(e),a&&l(t),d.block.d(a),d.token=null,d=null}}}function R(a,e,t){let r;p(a,N,(a=>t(0,r=a)));let s=P.get().then((async a=>await a.model_status()),console.error);return[r,s]}export default class extends a{constructor(a){super(),e(this,a,R,M,t,{})}}