class g{constructor(s){let{x:i,y:r,width:e,height:t}=s;this.x=i,this.y=r,this.width=e,this.height=t}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function w(o,s){return{x:{before:Math.max(0,s.left-o.left),after:Math.max(0,o.right-s.right)},y:{before:Math.max(0,s.top-o.top),after:Math.max(0,o.bottom-s.bottom)}}}function x(o){const s=o.getBoundingClientRect(),i=getComputedStyle(o),r=i.transform;if(r){let e,t,n,f,u;if(r.startsWith("matrix3d("))e=r.slice(9,-1).split(/, /),t=+e[0],n=+e[5],f=+e[12],u=+e[13];else if(r.startsWith("matrix("))e=r.slice(7,-1).split(/, /),t=+e[0],n=+e[3],f=+e[4],u=+e[5];else return new g(s);const a=i.transformOrigin,c=s.x-f-(1-t)*parseFloat(a),l=s.y-u-(1-n)*parseFloat(a.slice(a.indexOf(" ")+1)),h=t?s.width/t:o.offsetWidth+1,d=n?s.height/n:o.offsetHeight+1;return new g({x:c,y:l,width:h,height:d})}else return new g(s)}function b(o,s,i){if(typeof o.animate>"u")return{finished:Promise.resolve()};let r;try{r=o.animate(s,i)}catch{return{finished:Promise.resolve()}}return typeof r.finished>"u"&&(r.finished=new Promise(e=>{r.onfinish=()=>{e(r)}})),r}const R="cubic-bezier(0.4, 0, 0.2, 1)",y="cubic-bezier(0.0, 0, 0.2, 1)",O="cubic-bezier(0.4, 0, 1, 1)",p=Symbol("Forwarded refs");function m(o,s){let i=o;for(;i;){const r=Reflect.getOwnPropertyDescriptor(i,s);if(r)return r;i=Object.getPrototypeOf(i)}}function P(o){for(var s=arguments.length,i=new Array(s>1?s-1:0),r=1;r<s;r++)i[r-1]=arguments[r];return o[p]=i,new Proxy(o,{get(e,t){if(Reflect.has(e,t))return Reflect.get(e,t);if(!(typeof t=="symbol"||t.startsWith("__"))){for(const n of i)if(n.value&&Reflect.has(n.value,t)){const f=Reflect.get(n.value,t);return typeof f=="function"?f.bind(n.value):f}}},has(e,t){if(Reflect.has(e,t))return!0;if(typeof t=="symbol"||t.startsWith("__"))return!1;for(const n of i)if(n.value&&Reflect.has(n.value,t))return!0;return!1},set(e,t,n){if(Reflect.has(e,t))return Reflect.set(e,t,n);if(typeof t=="symbol"||t.startsWith("__"))return!1;for(const f of i)if(f.value&&Reflect.has(f.value,t))return Reflect.set(f.value,t,n);return!1},getOwnPropertyDescriptor(e,t){var f,u;const n=Reflect.getOwnPropertyDescriptor(e,t);if(n)return n;if(!(typeof t=="symbol"||t.startsWith("__"))){for(const a of i){if(!a.value)continue;const c=(u=m(a.value,t))!=null?u:"_"in a.value?m((f=a.value._)==null?void 0:f.setupState,t):void 0;if(c)return c}for(const a of i){const c=a.value&&a.value[p];if(!c)continue;const l=c.slice();for(;l.length;){const h=l.shift(),d=m(h.value,t);if(d)return d;const v=h.value&&h.value[p];v&&l.push(...v)}}}}})}export{g as B,b as a,O as b,y as d,P as f,w as g,x as n,R as s};
//# sourceMappingURL=forwardRefs.7b10ae4c.js.map