import{S as t,i as s,s as a,v as e,j as n,G as o,a6 as i,n as r,w as l,k as c,l as u,H as h,x as m,p,A as f,I as d,M as v}from"./client.b8b6a864.js";function j(t){let s,a,j,x,H,b,g=t[0].title+"",w=t[0].html+"";return document.title=s=t[0].title,{c(){a=e(),j=n("h1"),x=o(g),H=e(),b=n("div"),this.h()},l(t){i('[data-svelte="svelte-1uty71u"]',document.head).forEach(r),a=l(t),j=c(t,"H1",{});var s=u(j);x=h(s,g),s.forEach(r),H=l(t),b=c(t,"DIV",{class:!0}),u(b).forEach(r),this.h()},h(){m(b,"class","content svelte-emm3f3")},m(t,s){p(t,a,s),p(t,j,s),f(j,x),p(t,H,s),p(t,b,s),b.innerHTML=w},p(t,[a]){1&a&&s!==(s=t[0].title)&&(document.title=s),1&a&&g!==(g=t[0].title+"")&&d(x,g),1&a&&w!==(w=t[0].html+"")&&(b.innerHTML=w)},i:v,o:v,d(t){t&&r(a),t&&r(j),t&&r(H),t&&r(b)}}}async function x({params:t}){const s=await this.fetch(`blog/${t.slug}.json`),a=await s.json();if(200===s.status)return{post:a};this.error(s.status,a.message)}function H(t,s,a){let{post:e}=s;return t.$$set=t=>{"post"in t&&a(0,e=t.post)},[e]}export default class extends t{constructor(t){super(),s(this,t,H,j,a,{post:0})}}export{x as preload};
