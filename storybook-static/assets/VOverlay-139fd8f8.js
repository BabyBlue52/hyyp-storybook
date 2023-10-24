import{f as W,y as B,j as M,b as P,x as Q,w as le,Y as Se,e as xe,K as V,s as $,o as Fe,r as Oe,_ as Le,d as Be,Z as Re,v as De,A as N,a3 as Ne,D as _e,a1 as Ie,O as He,G as Ve,U as We}from"./vue.esm-bundler-3c3b4f83.js";import{c as se,u as qe,a as ze}from"./locale-eae6cb20.js";import{B as ee,g as fe,n as $e,m as je,a as Ye,M as Ge,s as Ke}from"./forwardRefs-188994b8.js";import{p as ve,f as te,a as ne,b as de,g as me}from"./anchor-a33efd51.js";import{K as ke,M as Pe,b as j,I as q,d as Ue,e as L,z as ye,r as Ze,f as ce,G as Xe,v as Je,w as Qe,l as et,x as tt,u as nt}from"./theme-43348865.js";import{b as ot}from"./color-f66e96d0.js";import{m as at,u as rt,c as it,d as lt}from"./router-e0b4ace3.js";import{u as st}from"./display-34939fad.js";const U=new WeakMap;function ct(e,t){Object.keys(t).forEach(n=>{if(ke(n)){const o=Pe(n),a=U.get(e);if(t[n]==null)a==null||a.forEach(r=>{const[s,l]=r;s===o&&(e.removeEventListener(o,l),a.delete(r))});else if(!a||![...a].some(r=>r[0]===o&&r[1]===t[n])){e.addEventListener(o,t[n]);const r=a||new Set;r.add([o,t[n]]),U.has(e)||U.set(e,r)}}else t[n]==null?e.removeAttribute(n):e.setAttribute(n,t[n])})}function ut(e,t){Object.keys(t).forEach(n=>{if(ke(n)){const o=Pe(n),a=U.get(e);a==null||a.forEach(r=>{const[s,l]=r;s===o&&(e.removeEventListener(o,l),a.delete(r))})}else e.removeAttribute(n)})}function Ce(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const t=e.getRootNode();return t!==document&&t.getRootNode({composed:!0})!==document?null:t}function ft(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(t?vt(e):ue(e))return e;e=e.parentElement}return document.scrollingElement}function X(e,t){const n=[];if(t&&e&&!t.contains(e))return n;for(;e&&(ue(e)&&n.push(e),e!==t);)e=e.parentElement;return n}function ue(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return t.overflowY==="scroll"||t.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function vt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return["scroll","auto"].includes(t.overflowY)}function dt(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function oe(e,t){return{x:e.x+t.x,y:e.y+t.y}}function mt(e,t){return{x:e.x-t.x,y:e.y-t.y}}function ge(e,t){if(e.side==="top"||e.side==="bottom"){const{side:n,align:o}=e,a=o==="left"?0:o==="center"?t.width/2:o==="right"?t.width:o,r=n==="top"?0:n==="bottom"?t.height:n;return oe({x:a,y:r},t)}else if(e.side==="left"||e.side==="right"){const{side:n,align:o}=e,a=n==="left"?0:n==="right"?t.width:n,r=o==="top"?0:o==="center"?t.height/2:o==="bottom"?t.height:o;return oe({x:a,y:r},t)}return oe({x:t.width/2,y:t.height/2},t)}const pe={static:ht,connected:bt},yt=j({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in pe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function gt(e,t){const n=W({}),o=W();q&&(se(()=>!!(t.isActive.value&&e.locationStrategy),r=>{var s,l;M(()=>e.locationStrategy,r),B(()=>{o.value=void 0}),typeof e.locationStrategy=="function"?o.value=(s=e.locationStrategy(t,e,n))==null?void 0:s.updateLocation:o.value=(l=pe[e.locationStrategy](t,e,n))==null?void 0:l.updateLocation}),window.addEventListener("resize",a,{passive:!0}),B(()=>{window.removeEventListener("resize",a),o.value=void 0}));function a(r){var s;(s=o.value)==null||s.call(o,r)}return{contentStyles:n,updateLocation:o}}function ht(){}function wt(e,t){t?e.style.removeProperty("left"):e.style.removeProperty("right");const n=$e(e);return t?n.x+=parseFloat(e.style.right||0):n.x-=parseFloat(e.style.left||0),n.y-=parseFloat(e.style.top||0),n}function bt(e,t,n){dt(e.activatorEl.value)&&Object.assign(n.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:r}=Ue(()=>{const d=ve(t.location,e.isRtl.value),f=t.origin==="overlap"?d:t.origin==="auto"?te(d):ve(t.origin,e.isRtl.value);return d.side===f.side&&d.align===ne(f).align?{preferredAnchor:de(d),preferredOrigin:de(f)}:{preferredAnchor:d,preferredOrigin:f}}),[s,l,c,v]=["minWidth","minHeight","maxWidth","maxHeight"].map(d=>P(()=>{const f=parseFloat(t[d]);return isNaN(f)?1/0:f})),u=P(()=>{if(Array.isArray(t.offset))return t.offset;if(typeof t.offset=="string"){const d=t.offset.split(" ").map(parseFloat);return d.length<2&&d.push(0),d}return typeof t.offset=="number"?[t.offset,0]:[0,0]});let g=!1;const w=new ResizeObserver(()=>{g&&C()});M([e.activatorEl,e.contentEl],(d,f)=>{let[k,O]=d,[b,i]=f;b&&w.unobserve(b),k&&w.observe(k),i&&w.unobserve(i),O&&w.observe(O)},{immediate:!0}),B(()=>{w.disconnect()});function C(){if(g=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>g=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const d=e.activatorEl.value.getBoundingClientRect(),f=wt(e.contentEl.value,e.isRtl.value),k=X(e.contentEl.value),O=12;k.length||(k.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(f.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),f.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const b=k.reduce((S,E)=>{const m=E.getBoundingClientRect(),h=new ee({x:E===document.documentElement?0:m.x,y:E===document.documentElement?0:m.y,width:E.clientWidth,height:E.clientHeight});return S?new ee({x:Math.max(S.left,h.left),y:Math.max(S.top,h.top),width:Math.min(S.right,h.right)-Math.max(S.left,h.left),height:Math.min(S.bottom,h.bottom)-Math.max(S.top,h.top)}):h},void 0);b.x+=O,b.y+=O,b.width-=O*2,b.height-=O*2;let i={anchor:a.value,origin:r.value};function A(S){const E=new ee(f),m=ge(S.anchor,d),h=ge(S.origin,E);let{x:T,y:F}=mt(m,h);switch(S.anchor.side){case"top":F-=u.value[0];break;case"bottom":F+=u.value[0];break;case"left":T-=u.value[0];break;case"right":T+=u.value[0];break}switch(S.anchor.align){case"top":F-=u.value[1];break;case"bottom":F+=u.value[1];break;case"left":T-=u.value[1];break;case"right":T+=u.value[1];break}return E.x+=T,E.y+=F,E.width=Math.min(E.width,c.value),E.height=Math.min(E.height,v.value),{overflows:fe(E,b),x:T,y:F}}let D=0,_=0;const I={x:0,y:0},Y={x:!1,y:!1};let G=-1;for(;!(G++>10);){const{x:S,y:E,overflows:m}=A(i);D+=S,_+=E,f.x+=S,f.y+=E;{const h=me(i.anchor),T=m.x.before||m.x.after,F=m.y.before||m.y.after;let z=!1;if(["x","y"].forEach(x=>{if(x==="x"&&T&&!Y.x||x==="y"&&F&&!Y.y){const y={anchor:{...i.anchor},origin:{...i.origin}},p=x==="x"?h==="y"?ne:te:h==="y"?te:ne;y.anchor=p(y.anchor),y.origin=p(y.origin);const{overflows:H}=A(y);(H[x].before<=m[x].before&&H[x].after<=m[x].after||H[x].before+H[x].after<(m[x].before+m[x].after)/2)&&(i=y,z=Y[x]=!0)}}),z)continue}m.x.before&&(D+=m.x.before,f.x+=m.x.before),m.x.after&&(D-=m.x.after,f.x-=m.x.after),m.y.before&&(_+=m.y.before,f.y+=m.y.before),m.y.after&&(_-=m.y.after,f.y-=m.y.after);{const h=fe(f,b);I.x=b.width-h.x.before-h.x.after,I.y=b.height-h.y.before-h.y.after,D+=h.x.before,f.x+=h.x.before,_+=h.y.before,f.y+=h.y.before}break}const R=me(i.anchor);return Object.assign(n.value,{"--v-overlay-anchor-origin":`${i.anchor.side} ${i.anchor.align}`,transformOrigin:`${i.origin.side} ${i.origin.align}`,top:L(ae(_)),left:e.isRtl.value?void 0:L(ae(D)),right:e.isRtl.value?L(ae(-D)):void 0,minWidth:L(R==="y"?Math.min(s.value,d.width):s.value),maxWidth:L(he(ye(I.x,s.value===1/0?0:s.value,c.value))),maxHeight:L(he(ye(I.y,l.value===1/0?0:l.value,v.value)))}),{available:I,contentBox:f}}return M(()=>[a.value,r.value,t.offset,t.minWidth,t.minHeight,t.maxWidth,t.maxHeight],()=>C()),Q(()=>{const d=C();if(!d)return;const{available:f,contentBox:k}=d;k.height>f.y&&requestAnimationFrame(()=>{C(),requestAnimationFrame(()=>{C()})})}),{updateLocation:C}}function ae(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function he(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let re=!0;const J=[];function Et(e){!re||J.length?(J.push(e),ie()):(re=!1,e(),ie())}let we=-1;function ie(){cancelAnimationFrame(we),we=requestAnimationFrame(()=>{const e=J.shift();e&&e(),J.length?ie():re=!0})}const Z={none:null,close:Ot,block:kt,reposition:Pt},St=j({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Z}},"VOverlay-scroll-strategies");function xt(e,t){if(!q)return;let n;le(async()=>{n==null||n.stop(),t.isActive.value&&e.scrollStrategy&&(n=Se(),await Q(),n.active&&n.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(t,e,n):(o=Z[e.scrollStrategy])==null||o.call(Z,t,e,n)}))}),B(()=>{n==null||n.stop()})}function Ot(e){function t(n){e.isActive.value=!1}Ae(e.activatorEl.value??e.contentEl.value,t)}function kt(e,t){var s;const n=(s=e.root.value)==null?void 0:s.offsetParent,o=[...new Set([...X(e.activatorEl.value,t.contained?n:void 0),...X(e.contentEl.value,t.contained?n:void 0)])].filter(l=>!l.classList.contains("v-overlay-scroll-blocked")),a=window.innerWidth-document.documentElement.offsetWidth,r=(l=>ue(l)&&l)(n||document.documentElement);r&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((l,c)=>{l.style.setProperty("--v-body-scroll-x",L(-l.scrollLeft)),l.style.setProperty("--v-body-scroll-y",L(-l.scrollTop)),l!==document.documentElement&&l.style.setProperty("--v-scrollbar-offset",L(a)),l.classList.add("v-overlay-scroll-blocked")}),B(()=>{o.forEach((l,c)=>{const v=parseFloat(l.style.getPropertyValue("--v-body-scroll-x")),u=parseFloat(l.style.getPropertyValue("--v-body-scroll-y"));l.style.removeProperty("--v-body-scroll-x"),l.style.removeProperty("--v-body-scroll-y"),l.style.removeProperty("--v-scrollbar-offset"),l.classList.remove("v-overlay-scroll-blocked"),l.scrollLeft=-v,l.scrollTop=-u}),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Pt(e,t,n){let o=!1,a=-1,r=-1;function s(l){Et(()=>{var u,g;const c=performance.now();(g=(u=e.updateLocation).value)==null||g.call(u,l),o=(performance.now()-c)/(1e3/60)>2})}r=(typeof requestIdleCallback>"u"?l=>l():requestIdleCallback)(()=>{n.run(()=>{Ae(e.activatorEl.value??e.contentEl.value,l=>{o?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{s(l)})})):s(l)})})}),B(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(r),cancelAnimationFrame(a)})}function Ae(e,t){const n=[document,...X(e)];n.forEach(o=>{o.addEventListener("scroll",t,{passive:!0})}),B(()=>{n.forEach(o=>{o.removeEventListener("scroll",t)})})}const Ct=Symbol.for("vuetify:v-menu"),pt=j({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function At(e,t){const n={},o=a=>()=>{if(!q)return Promise.resolve(!0);const r=a==="openDelay";return n.closeDelay&&window.clearTimeout(n.closeDelay),delete n.closeDelay,n.openDelay&&window.clearTimeout(n.openDelay),delete n.openDelay,new Promise(s=>{const l=parseInt(e[a]??0,10);n[a]=window.setTimeout(()=>{t==null||t(r),s(r)},l)})};return{runCloseDelay:o("closeDelay"),runOpenDelay:o("openDelay")}}const Tt=j({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...pt()},"VOverlay-activator");function Mt(e,t){let{isActive:n,isTop:o}=t;const a=W();let r=!1,s=!1,l=!0;const c=P(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),v=P(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!c.value),{runOpenDelay:u,runCloseDelay:g}=At(e,i=>{i===(e.openOnHover&&r||c.value&&s)&&!(e.openOnHover&&n.value&&!o.value)&&(n.value!==i&&(l=!0),n.value=i)}),w={onClick:i=>{i.stopPropagation(),a.value=i.currentTarget||i.target,n.value=!n.value},onMouseenter:i=>{var A;(A=i.sourceCapabilities)!=null&&A.firesTouchEvents||(r=!0,a.value=i.currentTarget||i.target,u())},onMouseleave:i=>{r=!1,g()},onFocus:i=>{Xe(i.target,":focus-visible")!==!1&&(s=!0,i.stopPropagation(),a.value=i.currentTarget||i.target,u())},onBlur:i=>{s=!1,i.stopPropagation(),g()}},C=P(()=>{const i={};return v.value&&(i.onClick=w.onClick),e.openOnHover&&(i.onMouseenter=w.onMouseenter,i.onMouseleave=w.onMouseleave),c.value&&(i.onFocus=w.onFocus,i.onBlur=w.onBlur),i}),d=P(()=>{const i={};if(e.openOnHover&&(i.onMouseenter=()=>{r=!0,u()},i.onMouseleave=()=>{r=!1,g()}),c.value&&(i.onFocusin=()=>{s=!0,u()},i.onFocusout=()=>{s=!1,g()}),e.closeOnContentClick){const A=xe(Ct,null);i.onClick=()=>{n.value=!1,A==null||A.closeParents()}}return i}),f=P(()=>{const i={};return e.openOnHover&&(i.onMouseenter=()=>{l&&(r=!0,l=!1,u())},i.onMouseleave=()=>{r=!1,g()}),i});M(o,i=>{i&&(e.openOnHover&&!r&&(!c.value||!s)||c.value&&!s&&(!e.openOnHover||!r))&&(n.value=!1)});const k=W();le(()=>{k.value&&Q(()=>{a.value=Ze(k.value)})});const O=ce("useActivator");let b;return M(()=>!!e.activator,i=>{i&&q?(b=Se(),b.run(()=>{Ft(e,O,{activatorEl:a,activatorEvents:C})})):b&&b.stop()},{flush:"post",immediate:!0}),B(()=>{b==null||b.stop()}),{activatorEl:a,activatorRef:k,activatorEvents:C,contentEvents:d,scrimEvents:f}}function Ft(e,t,n){let{activatorEl:o,activatorEvents:a}=n;M(()=>e.activator,(c,v)=>{if(v&&c!==v){const u=l(v);u&&s(u)}c&&Q(()=>r())},{immediate:!0}),M(()=>e.activatorProps,()=>{r()}),B(()=>{s()});function r(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&ct(c,V(a.value,v))}function s(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;c&&ut(c,V(a.value,v))}function l(){var u,g;let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,v;if(c)if(c==="parent"){let w=(g=(u=t==null?void 0:t.proxy)==null?void 0:u.$el)==null?void 0:g.parentNode;for(;w!=null&&w.hasAttribute("data-no-activator");)w=w.parentNode;v=w}else typeof c=="string"?v=document.querySelector(c):"$el"in c?v=c.$el:v=c;return o.value=(v==null?void 0:v.nodeType)===Node.ELEMENT_NODE?v:null,o.value}}function Lt(){if(!q)return $(!1);const{ssr:e}=st();if(e){const t=$(!1);return Fe(()=>{t.value=!0}),t}else return $(!0)}const Bt=j({eager:Boolean},"lazy");function Rt(e,t){const n=$(!1),o=P(()=>n.value||e.eager||t.value);M(t,()=>n.value=!0);function a(){e.eager||(n.value=!1)}return{isBooted:n,hasContent:o,onAfterLeave:a}}function Dt(){const t=ce("useScopeId").vnode.scopeId;return{scopeId:t?{[t]:""}:void 0}}const be=Symbol.for("vuetify:stack"),K=Oe([]);function Nt(e,t,n){const o=ce("useStack"),a=!n,r=xe(be,void 0),s=Oe({activeChildren:new Set});Le(be,s);const l=$(+t.value);se(e,()=>{var g;const u=(g=K.at(-1))==null?void 0:g[1];l.value=u?u+10:+t.value,a&&K.push([o.uid,l.value]),r==null||r.activeChildren.add(o.uid),B(()=>{if(a){const w=Re(K).findIndex(C=>C[0]===o.uid);K.splice(w,1)}r==null||r.activeChildren.delete(o.uid)})});const c=$(!0);a&&le(()=>{var g;const u=((g=K.at(-1))==null?void 0:g[0])===o.uid;setTimeout(()=>c.value=u)});const v=P(()=>!s.activeChildren.size);return{globalTop:Be(c),localTop:v,stackStyles:P(()=>({zIndex:l.value}))}}function _t(e){return{teleportTarget:P(()=>{const n=e.value;if(n===!0||!q)return;const o=n===!1?document.body:typeof n=="string"?document.querySelector(n):n;if(o==null)return;let a=o.querySelector(":scope > .v-overlay-container");return a||(a=document.createElement("div"),a.className="v-overlay-container",o.appendChild(a)),a})}}function It(){return!0}function Te(e,t,n){if(!e||Me(e,n)===!1)return!1;const o=Ce(t);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const a=(typeof n.value=="object"&&n.value.include||(()=>[]))();return a.push(t),!a.some(r=>r==null?void 0:r.contains(e.target))}function Me(e,t){return(typeof t.value=="object"&&t.value.closeConditional||It)(e)}function Ht(e,t,n){const o=typeof n.value=="function"?n.value:n.value.handler;t._clickOutside.lastMousedownWasOutside&&Te(e,t,n)&&setTimeout(()=>{Me(e,n)&&o&&o(e)},0)}function Ee(e,t){const n=Ce(e);t(document),typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&t(n)}const Vt={mounted(e,t){const n=a=>Ht(a,e,t),o=a=>{e._clickOutside.lastMousedownWasOutside=Te(a,e,t)};Ee(e,a=>{a.addEventListener("click",n,!0),a.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:n,onMousedown:o}},unmounted(e,t){e._clickOutside&&(Ee(e,n=>{var r;if(!n||!((r=e._clickOutside)!=null&&r[t.instance.$.uid]))return;const{onClick:o,onMousedown:a}=e._clickOutside[t.instance.$.uid];n.removeEventListener("click",o,!0),n.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[t.instance.$.uid])}};function Wt(e){const{modelValue:t,color:n,...o}=e;return N(We,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&N("div",V({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const qt=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Tt(),...Je(),...at(),...Bt(),...yt(),...St(),...Qe(),...je()},"VOverlay"),Xt=et()({name:"VOverlay",directives:{ClickOutside:Vt},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...qt()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,t){let{slots:n,attrs:o,emit:a}=t;const r=qe(e,"modelValue"),s=P({get:()=>r.value,set:y=>{y&&e.disabled||(r.value=y)}}),{teleportTarget:l}=_t(P(()=>e.attach||e.contained)),{themeClasses:c}=tt(e),{rtlClasses:v,isRtl:u}=ze(),{hasContent:g,onAfterLeave:w}=Rt(e,s),C=ot(P(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:d,localTop:f,stackStyles:k}=Nt(s,De(e,"zIndex"),e._disableGlobalStack),{activatorEl:O,activatorRef:b,activatorEvents:i,contentEvents:A,scrimEvents:D}=Mt(e,{isActive:s,isTop:f}),{dimensionStyles:_}=rt(e),I=Lt(),{scopeId:Y}=Dt();M(()=>e.disabled,y=>{y&&(s.value=!1)});const G=W(),R=W(),{contentStyles:S,updateLocation:E}=gt(e,{isRtl:u,contentEl:R,activatorEl:O,isActive:s});xt(e,{root:G,contentEl:R,activatorEl:O,isActive:s,updateLocation:E});function m(y){a("click:outside",y),e.persistent?x():s.value=!1}function h(){return s.value&&d.value}q&&M(s,y=>{y?window.addEventListener("keydown",T):window.removeEventListener("keydown",T)},{immediate:!0});function T(y){var p,H;y.key==="Escape"&&d.value&&(e.persistent?x():(s.value=!1,(p=R.value)!=null&&p.contains(document.activeElement)&&((H=O.value)==null||H.focus())))}const F=it();se(()=>e.closeOnBack,()=>{lt(F,y=>{d.value&&s.value?(y(!1),e.persistent?x():s.value=!1):y()})});const z=W();M(()=>s.value&&(e.absolute||e.contained)&&l.value==null,y=>{if(y){const p=ft(G.value);p&&p!==document.scrollingElement&&(z.value=p.scrollTop)}});function x(){e.noClickAnimation||R.value&&Ye(R.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:Ke})}return nt(()=>{var y;return N(Ve,null,[(y=n.activator)==null?void 0:y.call(n,{isActive:s.value,props:V({ref:b},i.value,e.activatorProps)}),I.value&&g.value&&N(Ne,{disabled:!l.value,to:l.value},{default:()=>[N("div",V({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},c.value,v.value,e.class],style:[k.value,{top:L(z.value)},e.style],ref:G},Y,o),[N(Wt,V({color:C,modelValue:s.value&&!!e.scrim},D.value),null),N(Ge,{appear:!0,persisted:!0,transition:e.transition,target:O.value,onAfterLeave:()=>{w(),a("afterLeave")}},{default:()=>{var p;return[_e(N("div",V({ref:R,class:["v-overlay__content",e.contentClass],style:[_.value,S.value]},A.value,e.contentProps),[(p=n.default)==null?void 0:p.call(n,{isActive:s})]),[[Ie,s.value],[He("click-outside"),{handler:m,closeConditional:h,include:()=>[O.value]}]])]}})])]})])}),{activatorEl:O,animateClick:x,contentEl:R,globalTop:d,localTop:f,updateLocation:E}}});export{Xt as V,Ct as a,qt as m,Dt as u};
//# sourceMappingURL=VOverlay-139fd8f8.js.map
