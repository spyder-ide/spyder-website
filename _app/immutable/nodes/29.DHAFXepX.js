import{s as W,o as X,n as q}from"../chunks/scheduler.CZFVEtgY.js";import{S as Y,i as Z,e as b,s as L,c as x,f as B,h as P,d as _,a as v,b as g,j as y,t as w,k as T,l as k,g as E,m as j,n as tt,o as A,p as z,q as G,r as N,u as M,v as S,w as et}from"../chunks/index.DjvOVdNM.js";import{e as R,B as Q}from"../chunks/Button.Bc5NNSmk.js";import{r as H}from"../chunks/index.CXB4hq09.js";import{L as lt}from"../chunks/Loader.CgdetROw.js";function F(m,e,n){const l=m.slice();return l[7]=e[n],l}function nt(m){let e,n;return e=new lt({}),{c(){A(e.$$.fragment)},l(l){z(e.$$.fragment,l)},m(l,r){G(e,l,r),n=!0},p:q,i(l){n||(k(e.$$.fragment,l),n=!0)},o(l){w(e.$$.fragment,l),n=!1},d(l){N(e,l)}}}function rt(m){let e,n="Download started…",l,r,c,i,h,a,u,t,o=`If the download does not start automatically, please click the button
      below`,s,d,$,V,C,O=`Alternatively, you can manually select the package you want from the links
      below, or visit our <a href="https://github.com/spyder-ide/spyder/releases" target="_blank">releases page</a> on GitHub.`,I;return $=new Q({props:{highlight:!0,text:"Download for "+m[1],icon:m[0],href:m[2],target:"_blank",rel:"noopener noreferrer"}}),{c(){e=b("h1"),e.textContent=n,l=L(),r=b("h2"),c=M("Detected "),i=b("span"),h=M(m[1]),a=M(" or compatible"),u=L(),t=b("p"),t.textContent=o,s=L(),d=b("div"),A($.$$.fragment),V=L(),C=b("p"),C.innerHTML=O,this.h()},l(f){e=x(f,"H1",{class:!0,"data-svelte-h":!0}),E(e)!=="svelte-idj4d1"&&(e.textContent=n),l=P(f),r=x(f,"H2",{class:!0});var p=B(r);c=S(p,"Detected "),i=x(p,"SPAN",{class:!0});var D=B(i);h=S(D,m[1]),D.forEach(_),a=S(p," or compatible"),p.forEach(_),u=P(f),t=x(f,"P",{class:!0,"data-svelte-h":!0}),E(t)!=="svelte-azqad0"&&(t.textContent=o),s=P(f),d=x(f,"DIV",{class:!0});var U=B(d);z($.$$.fragment,U),U.forEach(_),V=P(f),C=x(f,"P",{class:!0,"data-svelte-h":!0}),E(C)!=="svelte-9ofbyu"&&(C.innerHTML=O),this.h()},h(){v(e,"class","text-center text-4xl font-extralight mb-16"),v(i,"class","text-red-berry-900"),v(r,"class","text-center text-2xl font-light mb-4"),v(t,"class","text-sm text-neutral-500 text-center"),v(d,"class","block my-6 text-center"),v(C,"class","text-sm text-neutral-500 text-center")},m(f,p){g(f,e,p),g(f,l,p),g(f,r,p),y(r,c),y(r,i),y(i,h),y(r,a),g(f,u,p),g(f,t,p),g(f,s,p),g(f,d,p),G($,d,null),g(f,V,p),g(f,C,p),I=!0},p(f,p){(!I||p&2)&&et(h,f[1]);const D={};p&2&&(D.text="Download for "+f[1]),p&1&&(D.icon=f[0]),p&4&&(D.href=f[2]),$.$set(D)},i(f){I||(k($.$$.fragment,f),I=!0)},o(f){w($.$$.fragment,f),I=!1},d(f){f&&(_(e),_(l),_(r),_(u),_(t),_(s),_(d),_(V),_(C)),N($)}}}function st(m){let e,n="Please select the package you want from the links below",l,r,c='Or visit our <a href="https://github.com/spyder-ide/spyder/releases">releases page</a> on GitHub.';return{c(){e=b("h1"),e.textContent=n,l=L(),r=b("p"),r.innerHTML=c,this.h()},l(i){e=x(i,"H1",{class:!0,"data-svelte-h":!0}),E(e)!=="svelte-1ccltz"&&(e.textContent=n),l=P(i),r=x(i,"P",{class:!0,"data-svelte-h":!0}),E(r)!=="svelte-1bqlxwu"&&(r.innerHTML=c),this.h()},h(){v(e,"class","text-4xl font-extralight text-center"),v(r,"class","text-sm text-neutral-500 text-center mt-4")},m(i,h){g(i,e,h),g(i,l,h),g(i,r,h)},p:q,i:q,o:q,d(i){i&&(_(e),_(l),_(r))}}}function J(m){let e,n,l="Available for",r,c,i,h=R(m[3]),a=[];for(let t=0;t<h.length;t+=1)a[t]=K(F(m,h,t));const u=t=>w(a[t],1,1,()=>{a[t]=null});return{c(){e=b("div"),n=b("div"),n.textContent=l,r=L(),c=b("div");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=x(t,"DIV",{class:!0});var o=B(e);n=x(o,"DIV",{class:!0,"data-svelte-h":!0}),E(n)!=="svelte-kl1sqc"&&(n.textContent=l),r=P(o),c=x(o,"DIV",{class:!0});var s=B(c);for(let d=0;d<a.length;d+=1)a[d].l(s);s.forEach(_),o.forEach(_),this.h()},h(){v(n,"class","text-neutral-500 text-sm font-medium mt-4 text-center"),v(c,"class","mx-auto max-w-md mt-4 mb-5 grid grid-cols-1 xl:grid-cols-2 items-center justify-center gap-4"),v(e,"class","border-t border-t-mine-shaft-300 dark:border-t-mine-shaft-600 mt-8")},m(t,o){g(t,e,o),y(e,n),y(e,r),y(e,c);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(c,null);i=!0},p(t,o){if(o&8){h=R(t[3]);let s;for(s=0;s<h.length;s+=1){const d=F(t,h,s);a[s]?(a[s].p(d,o),k(a[s],1)):(a[s]=K(d),a[s].c(),k(a[s],1),a[s].m(c,null))}for(j(),s=h.length;s<a.length;s+=1)u(s);T()}},i(t){if(!i){for(let o=0;o<h.length;o+=1)k(a[o]);i=!0}},o(t){a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)w(a[o]);i=!1},d(t){t&&_(e),tt(a,t)}}}function K(m){let e,n;return e=new Q({props:{highlight:m[7].highlight,icon:m[7].icon,text:m[7].text,href:m[7].href}}),{c(){A(e.$$.fragment)},l(l){z(e.$$.fragment,l)},m(l,r){G(e,l,r),n=!0},p(l,r){const c={};r&8&&(c.highlight=l[7].highlight),r&8&&(c.icon=l[7].icon),r&8&&(c.text=l[7].text),r&8&&(c.href=l[7].href),e.$set(c)},i(l){n||(k(e.$$.fragment,l),n=!0)},o(l){w(e.$$.fragment,l),n=!1},d(l){N(e,l)}}}function ot(m){let e,n,l,r,c;const i=[st,rt,nt],h=[];function a(t,o){return!t[0]||!H[t[0]]?0:t[0]!=="unknown"?1:2}n=a(m),l=h[n]=i[n](m);let u=m[3]&&J(m);return{c(){e=b("div"),l.c(),r=L(),u&&u.c(),this.h()},l(t){e=x(t,"DIV",{class:!0});var o=B(e);l.l(o),r=P(o),u&&u.l(o),o.forEach(_),this.h()},h(){v(e,"class","download container max-w-2xl mt-32")},m(t,o){g(t,e,o),h[n].m(e,null),y(e,r),u&&u.m(e,null),c=!0},p(t,[o]){let s=n;n=a(t),n===s?h[n].p(t,o):(j(),w(h[s],1,1,()=>{h[s]=null}),T(),l=h[n],l?l.p(t,o):(l=h[n]=i[n](t),l.c()),k(l,1),l.m(e,r)),t[3]?u?(u.p(t,o),o&8&&k(u,1)):(u=J(t),u.c(),k(u,1),u.m(e,null)):u&&(j(),w(u,1,1,()=>{u=null}),T())},i(t){c||(k(l),k(u),c=!0)},o(t){w(l),w(u),c=!1},d(t){t&&_(e),h[n].d(),u&&u.d()}}}function at(m,e,n){let l,r,c,i,h,a=t=>{const o=[];for(let s in t)for(let d in t[s])t[s][d]&&(n(1,c=t[s][d].name),n(2,i=t[s][d].link),o.push({highlight:!0,icon:s,text:c,href:i}));return o},u=()=>{const t=new URLSearchParams(window.location.search);t&&(n(0,r=t.get("os")),l=t.get("arch"),!(!r||!H[r]||!H[r][l])&&(H[r][l]&&(n(1,c=H[r][l].name),n(2,i=H[r][l].link)),i&&(window.location=i)))};return X(()=>{u(),n(3,h=a(H))}),[r,c,i,h]}class mt extends Y{constructor(e){super(),Z(this,e,at,ot,W,{})}}export{mt as component};
