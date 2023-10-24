import{L as H}from"./Link-25d97edd.js";import{z as P,O as A,D as F,l as n,m as s,p as e,G as O,N as Y,n as l,C as u,A as h,J as z,H as G,I as J}from"./vue.esm-bundler-d4c6f595.js";import{_ as U}from"./_plugin-vue_export-helper-c27b6911.js";import{V as j}from"./VTooltip-ba213a3a.js";import"./VOverlay-01cd441f.js";import"./locale-44f1c6d0.js";import"./theme-47119a85.js";import"./forwardRefs-7e8b1c6b.js";import"./anchor-3bf22baf.js";import"./color-e3b57b3c.js";import"./router-85975cd9.js";import"./display-5dd4d301.js";const D={name:"Calendar Event Block",components:{Link:H},props:{event:String},computed:{window:()=>window,hiddenEvents(){return this.events.length-3>0}},data:()=>({event:"",events:[{name:"Event 1",startTime:"10:00",endTime:"14:30"},{name:"Event 2",startTime:"10:00",endTime:"14:30"},{name:"Event 3",startTime:"10:00",endTime:"14:30"},{name:"Event 4",startTime:"10:00",endTime:"14:30"}]}),watch:{},methods:{onClick(){window.alert(event.name)}}},a=t=>(G("data-v-27d11f5f"),t=t(),J(),t),q={key:0},K={class:"date-wrapper booked"},M=a(()=>e("div",{class:"top-bar"},null,-1)),Q=a(()=>e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")],-1)),R={class:"event-listing"},W=a(()=>e("span",null," - ",-1)),X={key:0,class:"additional-events"},Z={key:1},$=a(()=>e("div",{class:"date-wrapper today"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),ee=[$],te={key:2},ne=a(()=>e("div",{class:"date-wrapper selected"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),se=[ne],ae={key:3},oe=a(()=>e("div",{class:"date-wrapper empty"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),re=[oe];function de(t,_,v,ie,ce,c){const I=P("Link"),V=A("switch");return F((n(),s("div",null,[v.event==="booked"?(n(),s("div",q,[e("div",K,[M,Q,(n(!0),s(O,null,Y(t.events.slice(0,3),m=>(n(),s("div",R,[e("a",{onClick:_[0]||(_[0]=(...L)=>c.onClick&&c.onClick(...L))},[e("h2",null,l(m.name),1),e("p",null,[u(l(m.startTime),1),W,u(l(m.endTime),1)])]),h(j)]))),256)),c.hiddenEvents?(n(),s("div",X,[e("p",null,"And "+l(c.hiddenEvents.extraEvents)+" more ",1),h(I,{text:"expand"})])):z("",!0)])])):v.event==="today"?(n(),s("div",Z,ee)):v.event==="highlighted"?(n(),s("div",te,se)):(n(),s("div",ae,re))])),[[V,t.events]])}const N=U(D,[["render",de],["__scopeId","data-v-27d11f5f"]]);D.__docgenInfo={displayName:"Calendar Event Block",exportName:"default",description:"",tags:{},props:[{name:"event",type:{name:"string"}}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/components/Calendar/EventBlock.vue"]};const Be={component:N,title:"Calendar / Event Block"},p=t=>({components:{EventBlock:N},setup(){return{args:t}},template:'<EventBlock v-bind="args"/>'}),o=p.bind({});o.args={event:"empty"};const r=p.bind({});r.args={event:"booked"};const d=p.bind({});d.args={event:"today"};const i=p.bind({});i.args={event:"highlighted"};var g,k,E;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(E=(k=o.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var f,y,B;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(B=(y=r.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var b,w,T;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(T=(w=d.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var C,x,S;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(S=(x=i.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const be=["Default","Populated","Today","Highlighted"];export{o as Default,i as Highlighted,r as Populated,d as Today,be as __namedExportsOrder,Be as default};
//# sourceMappingURL=EventBlock.stories-d0695ef2.js.map
