import{j as m,y as O,Y as T,f as P,b as g,Z as $,s as y,e as A}from"./vue.esm-bundler-3c3b4f83.js";import{f as F,C as k,D as x}from"./theme-43348865.js";function U(e,a){a=Array.isArray(a)?a.slice(0,-1).map(t=>`'${t}'`).join(", ")+` or '${a.at(-1)}'`:`'${a}'`}const I={badge:"Badge",open:"Open",close:"Close",dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{ok:"OK",cancel:"Cancel",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},timePicker:{am:"AM",pm:"PM"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"}},j={af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1};function E(e,a){let t;function n(){t=T(),t.run(()=>a.length?a(()=>{t==null||t.stop(),n()}):a())}m(e,l=>{l&&!t?n():l||(t==null||t.stop(),t=void 0)},{immediate:!0}),O(()=>{t==null||t.stop()})}function V(e,a,t){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:r=>r,l=arguments.length>4&&arguments[4]!==void 0?arguments[4]:r=>r;const s=F("useProxiedModel"),u=P(e[a]!==void 0?e[a]:t),o=k(a),f=o!==a?g(()=>{var r,i,d,h;return e[a],!!(((r=s.vnode.props)!=null&&r.hasOwnProperty(a)||(i=s.vnode.props)!=null&&i.hasOwnProperty(o))&&((d=s.vnode.props)!=null&&d.hasOwnProperty(`onUpdate:${a}`)||(h=s.vnode.props)!=null&&h.hasOwnProperty(`onUpdate:${o}`)))}):g(()=>{var r,i;return e[a],!!((r=s.vnode.props)!=null&&r.hasOwnProperty(a)&&((i=s.vnode.props)!=null&&i.hasOwnProperty(`onUpdate:${a}`)))});E(()=>!f.value,()=>{m(()=>e[a],r=>{u.value=r})});const c=g({get(){const r=e[a];return n(f.value?r:u.value)},set(r){const i=l(r),d=$(f.value?e[a]:u.value);d===i||n(d)===r||(u.value=i,s==null||s.emit(`update:${a}`,i))}});return Object.defineProperty(c,"externalValue",{get:()=>f.value?e[a]:u.value}),c}const L="$vuetify.",w=(e,a)=>e.replace(/\{(\d+)\}/g,(t,n)=>String(a[+n])),C=(e,a,t)=>function(n){for(var l=arguments.length,s=new Array(l>1?l-1:0),u=1;u<l;u++)s[u-1]=arguments[u];if(!n.startsWith(L))return w(n,s);const o=n.replace(L,""),b=e.value&&t.value[e.value],f=a.value&&t.value[a.value];let c=x(b,o,null);return c||(`${n}${e.value}`,c=x(f,o,null)),c||(c=n),typeof c!="string"&&(c=n),w(c,s)};function N(e,a){return(t,n)=>new Intl.NumberFormat([e.value,a.value],n).format(t)}function v(e,a,t){const n=V(e,a,e[a]??t.value);return n.value=e[a]??t.value,m(t,l=>{e[a]==null&&(n.value=t.value)}),n}function R(e){return a=>{const t=v(a,"locale",e.current),n=v(a,"fallback",e.fallback),l=v(a,"messages",e.messages);return{name:"vuetify",current:t,fallback:n,messages:l,t:C(t,n,l),n:N(t,n),provide:R({current:t,fallback:n,messages:l})}}}function D(e){const a=y((e==null?void 0:e.locale)??"en"),t=y((e==null?void 0:e.fallback)??"en"),n=P({en:I,...e==null?void 0:e.messages});return{name:"vuetify",current:a,fallback:t,messages:n,t:C(a,t,n),n:N(a,t),provide:R({current:a,fallback:t,messages:n})}}const S=Symbol.for("vuetify:locale");function K(e){return e.name!=null}function G(e){const a=e!=null&&e.adapter&&K(e==null?void 0:e.adapter)?e==null?void 0:e.adapter:D(e),t=M(a,e);return{...a,...t}}function H(){const e=A(S);if(!e)throw new Error("[Vuetify] Could not find injected locale instance");return e}function M(e,a){const t=P((a==null?void 0:a.rtl)??j),n=g(()=>t.value[e.current.value]??!1);return{isRtl:n,rtl:t,rtlClasses:g(()=>`v-locale--is-${n.value?"rtl":"ltr"}`)}}function W(){const e=A(S);if(!e)throw new Error("[Vuetify] Could not find injected rtl instance");return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}export{S as L,W as a,H as b,E as c,G as d,U as e,V as u};
//# sourceMappingURL=locale-eae6cb20.js.map
