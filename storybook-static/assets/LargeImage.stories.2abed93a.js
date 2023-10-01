import{L as f}from"./Link.89353ca2.js";import{a6 as v,k as c,l as n,m as r,H as y,N as I,O as k,a7 as x}from"./vue.esm-bundler.12598c06.js";import{_ as w}from"./_plugin-vue_export-helper.cdc0426e.js";const g={name:"Large Image",components:{Link:f},props:{displayError:Boolean},methods:{async readFile(){const e=this.$refs.file.files[0];if(!e){this.url=this;return}let t=e.size,i=64e6,l=e.type.split("/")[1],a=["png","jpg","jpeg"];a.includes(l)&&t<i&&(this.url=URL.createObjectURL(e),this.displayError=!1,this.displayFormatError=!1,this.$emit("image-changed",this.url),console.log(this.url)),a.includes(l)||(this.displayFormatError=!0),t>i&&(console.log("file too big"),this.displayError=!0)},removeItem(){this.url=""}},data(){return{url:null,displayError:!1,displayFormatError:!1}}},_=e=>(I("data-v-56ac45d1"),e=e(),k(),e),E={class:"container"},H={key:0},L=["src"],F=_(()=>r("p",null,"Header",-1)),V=_(()=>r("h4",null,"Replace",-1)),N={key:1},S=x('<svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-56ac45d1><rect width="500" height="200" rx="5" fill="white" data-v-56ac45d1></rect><rect width="500" height="200" rx="5" fill="#DCE6F2" data-v-56ac45d1></rect><rect x="1" y="1" width="498" height="198" rx="4" stroke="#37515F" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="14 14" data-v-56ac45d1></rect><g clip-path="url(#clip0_792_18400)" data-v-56ac45d1><path d="M262 98H252V88H248V98H238V102H248V112H252V102H262V98Z" fill="#37515F" data-v-56ac45d1></path></g><defs data-v-56ac45d1><clipPath id="clip0_792_18400" data-v-56ac45d1><rect width="24" height="24" fill="white" transform="translate(238 88)" data-v-56ac45d1></rect></clipPath></defs></svg>',1),b=[S];function B(e,t,i,l,a,s){const u=v("Link");return c(),n("div",E,[r("input",{type:"file",onChange:t[0]||(t[0]=(...d)=>s.readFile&&s.readFile(...d)),ref:"file"},null,544),a.url?(c(),n("div",H,[r("img",{src:a.url,alt:"Uploaded Image"},null,8,L),F,r("button",{onClick:t[1]||(t[1]=(...d)=>s.removeItem&&s.removeItem(...d))},[y(u,{text:"Remove Image"})]),V])):(c(),n("div",N,b))])}const C=w(g,[["render",B],["__scopeId","data-v-56ac45d1"]]);g.__docgenInfo={displayName:"Large Image",exportName:"default",description:"",tags:{},props:[{name:"displayError",type:{name:"boolean"}}],events:[{name:"image-changed",type:{names:["undefined"]}}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/stories/ImageGallery/LargeImage.vue"]};const z={title:" Gallery / Event Header Image",component:C},o={};var p,m,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};const O=["HeaderImage"];export{o as HeaderImage,O as __namedExportsOrder,z as default};
//# sourceMappingURL=LargeImage.stories.2abed93a.js.map
