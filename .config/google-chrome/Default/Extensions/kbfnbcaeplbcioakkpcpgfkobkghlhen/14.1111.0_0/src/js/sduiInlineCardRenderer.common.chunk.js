(self.webpackChunk=self.webpackChunk||[]).push([[3384],{15073:(e,t,n)=>{n.d(t,{u:()=>o});var o,r=n(27378),i=n(40327),u=n(98403),a=n(19751),c=n(2844),d=n(85089),f=n(2834),l=n(9223),s=n(5114),m=n(83078),S=n(90845);!function(e){e.Manager=function(t){var n=t.children,o=t.remSize,i=u.Dx(o).pipe(a.shareReplay({refCount:!0,bufferSize:1}));return S.P.useSingleton("RemSize.Manager"),S.P.useSubscriptionTo(i),r.createElement(e.Context.Provider,{value:i},n)},e.DefaultManager=function(t){var n=t.children;return S.P.useSingleton("RemSize.DefaultManager"),r.createElement(e.Manager,{remSize:e.withRemSizeEffect(e.defaultSizeObserver)},n)},e.defaultSizeObserver=c.aj(d.Lw("(max-width: 1359px)"),d.Lw("(min-width: 1600px)"),(function(e,t){return e?14:t?18:16})),e.withRemSizeEffect=function(t,n){return void 0===n&&(n=e.defaultFontSizeSetter),t.pipe(f.b((function(e){return n(s.some(e))})),l.x(n.bind(null,s.none)),a.shareReplay({refCount:!0,bufferSize:1}))},e.defaultFontSizeSetter=function(t){e.setRootCssVar(document.documentElement,t),e.setRootFontSize(t)},e.Context=r.createContext(e.defaultSizeObserver),e.setRootCssVar=function(e,t){e.style.setProperty("--rem",(0,i.pipe)(t,s.map(String),m.QP))},e.setRootFontSize=function(e){document.documentElement.style.fontSize=(0,i.pipe)(e,s.map((function(e){return e+"px"})),m.QP)}}(o||(o={}))},88056:(e,t,n)=>{var o;n.d(t,{Y:()=>o}),function(e){e.invariantContent=function(e){return"function"==typeof Proxy?new Proxy({},{get:function(t,n){if(null==t[n])throw new Error("Please provide context using ".concat(e,".Context.Provider"));return t[n]}}):void 0}}(o||(o={}))},70054:(e,t,n)=>{n.r(t),n.d(t,{SduiCard:()=>v});var o,r=n(27378),i=n(57050),u=n(15073),a=n(42103),c=n(76974),d=n(2834),f=n(5114),l=n(18702),s=n(84286),m=n(93531),S=n(40333);!function(e){e.of=e=>e}(o||(o={}));const p=({children:e})=>r.createElement(u.u.Manager,{remSize:(0,i.zG)(c.of(16),d.b((e=>u.u.setRootCssVar(document.documentElement,f.some(e)))))},r.createElement(a.G.DefaultProvider,null,e)),v=({model:e})=>r.createElement(p,null,r.createElement(l.P,{key:e.sdui.id,sduiRootId:e.sdui.id,content:e.sdui.content,prevContent:f.none,transitions:[],designSystem:{...m.k,inlineCard:(0,S.I)(o.of(13.5),o.of(20.25))},onMount:i.Q1,onAnimationEnd:i.Q1,notify:(t,n,o)=>{const r=n.filter((e=>"positionedClick"!=e.type&&"hoverStateChanged"!=e.type));e.onSduiAction(s.Oe.create(r,e.sdui.id,t,o))}}))}}]);