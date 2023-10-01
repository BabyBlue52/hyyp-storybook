import{L as H}from"./Link.89353ca2.js";import{a6 as F,Y as P,X as Y,k as s,l as n,m as e,F as O,v as z,G as l,E as u,H as h,z as A,N as G,O as U}from"./vue.esm-bundler.12598c06.js";import{_ as X}from"./_plugin-vue_export-helper.cdc0426e.js";import{V as j}from"./VTooltip.1c916a39.js";import"./VOverlay.3a1ad8eb.js";import"./theme.d5a2f491.js";import"./forwardRefs.7b10ae4c.js";import"./anchor.24d870ba.js";import"./color.2739ab01.js";import"./router.ccdb5f0a.js";import"./display.7047da8e.js";import"./locale.3b92fa6f.js";import"./transition.546c36d1.js";const N={name:"Calendar Event Block",components:{Link:H},props:{event:""},computed:{window:()=>window,hiddenEvents(){return this.events.length-3>0}},data:()=>({event:"",events:[{name:"Event 1",startTime:"10:00",endTime:"14:30"},{name:"Event 2",startTime:"10:00",endTime:"14:30"},{name:"Event 3",startTime:"10:00",endTime:"14:30"},{name:"Event 4",startTime:"10:00",endTime:"14:30"}]}),watch:{},methods:{onClick(){window.alert(event.name)}}},a=t=>(G("data-v-68553820"),t=t(),U(),t),q={key:0},J={class:"date-wrapper booked"},K=a(()=>e("div",{class:"top-bar"},null,-1)),M=a(()=>e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")],-1)),Q={class:"event-listing"},R=a(()=>e("span",null," - ",-1)),W={key:0,class:"additional-events"},Z={key:1},$=a(()=>e("div",{class:"date-wrapper today"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),ee=[$],te={key:2},se=a(()=>e("div",{class:"date-wrapper selected"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),ne=[se],ae={key:3},oe=a(()=>e("div",{class:"date-wrapper empty"},[e("div",{class:"top-bar"}),e("div",{class:"event-header"},[e("div",{class:"event-date"},"5")])],-1)),re=[oe];function de(t,_,v,ie,ce,c){const V=F("Link"),I=P("switch");return Y((s(),n("div",null,[v.event==="booked"?(s(),n("div",q,[e("div",J,[K,M,(s(!0),n(O,null,z(t.events.slice(0,3),m=>(s(),n("div",Q,[e("a",{onClick:_[0]||(_[0]=(...L)=>c.onClick&&c.onClick(...L))},[e("h2",null,l(m.name),1),e("p",null,[u(l(m.startTime),1),R,u(l(m.endTime),1)])]),h(j)]))),256)),c.hiddenEvents?(s(),n("div",W,[e("p",null,"And "+l(c.hiddenEvents.extraEvents)+" more ",1),h(V,{text:"expand"})])):A("",!0)])])):v.event==="today"?(s(),n("div",Z,ee)):v.event==="highlighted"?(s(),n("div",te,ne)):(s(),n("div",ae,re))])),[[I,t.events]])}const D=X(N,[["render",de],["__scopeId","data-v-68553820"]]);N.__docgenInfo={displayName:"Calendar Event Block",exportName:"default",description:"",tags:{},props:[{name:"event",type:{name:"''",func:!0}}],sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/stories/Calendar/EventBlock.vue"]};const fe={component:D,title:"Calendar / Event Block"},p=t=>({components:{EventBlock:D},setup(){return{args:t}},template:'<EventBlock v-bind="args"/>'}),o=p.bind({});o.args={event:"empty"};const r=p.bind({});r.args={event:"booked"};const d=p.bind({});d.args={event:"today"};const i=p.bind({});i.args={event:"highlighted"};var g,k,E;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(E=(k=o.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var y,B,b;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(b=(B=r.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var f,w,T;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(T=(w=d.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var x,C,S;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  components: {
    EventBlock
  },
  setup() {
    return {
      args
    };
  },
  template: '<EventBlock v-bind="args"/>'
})`,...(S=(C=i.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};const we=["Default","Populated","Today","Highlighted"];export{o as Default,i as Highlighted,r as Populated,d as Today,we as __namedExportsOrder,fe as default};
//# sourceMappingURL=EventBlock.stories.cf1db7a6.js.map
