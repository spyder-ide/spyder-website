import{s as st,c as ft,n as G,b as J}from"./environment.CRt8ewUf.js";import{S as ot,i as nt,e as k,s as A,c as P,a as w,f as L,d as _,q as g,g as j,h as m,n as I,k as K,l as $,m as Q,o as S,p as q,r as T,u as H,t as D,b as V,j as R,w as ut}from"./index.C9E1geTY.js";import{h as X,u as ct}from"./await_block.DpuJlPgE.js";import{e as Y}from"./Icon.BftDAvcY.js";import{b as C}from"./entry.C55M8UOU.js";import{p as mt}from"./stores.B3BOPT7w.js";import{M as ht,b as O,g as gt,m as _t,t as dt,d as pt,k as bt,a as vt,e as kt,h as Pt,s as Z,i as x}from"./30.D_aDrg9a.js";import{L as Et}from"./Loader.Bsal3PKG.js";import{B as it}from"./Button.Ryl7Jldq.js";function tt(n){let t,l;return t=new it({props:{icon:"chevronLeft",href:C+"/"+n[2]+"/"+(n[0]-1),text:"Previous",iconPosition:"left",highlight:!0}}),{c(){S(t.$$.fragment)},l(e){q(t.$$.fragment,e)},m(e,r){T(t,e,r),l=!0},p(e,r){const o={};r&5&&(o.href=C+"/"+e[2]+"/"+(e[0]-1)),t.$set(o)},i(e){l||(I(t.$$.fragment,e),l=!0)},o(e){$(t.$$.fragment,e),l=!1},d(e){H(t,e)}}}function et(n){let t,l;return t=new it({props:{icon:"chevronRight",href:C+"/"+n[2]+"/"+(n[0]+1),text:"Next",iconPosition:"right",highlight:!0}}),{c(){S(t.$$.fragment)},l(e){q(t.$$.fragment,e)},m(e,r){T(t,e,r),l=!0},p(e,r){const o={};r&5&&(o.href=C+"/"+e[2]+"/"+(e[0]+1)),t.$set(o)},i(e){l||(I(t.$$.fragment,e),l=!0)},o(e){$(t.$$.fragment,e),l=!1},d(e){H(t,e)}}}function wt(n){let t,l,e,r=n[0]>1&&tt(n),o=n[0]<n[1]&&et(n);return{c(){t=k("nav"),r&&r.c(),l=A(),o&&o.c(),this.h()},l(a){t=P(a,"NAV",{class:!0});var s=w(t);r&&r.l(s),l=L(s),o&&o.l(s),s.forEach(_),this.h()},h(){g(t,"class","flex items-center justify-evenly m-16")},m(a,s){j(a,t,s),r&&r.m(t,null),m(t,l),o&&o.m(t,null),e=!0},p(a,[s]){a[0]>1?r?(r.p(a,s),s&1&&I(r,1)):(r=tt(a),r.c(),I(r,1),r.m(t,l)):r&&(K(),$(r,1,1,()=>{r=null}),Q()),a[0]<a[1]?o?(o.p(a,s),s&3&&I(o,1)):(o=et(a),o.c(),I(o,1),o.m(t,null)):o&&(K(),$(o,1,1,()=>{o=null}),Q())},i(a){e||(I(r),I(o),e=!0)},o(a){$(r),$(o),e=!1},d(a){a&&_(t),r&&r.d(),o&&o.d()}}}function Mt(n,t,l){let{pageNum:e}=t,{totalPages:r}=t,{route:o}=t;return n.$$set=a=>{"pageNum"in a&&l(0,e=a.pageNum),"totalPages"in a&&l(1,r=a.totalPages),"route"in a&&l(2,o=a.route)},[e,r,o]}class Nt extends ot{constructor(t){super(),nt(this,t,Mt,wt,st,{pageNum:0,totalPages:1,route:2})}}function at(n,t,l){const e=n.slice();return e[8]=t[l],e}function It(n){let t,l,e=n[11].message+"",r;return{c(){t=k("p"),l=D("Error loading posts: "),r=D(e)},l(o){t=P(o,"P",{});var a=w(t);l=V(a,"Error loading posts: "),r=V(a,e),a.forEach(_)},m(o,a){j(o,t,a),m(t,l),m(t,r)},p(o,a){a&4&&e!==(e=o[11].message+"")&&R(r,e)},i:G,o:G,d(o){o&&_(t)}}}function At(n){let t,l,e,r,o=Y(n[7]),a=[];for(let s=0;s<o.length;s+=1)a[s]=rt(at(n,o,s));return e=new Nt({props:{pageNum:n[0],totalPages:n[1],route:"blog"}}),{c(){t=k("div");for(let s=0;s<a.length;s+=1)a[s].c();l=A(),S(e.$$.fragment),this.h()},l(s){t=P(s,"DIV",{class:!0});var u=w(t);for(let c=0;c<a.length;c+=1)a[c].l(u);u.forEach(_),l=L(s),q(e.$$.fragment,s),this.h()},h(){g(t,"class","grid grid-flow-row gap-24")},m(s,u){j(s,t,u);for(let c=0;c<a.length;c+=1)a[c]&&a[c].m(t,null);j(s,l,u),T(e,s,u),r=!0},p(s,u){if(u&4){o=Y(s[7]);let i;for(i=0;i<o.length;i+=1){const f=at(s,o,i);a[i]?a[i].p(f,u):(a[i]=rt(f),a[i].c(),a[i].m(t,null))}for(;i<a.length;i+=1)a[i].d(1);a.length=o.length}const c={};u&1&&(c.pageNum=s[0]),u&2&&(c.totalPages=s[1]),e.$set(c)},i(s){r||(I(e.$$.fragment,s),r=!0)},o(s){$(e.$$.fragment,s),r=!1},d(s){s&&(_(t),_(l)),ut(a,s),H(e,s)}}}function lt(n){let t,l,e,r,o,a,s,u=n[8].authorMetadata.name+"",c,i,f,h,M=x(n[8].meta.pub_date)+"",b;return{c(){t=k("div"),l=k("img"),o=A(),a=k("div"),s=k("p"),c=D(u),i=A(),f=k("small"),h=D("Published on "),b=D(M),this.h()},l(N){t=P(N,"DIV",{class:!0});var v=w(t);l=P(v,"IMG",{class:!0,src:!0,alt:!0}),o=L(v),a=P(v,"DIV",{});var B=w(a);s=P(B,"P",{});var y=w(s);c=V(y,u),y.forEach(_),i=L(B),f=P(B,"SMALL",{});var d=w(f);h=V(d,"Published on "),b=V(d,M),d.forEach(_),B.forEach(_),v.forEach(_),this.h()},h(){g(l,"class","w-12 h-12 rounded-full object-cover bg-white"),J(l.src,e=n[8].authorMetadata.src)||g(l,"src",e),g(l,"alt",r=n[8].authorMetadata.name),g(t,"class","flex gap-4 items-center my-4")},m(N,v){j(N,t,v),m(t,l),m(t,o),m(t,a),m(a,s),m(s,c),m(a,i),m(a,f),m(f,h),m(f,b)},p(N,v){v&4&&!J(l.src,e=N[8].authorMetadata.src)&&g(l,"src",e),v&4&&r!==(r=N[8].authorMetadata.name)&&g(l,"alt",r),v&4&&u!==(u=N[8].authorMetadata.name+"")&&R(c,u),v&4&&M!==(M=x(N[8].meta.pub_date)+"")&&R(b,M)},d(N){N&&_(t)}}}function rt(n){let t,l,e,r=n[8].meta.title+"",o,a,s,u,c,i,f=n[8].meta.summary+"",h,M,b,N,v,B,y,d=n[8].authorMetadata&&lt(n);return{c(){t=k("article"),l=k("h2"),e=k("a"),o=D(r),u=A(),d&&d.c(),c=A(),i=k("p"),h=D(f),M=A(),b=k("a"),N=D("Read More…"),y=A(),this.h()},l(E){t=P(E,"ARTICLE",{});var p=w(t);l=P(p,"H2",{class:!0});var U=w(l);e=P(U,"A",{class:!0,href:!0,title:!0});var W=w(e);o=V(W,r),W.forEach(_),U.forEach(_),u=L(p),d&&d.l(p),c=L(p),i=P(p,"P",{class:!0});var z=w(i);h=V(z,f),z.forEach(_),M=L(p),b=P(p,"A",{class:!0,href:!0,title:!0});var F=w(b);N=V(F,"Read More…"),F.forEach(_),y=L(p),p.forEach(_),this.h()},h(){g(e,"class","post-link"),g(e,"href",a=C+"/blog/"+n[8].path),g(e,"title",s=n[8].meta.title),g(l,"class","text-xl md:text-2xl xl:text-3xl font-light"),g(i,"class","text-gray-700 dark:text-gray-300 font-light"),g(b,"class","block text-right mt-4"),g(b,"href",v=Z+"blog/"+n[8].path),g(b,"title",B=n[8].meta.title)},m(E,p){j(E,t,p),m(t,l),m(l,e),m(e,o),m(t,u),d&&d.m(t,null),m(t,c),m(t,i),m(i,h),m(t,M),m(t,b),m(b,N),m(t,y)},p(E,p){p&4&&r!==(r=E[8].meta.title+"")&&R(o,r),p&4&&a!==(a=C+"/blog/"+E[8].path)&&g(e,"href",a),p&4&&s!==(s=E[8].meta.title)&&g(e,"title",s),E[8].authorMetadata?d?d.p(E,p):(d=lt(E),d.c(),d.m(t,c)):d&&(d.d(1),d=null),p&4&&f!==(f=E[8].meta.summary+"")&&R(h,f),p&4&&v!==(v=Z+"blog/"+E[8].path)&&g(b,"href",v),p&4&&B!==(B=E[8].meta.title)&&g(b,"title",B)},d(E){E&&_(t),d&&d.d()}}}function Lt(n){let t,l;return t=new Et({props:{classes:"fill-black dark:fill-white"}}),{c(){S(t.$$.fragment)},l(e){q(t.$$.fragment,e)},m(e,r){T(t,e,r),l=!0},p:G,i(e){l||(I(t.$$.fragment,e),l=!0)},o(e){$(t.$$.fragment,e),l=!1},d(e){H(t,e)}}}function $t(n){let t,l,e,r,o,a,s,u,c;t=new ht({});let i={ctx:n,current:null,token:null,hasCatch:!0,pending:Lt,then:At,catch:It,value:7,error:11,blocks:[,,,]};return X(u=n[2],i),{c(){S(t.$$.fragment),l=A(),e=k("div"),r=k("h1"),o=D(O),a=A(),s=k("section"),i.block.c(),this.h()},l(f){q(t.$$.fragment,f),l=L(f),e=P(f,"DIV",{class:!0});var h=w(e);r=P(h,"H1",{class:!0});var M=w(r);o=V(M,O),M.forEach(_),a=L(h),s=P(h,"SECTION",{class:!0});var b=w(s);i.block.l(b),b.forEach(_),h.forEach(_),this.h()},h(){g(r,"class","text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32"),g(s,"class","max-w-3xl mx-auto"),g(e,"class","container")},m(f,h){T(t,f,h),j(f,l,h),j(f,e,h),m(e,r),m(r,o),m(e,a),m(e,s),i.block.m(s,i.anchor=null),i.mount=()=>s,i.anchor=null,c=!0},p(f,[h]){n=f,i.ctx=n,h&4&&u!==(u=n[2])&&X(u,i)||ct(i,n,h)},i(f){c||(I(t.$$.fragment,f),I(i.block),c=!0)},o(f){$(t.$$.fragment,f);for(let h=0;h<3;h+=1){const M=i.blocks[h];$(M)}c=!1},d(f){f&&(_(l),_(e)),H(t,f),i.block.d(),i.token=null,i=null}}}function Bt(n,t,l){let e,r;ft(n,mt,i=>l(5,r=i));let{data:o,pageNum:a,totalPages:s}=t,u=[];const c=`@${gt.twitter.split("/").pop()}`;return n.$$set=i=>{"data"in i&&l(3,o=i.data),"pageNum"in i&&l(0,a=i.pageNum),"totalPages"in i&&l(1,s=i.totalPages)},n.$$.update=()=>{n.$$.dirty&32&&_t.setMetadata({title:`${dt} | ${O}`,description:pt,keywords:bt.join(", "),author:vt,image:kt,site:c,url:r.url.href}),n.$$.dirty&8&&l(4,{posts:e,pageNum:a,totalPages:s}=o.props,e,(l(0,a),l(3,o)),(l(1,s),l(3,o))),n.$$.dirty&16&&e&&l(2,u=Promise.all(e.map(async i=>{{const f=await Pt(i.meta.author);return{...i,authorMetadata:f}}})))},[a,s,u,o,e,r]}class Ht extends ot{constructor(t){super(),nt(this,t,Bt,$t,st,{data:3,pageNum:0,totalPages:1})}}export{Ht as B};
