"use strict";var STREAMER_LIST=["freecodecamp","raynday","jepedesu","overwatchcontenders","brunofin","ESL_SC2","OgamingSC2","cretetion","storbeck","habathcx","RobotCaleb","noobs2ninjas"],ALL="ALL",ONLINE="ONLINE",OFFLINE="OFFLINE",TABS={ALL:"All",ONLINE:"Online",OFFLINE:"Offline"},TAB_DECISIONS={ALL:[!0,!0],ONLINE:[!0,!1],OFFLINE:[!1,!0]},TWITCH_URL="https://www.twitch.tv",USERS_ENDPOINT="https://wind-bow.glitch.me/twitch-api/users",STREAMS_ENDPOINT="https://wind-bow.glitch.me/twitch-api/streams",ENDPOINTS=[USERS_ENDPOINT,STREAMS_ENDPOINT],DEFAULT_AVATAR="https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Glitch_474x356.png",StreamerName=function(e){return{$type:"p",$text:e.name,class:"title is-4"}},StatusIcon=function(e){var t=e.active;return{$type:"span",class:"icon is-small",style:t?"color: green":"",$components:[{$type:"i",class:"fa fa-circle"+(t?"":"-o")}]}},StreamerUsername=function(e){var t=e.username,n=e.active;return{$type:"p",class:"subtitle is-6",$components:[{$text:t+" ",$type:"span"},StatusIcon({active:n})]}},StreamerCardTitle=function(e){var t=e.name,n=e.username,r=e.active;return{class:"media-content",$components:[StreamerName({name:t}),StreamerUsername({username:n,active:r})]}},StreamingTitle=function(e){return{$type:"p",$components:[{$type:"strong",$text:e.streaming||""}]}},StreamerBio=function(e){return{$type:"p",$components:[{$type:"em",$text:e.bio||""}]}},StreamerInfo=function(e){var t=e.bio,n=e.streaming;return{class:"content",$components:[StreamerBio({bio:t}),StreamingTitle({streaming:n})]}},StreamerAvatar=function(e){return{class:"media-left",$components:[{$type:"figure",class:"image is-48x48",$components:[{$type:"img",src:e.src,alt:e.alt}]}]}},StreamerHeader=function(e){var t=e.name,n=e.username,r=e.active,a=e.src,s=e.alt;return{class:"media",$components:[StreamerAvatar({src:a,alt:s}),StreamerCardTitle({name:t,username:n,active:r})]}},StreamerCard=function(e){var t=e.name,n=e.username,r=e.active,a=e.src,s=e.alt,i=e.bio,c=e.streaming;return{class:"card",style:"cursor: pointer",onclick:function(){window.location.href=TWITCH_URL+"/"+n},$components:[{class:"card-content",$components:[StreamerHeader({name:t,username:n,active:r,src:a,alt:s}),StreamerInfo({bio:i,streaming:c})]}]}},StreamerList=function(){return{class:"container",$init:function(){this.$components=this._list.map(function(e){return StreamerCard(e)})}}},Tab=function(e){var t=e.name;return{$type:"li",class:e.active?"is-active":"",onclick:function(){this._currentFilter=t.toUpperCase()},$components:[{$type:"a",$text:t}]}},TabList=function(e){return{class:"container",_filters:[],$init:function(){this._filters=e},$update:function(){var e=this;this.$components=[{class:"tabs is-centered is-boxed",$components:[{$type:"ul",$components:Object.entries(this._filters).map(function(t){return Tab({name:t[1],active:e._currentFilter===t[0]})})}]}]}}},SearchBar=function(){return{$cell:!0,id:"search-bar",class:"container field",oninput:function(e){document.querySelector("#app")._searchFilter=e.target.value},$components:[{$type:"p",class:"control has-icons-left",$components:[{$type:"input",class:"input",type:"text",placeholder:"Search"},{$type:"span",class:"icon is-small is-left",$components:[{$type:"i",class:"fa fa-search"}]}]}]}},zip=function(e,t){var n=[];return e.forEach(function(e,r){return n.push(Object.assign({},e,t[r]))}),n},getCardData=function(e){if(404===e.status){var t=e.message.replace('User "',"").replace('" was not found',"");return{src:DEFAULT_AVATAR,alt:t,name:t,username:"@"+t,active:!1,bio:e.message+".",streaming:null}}return{src:e.logo||DEFAULT_AVATAR,alt:e.name,name:e.display_name,username:"@"+e.name,active:!!e.stream,bio:e.bio||"Twitch Streamer.",streaming:e.stream?e.stream.channel.status:null}},App=function(e){return{$cell:!0,id:"app",_fullList:[],_list:[],_searchFilter:"",_currentFilter:ALL,_refresh:function(){var t=this;Promise.all(ENDPOINTS.map(function(t){return Promise.all(e.map(function(e){return fetch(t+"/"+e).then(function(e){return e.json()})}))})).then(function(e){t._fullList=zip(e[0],e[1]).map(getCardData),t.$update()})},$init:function(){this._refresh()},$update:function(){var e=this;this._list=this._fullList.filter(function(t){return t.alt.includes(e._searchFilter.toLowerCase())&&TAB_DECISIONS[e._currentFilter][null===t.streaming&1]}),this.$components=[TabList(TABS),StreamerList()]}}},search=SearchBar(),root=App(STREAMER_LIST);
//# sourceMappingURL=main.js.map