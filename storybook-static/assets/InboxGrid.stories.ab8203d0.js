import{g as x,f as y,a6 as f,k as v,l as G,m as e,H as t,K as I,F as w}from"./vue.esm-bundler.12598c06.js";import{V as n}from"./VIcon.e9e2b6ae.js";import"./chunk-AY7I2SME.04c2bca5.js";import"./color.2739ab01.js";import"./theme.d5a2f491.js";import"./tag.ccf377ce.js";const D={class:"action-tray"},k={class:"icon-btn"},S={class:"icon-btn"},C=e("span",null,"Delete",-1),L={class:"icon-btn"},N=e("span",null,"Report Spam",-1),B={class:"hyyp-inbox"},T=e("a",{href:"https://google.com"},"nothing here",-1),K="",A="desc",E="#37515f",a=x({__name:"InboxGrid",setup(r){const d=y([]),p=[{text:"Sender",value:"sender",sortable:!0,width:200},{text:"Message",value:"message",width:400},{text:"Date",value:"date",sortable:!0,width:200}],u=[{sender:"Stephen Curry",message:"GSW",date:30,opened:!0},{sender:"Lebron James",message:"LAL",date:26,opened:!1},{sender:"Kevin Durant",message:"BKN",date:7,opened:!0},{sender:"Giannis Antetokounmpo",message:"MIL",date:11,opened:!1},{sender:"Stephen Curry",message:"GSW",date:34,opened:!0},{sender:"Lebron James",message:"LAL",date:16,opened:!1},{sender:"Kevin Durant",message:"BKN",date:8,opened:!0},{sender:"Giannis Antetokounmpo",message:"MIL",date:13,opened:!1}],_=(i,o)=>i.opened===!0?"unread":"read",b=()=>{window.alert("clicked")};return(i,o)=>{const g=f("EasyDataTable");return v(),G(w,null,[e("div",D,[e("button",k,[t(n,{icon:"mdi-refresh"})]),e("button",S,[t(n,{icon:"mdi-trash-can-outline"}),C]),e("button",L,[t(n,{icon:"mdi-information-outline"}),N])]),e("div",B,[t(g,{"items-selected":d.value,"onUpdate:itemsSelected":o[0]||(o[0]=h=>d.value=h),"fixed-checkbox":"","table-class-name":"customize-table","body-row-class-name":_,headers:p,items:u,themeColor:E,onClickRow:b,"sort-by":K,"sort-type":A},{"empty-message":I(()=>[T]),_:1},8,["items-selected"])])],64)}}});a.__docgenInfo={exportName:"default",displayName:"InboxGrid",description:"",tags:{},sourceFiles:["/Users/chris/Desktop/HYYP/hyyp-storybook/src/stories/DataTables/InboxGrid.vue"]};const W={component:a,title:"DataTables / InboxGrid",decorators:[()=>({template:'<div style="max-width:95vw;margin: 0 auto;"><story/></div>'})]},F=r=>({components:{InboxGrid:a},setup(){return{args:r}},template:'<InboxGrid v-bind="args"/>'}),s=F.bind({});var c,l,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    InboxGrid
  },
  setup() {
    return {
      args
    };
  },
  template: '<InboxGrid v-bind="args"/>'
})`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const Y=["Default"];export{s as Default,Y as __namedExportsOrder,W as default};
//# sourceMappingURL=InboxGrid.stories.ab8203d0.js.map