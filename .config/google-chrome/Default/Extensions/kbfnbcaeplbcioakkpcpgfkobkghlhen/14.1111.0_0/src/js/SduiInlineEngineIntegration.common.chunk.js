(self.webpackChunk=self.webpackChunk||[]).push([[5275],{33678:(e,t,n)=>{n.d(t,{A:()=>d,a:()=>i});var i,r=n(27378),s=n(88056),a=n(95195),o=n(95574);!function(e){!function(e){e.supportsSVGDominantBaseline="supportsSVGDominantBaseline",e.supportsSetGoalsLoader="supportsSetGoalsLoader",e.onlyTrustedEvents="onlyTrustedEvents"}(e.Flag||(e.Flag={})),e.Context=r.createContext(s.Y.invariantContent("PlatformEnvironment"));var t=function(){this.has=function(){return!1},this.actions={openUrl:function(){return a.F2(void 0)},openPopup:function(){return a.F2(void 0)}}};e.Mock=t}(i||(i={}));var d=function(){function e(){this.actions={openUrl:function(e){return o.vM((function(){throw new Error("Not implemented")}))},openPopup:function(e){return o.vM((function(){throw new Error("Not implemented")}))}}}return e.prototype.has=function(e){throw new Error("Not implemented")},e}()},88056:(e,t,n)=>{var i;n.d(t,{Y:()=>i}),function(e){e.invariantContent=function(e){return"function"==typeof Proxy?new Proxy({},{get:function(t,n){if(null==t[n])throw new Error("Please provide context using ".concat(e,".Context.Provider"));return t[n]}}):void 0}}(i||(i={}))},11596:(e,t,n)=>{n.r(t),n.d(t,{createSduiInlineEngine:()=>B,default:()=>W});var i=n(5114),r=n(21038),s=n(24055),a=n(12054),o=n(78929),d=n(81531),c=n(46680),u=n(26393),l=n(92843),p=n(9922),h=n(93508),g=n(16118),f=n(77176),m=n(28811),v=n(57050);function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function _(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i,r,s=[],a=!0,o=!1;try{for(n=n.call(e);!(a=(i=n.next()).done)&&(s.push(i.value),!t||s.length!==t);a=!0);}catch(e){o=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(o)throw r}}return s}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var w=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._state=new Map,this._subs=new p.w.Keeper,this._log=d.C8.Logging.getLogger("SDUIInlineManager",c.i.TRACE,c.T.Manager.getColor()),this._subs.push(t.pipe(h.O(m.a.empty),g.G(),f.U((function(e){var t=b(e,2),n=t[0],i=t[1];return m.a.diff(n,i)})),f.U((function(e){return n._processSDUIItems(e)}))).subscribe())}var t,n,r;return t=e,(n=[{key:"getInlineItemForAlert",value:function(e){return i.fromNullable(this._state.get(e))}},{key:"_processSDUIItems",value:function(e){var t=this;(0,v.zG)(e,l.v.forEach((function(e){if(y(e)){var n=t;t._log.trace("inline item removed",{alertIds:e.alertIds,itemId:e.id}),e.alertIds.forEach((function(e){return n._state.delete(e)}))}}),(function(e,n){if(y(n)){var i=t;t._log.trace("inline item updated",{alertIds:n.alertIds,itemId:n.id}),n.alertIds.forEach((function(e){return i._state.set(e,n)}))}}),(function(e){if(y(e)){var n=t;t._log.trace("inline item added",{alertIds:e.alertIds,itemId:e.id}),e.alertIds.forEach((function(t){return n._state.set(t,e)}))}})))}},{key:"dispose",value:function(){this._subs.dispose()}}])&&_(t.prototype,n),r&&_(t,r),e}(),y=function(e){return(0,v.zG)(u.a.findFirst(e.content,"inlineCard"),i.isSome)},C=n(31903),S=n(85985),I=n(80358),k=n(84286),E=n(38983),F=n(72812),L=n(50588),U=n(22232),x=n(73975),P=n(40151),H=n(95195),M=n(8125);class T{constructor(){this.feed=P.E,this.currentFeed=i.none,this.onFeedRemove=P.E,this.onFeedEmpty=P.E,this.header=P.E,this.pushFeed=()=>H.F2(null),this.popFeed=M.Q1,this.focusCard=()=>H.F2(null),this.notifyCardFocused=M.Q1,this.dispose=M.Q1}}var G,N=n(12469),R=n(19716),O=n(73582),Q=n(32952),V=n(19751);class D{constructor(e,t){this.sduiManager=e,this.sduiFeedbackService=t,this._focusedItem=E.h.create(i.none),this._sduiInlineCardActions=new Q.xQ,this._subs=new p.w.Keeper,this.focusCard=e=>{this._focusedItem.set(i.some(e))},this.handleSduiCardAction=(e,t,n)=>{this._sduiInlineCardActions.next({cardAction:e,cardModel:t,match:n})},this._handleSduiCardAction=({cardAction:e,match:t,cardModel:n})=>{this._sduiViewModel.sduiActionEvents.next(e),this._nativeHandling(e,t,n)},this.dispose=()=>this._subs.dispose(),this._sduiViewModel=new F.x(t,e,new T,this._focusedItem.view(i.map((e=>e.id)))),this._subs.push(this._sduiInlineCardActions.pipe(V.skipBy(G.eq)).subscribe(this._handleSduiCardAction),this._sduiViewModel)}_nativeHandling({actions:e,cardId:t,sourceId:n,scope:r},s,a){const o=e.filter((e=>"popAssistantFeed"===e.type||"pushAssistantFeed"===e.type||"focusAssistantCard"===e.type));(0,v.zG)(o,i.fromPredicate((e=>e.length>0)),i.map((e=>{a.onOpenExpandedViewBySduiAction(k.Oe.create(e,t,n,r))}))),e.forEach((e=>{switch(e.type){case"nextCard":case"prevCard":case"openSettings":case"openToneDetector":case"openFeedback":case"openLearnMore":case"transition":case"openCreateSnippetModal":case"nativeOpenAssistant":case"selectAlternative":case"highlightAlert":case"showHighlights":case"hideHighlights":case"notify":case"switchView":case"newRevision":case"openLink":case"pushAssistantFeed":case"popAssistantFeed":case"focusAssistantCard":case"stopApplyingAlerts":case"copyToClipboard":return;case"upgradeToPremium":return a.openPlanComparisonPage({forceUtmCampaign:O.L.Place.assistantCardList}),void s.hide();case"applyAlerts":if(null==s.alert)return;return(0,v.zG)((0,N.UQ)(s.alert,s.plainText),(e=>new R.U_(e,(e=>s.replace(null!=e?e:"",!1)))),(t=>(0,v.zG)(i.fromNullable(t.replacements[e.alternativeIndex]),i.map((e=>t.getOnReplace(e)()))))),void s.hide();case"closeCard":case"removeRoot":return void s.hide();case"removeAlerts":return s.ignore(),void s.hide();default:(0,U.L0)(e)}}))}}!function(e){e.eq=x.MW({cardAction:L.t.eq})}(G||(G={}));const B=(e,t,n,d)=>{const c=new p.w.Keeper,u=(0,v.ls)((e=>e.toString()),n,i.fromNullable,i.map((e=>r.j.AlertId.from(e.id)))),l=e.capiEvents.pipe(S.h(I.hX.is("sdui_add","sdui_remove","sdui_update")),S.h((e=>"sdui_remove"===e.kind||k.D1.InlineCard.isInlineCard(e.sdui))),S.h(s.e.isSduiEvent),f.U(a.al.fromSource(a.i5.CAPI))),h=new o.G(l,u),g=new w(h.state),m=new C.Q({sendUserAction:d}),A=new D(h,m);return c.push(t.subscribe((e=>h.notifyAlertsChanged())),e.capiEvents.pipe(S.h(I.hX.is("session_started")),S.h((e=>e.isNewSession))).subscribe((e=>h.onSessionStarted())),e.capiEvents.pipe(S.h(I.hX.is("finish")),S.h((e=>0===e.revision))).subscribe((e=>h.onFirstCheckingFinished())),h,g,A),{sduiBufferService:e,sduiManager:h,sduiInlineManager:g,sduiFeedbackService:m,inlineCardViewModel:A,dispose:()=>{c.dispose()}}},W={createSduiInlineEngine:B}},73582:(e,t,n)=>{n.d(t,{L:()=>i,x:()=>C});var i,r=n(40327),s=n(65421),a=n(39354),o=n(65451),d=n(27594),c=n(74660),u=n(6782),l=n(4390),p=n(2844),h=n(77176),g=n(98403),f=n(5114),m=n(8125),v=n(95574),A=n(95195),_=n(38983),b=n(81531),w=n(62111),y=n(23423);!function(e){let t;!function(e){e.gdocsSidebarCardList="gdocsSidebarCardList",e.gdocsGoals="gdocsGoals",e.assistantCardList="assistantCardList",e.extensionSettingsAssistant="extensionSettingsAssistant",e.toneSuggestion="toneSuggestion"}(t=e.Place||(e.Place={}))}(i||(i={}));class C{constructor(e,t,n,i){this._alertsList=e,this._lensState=t,this._maxAlertCategories=n,this.gnar=i,this._log=b.C8.Logging.getLogger("UpgradeViewModel"),this._advancedAlerts=_.h.create([]),this.advancedAlerts=this._advancedAlerts.view((e=>e.length>0?f.some({count:e.length,alerts:()=>this._formatLiteAlerts(C._getGroupedLiteAlerts(e))}):f.none)),this._formatLiteAlerts=e=>{const t=e.slice(0,this._maxAlertCategories),n=e.slice(this._maxAlertCategories).map((e=>e.count)).reduce(m.Sm,0);return n>0?[...t,{group:"",category:"",categoryHuman:"more...",count:n,lensName:"",bundleInfo:f.none}]:t},this._connectionId=o._.createWithRandomId("sidebar"),p.aj([this._lensState.view("currentLens").view("id").view(d.R.isPriority).view((e=>e?e=>c.bZ.isRegistered(e)&&c.bZ.isPremium(e)&&c.bZ.isPriority(e):e=>c.bZ.isRegistered(e)&&c.bZ.isPremium(e))),this._alertsList.state]).pipe(h.U((([e,t])=>l.p.reduce([],((t,{alert:n})=>(e(n)&&t.push(n),t)))(t)))).subscribe(g.wW(this._advancedAlerts))}trackUpgradeButtonShow(e){const t=this._advancedAlerts.get();(0,y.n)(this.gnar,{placement:e.placement,bannerType:e.bannerType,advancedAlerts:t,upgradeHookName:e.upgradeHookName,upgradeHookSlot:e.upgradeHookSlot}),this.gnar.assistantExpandedUpgradeHookShow(t.length,100),(0,w.Tb)().upgradeHooks.showUpgradeHook(e.upgradeHookName,e.upgradeHookSlot)}trackUpgradeButtonClick(e){const t=this._advancedAlerts.get();(0,y.Q)(this.gnar,{placement:e.placement,bannerType:e.bannerType,advancedAlerts:t,upgradeHookName:e.upgradeHookName,upgradeHookSlot:e.upgradeHookSlot}),(0,w.Tb)().upgradeHooks.clickUpgradeHook(e.upgradeHookName,e.upgradeHookSlot)}openUpgradeUrl(e){(0,r.pipe)(v.vM((()=>{(0,a.P4)().openSubscriptionDialog({currentAlerts:this._getCapiAlerts(),isAnonymousUser:!1,isFromEmail:!1,forceUtmCampaign:e})})),A.fS((e=>this._log.fatal("unexpected error on open upgrade page",e))))}_getCapiAlerts(){return this._advancedAlerts.get().map((e=>(0,s.IM)(C._toRawAlertWithPossibleWrongId(e),o.Q.create(this._connectionId,0))))}static _getGroupedLiteAlerts(e){return u.Q.group(e.map((e=>e.toLiteAlert())))}static _toRawAlertWithPossibleWrongId(e){return{...e.toRawAlert(),id:(0,r.pipe)(e.rawId,f.getOrElse((()=>e.id)))}}}}}]);