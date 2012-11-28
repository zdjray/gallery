define("gallery/backbone/0.9.2/backbone",["gallery/underscore/1.4.2/underscore","$"],function(e,t){var n=this._,r=this.jQuery;this._=e("gallery/underscore/1.4.2/underscore"),this.jQuery=e("$"),function(){var n=this,r=n.Backbone,i=Array.prototype.slice,s=Array.prototype.splice,o;typeof t!="undefined"?o=t:o=n.Backbone={},o.VERSION="0.9.2";var u=n._;!u&&typeof e!="undefined"&&(u=e("gallery/underscore/1.4.2/underscore"));var a=n.jQuery||n.Zepto||n.ender;o.setDomLibrary=function(e){a=e},o.noConflict=function(){return n.Backbone=r,this},o.emulateHTTP=!1,o.emulateJSON=!1;var f=/\s+/,l=o.Events={on:function(e,t,n){var r,i,s,o,u;if(!t)return this;e=e.split(f),r=this._callbacks||(this._callbacks={});while(i=e.shift())u=r[i],s=u?u.tail:{},s.next=o={},s.context=n,s.callback=t,r[i]={tail:o,next:u?u.next:s};return this},off:function(e,t,n){var r,i,s,o,a,l;if(!(i=this._callbacks))return;if(!(e||t||n))return delete this._callbacks,this;e=e?e.split(f):u.keys(i);while(r=e.shift()){s=i[r],delete i[r];if(!s||!t&&!n)continue;o=s.tail;while((s=s.next)!==o)a=s.callback,l=s.context,(t&&a!==t||n&&l!==n)&&this.on(r,a,l)}return this},trigger:function(e){var t,n,r,s,o,u,a;if(!(r=this._callbacks))return this;u=r.all,e=e.split(f),a=i.call(arguments,1);while(t=e.shift()){if(n=r[t]){s=n.tail;while((n=n.next)!==s)n.callback.apply(n.context||this,a)}if(n=u){s=n.tail,o=[t].concat(a);while((n=n.next)!==s)n.callback.apply(n.context||this,o)}}return this}};l.bind=l.on,l.unbind=l.off;var c=o.Model=function(e,t){var n;e||(e={}),t&&t.parse&&(e=this.parse(e));if(n=L(this,"defaults"))e=u.extend({},n,e);t&&t.collection&&(this.collection=t.collection),this.attributes={},this._escapedAttributes={},this.cid=u.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(e,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=u.clone(this.attributes),this.initialize.apply(this,arguments)};u.extend(c.prototype,l,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(e){return u.clone(this.attributes)},get:function(e){return this.attributes[e]},escape:function(e){var t;if(t=this._escapedAttributes[e])return t;var n=this.get(e);return this._escapedAttributes[e]=u.escape(n==null?"":""+n)},has:function(e){return this.get(e)!=null},set:function(e,t,n){var r,i,s;u.isObject(e)||e==null?(r=e,n=t):(r={},r[e]=t),n||(n={});if(!r)return this;r instanceof c&&(r=r.attributes);if(n.unset)for(i in r)r[i]=void 0;if(!this._validate(r,n))return!1;this.idAttribute in r&&(this.id=r[this.idAttribute]);var o=n.changes={},a=this.attributes,f=this._escapedAttributes,l=this._previousAttributes||{};for(i in r){s=r[i];if(!u.isEqual(a[i],s)||n.unset&&u.has(a,i))delete f[i],(n.silent?this._silent:o)[i]=!0;n.unset?delete a[i]:a[i]=s,!u.isEqual(l[i],s)||u.has(a,i)!=u.has(l,i)?(this.changed[i]=s,n.silent||(this._pending[i]=!0)):(delete this.changed[i],delete this._pending[i])}return n.silent||this.change(n),this},unset:function(e,t){return(t||(t={})).unset=!0,this.set(e,null,t)},clear:function(e){return(e||(e={})).unset=!0,this.set(u.clone(this.attributes),e)},fetch:function(e){e=e?u.clone(e):{};var t=this,n=e.success;return e.success=function(r,i,s){if(!t.set(t.parse(r,s),e))return!1;n&&n(t,r)},e.error=o.wrapError(e.error,t,e),(this.sync||o.sync).call(this,"read",this,e)},save:function(e,t,n){var r,i;u.isObject(e)||e==null?(r=e,n=t):(r={},r[e]=t),n=n?u.clone(n):{};if(n.wait){if(!this._validate(r,n))return!1;i=u.clone(this.attributes)}var s=u.extend({},n,{silent:!0});if(r&&!this.set(r,n.wait?s:n))return!1;var a=this,f=n.success;n.success=function(e,t,i){var s=a.parse(e,i);n.wait&&(delete n.wait,s=u.extend(r||{},s));if(!a.set(s,n))return!1;f?f(a,e):a.trigger("sync",a,e,n)},n.error=o.wrapError(n.error,a,n);var l=this.isNew()?"create":"update",c=(this.sync||o.sync).call(this,l,this,n);return n.wait&&this.set(i,s),c},destroy:function(e){e=e?u.clone(e):{};var t=this,n=e.success,r=function(){t.trigger("destroy",t,t.collection,e)};if(this.isNew())return r(),!1;e.success=function(i){e.wait&&r(),n?n(t,i):t.trigger("sync",t,i,e)},e.error=o.wrapError(e.error,t,e);var i=(this.sync||o.sync).call(this,"delete",this,e);return e.wait||r(),i},url:function(){var e=L(this,"urlRoot")||L(this.collection,"url")||A();return this.isNew()?e:e+(e.charAt(e.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(e,t){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(e){e||(e={});var t=this._changing;this._changing=!0;for(var n in this._silent)this._pending[n]=!0;var r=u.extend({},e.changes,this._silent);this._silent={};for(var n in r)this.trigger("change:"+n,this,this.get(n),e);if(t)return this;while(!u.isEmpty(this._pending)){this._pending={},this.trigger("change",this,e);for(var n in this.changed){if(this._pending[n]||this._silent[n])continue;delete this.changed[n]}this._previousAttributes=u.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(e){return arguments.length?u.has(this.changed,e):!u.isEmpty(this.changed)},changedAttributes:function(e){if(!e)return this.hasChanged()?u.clone(this.changed):!1;var t,n=!1,r=this._previousAttributes;for(var i in e){if(u.isEqual(r[i],t=e[i]))continue;(n||(n={}))[i]=t}return n},previous:function(e){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[e]},previousAttributes:function(){return u.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(e,t){if(t.silent||!this.validate)return!0;e=u.extend({},this.attributes,e);var n=this.validate(e,t);return n?(t&&t.error?t.error(this,n,t):this.trigger("error",this,n,t),!1):!0}});var h=o.Collection=function(e,t){t||(t={}),t.model&&(this.model=t.model),t.comparator&&(this.comparator=t.comparator),this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,{silent:!0,parse:t.parse})};u.extend(h.prototype,l,{model:c,initialize:function(){},toJSON:function(e){return this.map(function(t){return t.toJSON(e)})},add:function(e,t){var n,r,i,o,a,f,l={},c={},h=[];t||(t={}),e=u.isArray(e)?e.slice():[e];for(n=0,i=e.length;n<i;n++){if(!(o=e[n]=this._prepareModel(e[n],t)))throw new Error("Can't add an invalid model to a collection");a=o.cid,f=o.id;if(l[a]||this._byCid[a]||f!=null&&(c[f]||this._byId[f])){h.push(n);continue}l[a]=c[f]=o}n=h.length;while(n--)e.splice(h[n],1);for(n=0,i=e.length;n<i;n++)(o=e[n]).on("all",this._onModelEvent,this),this._byCid[o.cid]=o,o.id!=null&&(this._byId[o.id]=o);this.length+=i,r=t.at!=null?t.at:this.models.length,s.apply(this.models,[r,0].concat(e)),this.comparator&&this.sort({silent:!0});if(t.silent)return this;for(n=0,i=this.models.length;n<i;n++){if(!l[(o=this.models[n]).cid])continue;t.index=n,o.trigger("add",o,this,t)}return this},remove:function(e,t){var n,r,i,s;t||(t={}),e=u.isArray(e)?e.slice():[e];for(n=0,r=e.length;n<r;n++){s=this.getByCid(e[n])||this.get(e[n]);if(!s)continue;delete this._byId[s.id],delete this._byCid[s.cid],i=this.indexOf(s),this.models.splice(i,1),this.length--,t.silent||(t.index=i,s.trigger("remove",s,this,t)),this._removeReference(s)}return this},push:function(e,t){return e=this._prepareModel(e,t),this.add(e,t),e},pop:function(e){var t=this.at(this.length-1);return this.remove(t,e),t},unshift:function(e,t){return e=this._prepareModel(e,t),this.add(e,u.extend({at:0},t)),e},shift:function(e){var t=this.at(0);return this.remove(t,e),t},get:function(e){return e==null?void 0:this._byId[e.id!=null?e.id:e]},getByCid:function(e){return e&&this._byCid[e.cid||e]},at:function(e){return this.models[e]},where:function(e){return u.isEmpty(e)?[]:this.filter(function(t){for(var n in e)if(e[n]!==t.get(n))return!1;return!0})},sort:function(e){e||(e={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");var t=u.bind(this.comparator,this);return this.comparator.length==1?this.models=this.sortBy(t):this.models.sort(t),e.silent||this.trigger("reset",this,e),this},pluck:function(e){return u.map(this.models,function(t){return t.get(e)})},reset:function(e,t){e||(e=[]),t||(t={});for(var n=0,r=this.models.length;n<r;n++)this._removeReference(this.models[n]);return this._reset(),this.add(e,u.extend({silent:!0},t)),t.silent||this.trigger("reset",this,t),this},fetch:function(e){e=e?u.clone(e):{},e.parse===undefined&&(e.parse=!0);var t=this,n=e.success;return e.success=function(r,i,s){t[e.add?"add":"reset"](t.parse(r,s),e),n&&n(t,r)},e.error=o.wrapError(e.error,t,e),(this.sync||o.sync).call(this,"read",this,e)},create:function(e,t){var n=this;t=t?u.clone(t):{},e=this._prepareModel(e,t);if(!e)return!1;t.wait||n.add(e,t);var r=t.success;return t.success=function(i,s,o){t.wait&&n.add(i,t),r?r(i,s):i.trigger("sync",e,s,t)},e.save(null,t),e},parse:function(e,t){return e},chain:function(){return u(this.models).chain()},_reset:function(e){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(e,t){t||(t={});if(e instanceof c)e.collection||(e.collection=this);else{var n=e;t.collection=this,e=new this.model(n,t),e._validate(e.attributes,t)||(e=!1)}return e},_removeReference:function(e){this==e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,r){if((e=="add"||e=="remove")&&n!=this)return;e=="destroy"&&this.remove(t,r),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],this._byId[t.id]=t),this.trigger.apply(this,arguments)}});var p=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];u.each(p,function(e){h.prototype[e]=function(){return u[e].apply(u,[this.models].concat(u.toArray(arguments)))}});var d=o.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},v=/:\w+/g,m=/\*\w+/g,g=/[-[\]{}()+?.,\\^$|#\s]/g;u.extend(d.prototype,l,{initialize:function(){},route:function(e,t,n){return o.history||(o.history=new y),u.isRegExp(e)||(e=this._routeToRegExp(e)),n||(n=this[t]),o.history.route(e,u.bind(function(r){var i=this._extractParameters(e,r);n&&n.apply(this,i),this.trigger.apply(this,["route:"+t].concat(i)),o.history.trigger("route",this,t,i)},this)),this},navigate:function(e,t){o.history.navigate(e,t)},_bindRoutes:function(){if(!this.routes)return;var e=[];for(var t in this.routes)e.unshift([t,this.routes[t]]);for(var n=0,r=e.length;n<r;n++)this.route(e[n][0],e[n][1],this[e[n][1]])},_routeToRegExp:function(e){return e=e.replace(g,"\\$&").replace(v,"([^/]+)").replace(m,"(.*?)"),new RegExp("^"+e+"$")},_extractParameters:function(e,t){return e.exec(t).slice(1)}});var y=o.History=function(){this.handlers=[],u.bindAll(this,"checkUrl")},b=/^[#\/]/,w=/msie [\w.]+/;y.started=!1,u.extend(y.prototype,l,{interval:50,getHash:function(e){var t=e?e.location:window.location,n=t.href.match(/#(.*)$/);return n?n[1]:""},getFragment:function(e,t){if(e==null)if(this._hasPushState||t){e=window.location.pathname;var n=window.location.search;n&&(e+=n)}else e=this.getHash();return e.indexOf(this.options.root)||(e=e.substr(this.options.root.length)),e.replace(b,"")},start:function(e){if(y.started)throw new Error("Backbone.history has already been started");y.started=!0,this.options=u.extend({},{root:"/"},this.options,e),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var t=this.getFragment(),n=document.documentMode,r=w.exec(navigator.userAgent.toLowerCase())&&(!n||n<=7);r&&(this.iframe=a('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(t)),this._hasPushState?a(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?a(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=t;var i=window.location,s=i.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!s)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&s&&i.hash&&(this.fragment=this.getHash().replace(b,""),window.history.replaceState({},document.title,i.protocol+"//"+i.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){a(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),y.started=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(e){var t=this.getFragment();t==this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe)));if(t==this.fragment)return!1;this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(e){var t=this.fragment=this.getFragment(e),n=u.any(this.handlers,function(e){if(e.route.test(t))return e.callback(t),!0});return n},navigate:function(e,t){if(!y.started)return!1;if(!t||t===!0)t={trigger:t};var n=(e||"").replace(b,"");if(this.fragment==n)return;this._hasPushState?(n.indexOf(this.options.root)!=0&&(n=this.options.root+n),this.fragment=n,window.history[t.replace?"replaceState":"pushState"]({},document.title,n)):this._wantsHashChange?(this.fragment=n,this._updateHash(window.location,n,t.replace),this.iframe&&n!=this.getFragment(this.getHash(this.iframe))&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,n,t.replace))):window.location.assign(this.options.root+e),t.trigger&&this.loadUrl(e)},_updateHash:function(e,t,n){n?e.replace(e.toString().replace(/(javascript:|#).*$/,"")+"#"+t):e.hash=t}});var E=o.View=function(e){this.cid=u.uniqueId("view"),this._configure(e||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},S=/^(\S+)\s*(.*)$/,x=["model","collection","el","id","attributes","className","tagName"];u.extend(E.prototype,l,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(e,t,n){var r=document.createElement(e);return t&&a(r).attr(t),n&&a(r).html(n),r},setElement:function(e,t){return this.$el&&this.undelegateEvents(),this.$el=e instanceof a?e:a(e),this.el=this.$el[0],t!==!1&&this.delegateEvents(),this},delegateEvents:function(e){if(!e&&!(e=L(this,"events")))return;this.undelegateEvents();for(var t in e){var n=e[t];u.isFunction(n)||(n=this[e[t]]);if(!n)throw new Error('Method "'+e[t]+'" does not exist');var r=t.match(S),i=r[1],s=r[2];n=u.bind(n,this),i+=".delegateEvents"+this.cid,s===""?this.$el.bind(i,n):this.$el.delegate(s,i,n)}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(e){this.options&&(e=u.extend({},this.options,e));for(var t=0,n=x.length;t<n;t++){var r=x[t];e[r]&&(this[r]=e[r])}this.options=e},_ensureElement:function(){if(!this.el){var e=L(this,"attributes")||{};this.id&&(e.id=this.id),this.className&&(e["class"]=this.className),this.setElement(this.make(this.tagName,e),!1)}else this.setElement(this.el,!1)}});var T=function(e,t){var n=k(this,e,t);return n.extend=this.extend,n};c.extend=h.extend=d.extend=E.extend=T;var N={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};o.sync=function(e,t,n){var r=N[e];n||(n={});var i={type:r,dataType:"json"};return n.url||(i.url=L(t,"url")||A()),!n.data&&t&&(e=="create"||e=="update")&&(i.contentType="application/json",i.data=JSON.stringify(t.toJSON())),o.emulateJSON&&(i.contentType="application/x-www-form-urlencoded",i.data=i.data?{model:i.data}:{}),o.emulateHTTP&&(r==="PUT"||r==="DELETE")&&(o.emulateJSON&&(i.data._method=r),i.type="POST",i.beforeSend=function(e){e.setRequestHeader("X-HTTP-Method-Override",r)}),i.type!=="GET"&&!o.emulateJSON&&(i.processData=!1),a.ajax(u.extend(i,n))},o.wrapError=function(e,t,n){return function(r,i){i=r===t?i:r,e?e(t,i,n):t.trigger("error",t,i,n)}};var C=function(){},k=function(e,t,n){var r;return t&&t.hasOwnProperty("constructor")?r=t.constructor:r=function(){e.apply(this,arguments)},u.extend(r,e),C.prototype=e.prototype,r.prototype=new C,t&&u.extend(r.prototype,t),n&&u.extend(r,n),r.prototype.constructor=r,r.__super__=e.prototype,r},L=function(e,t){return!e||!e[t]?null:u.isFunction(e[t])?e[t]():e[t]},A=function(){throw new Error('A "url" property or function must be specified')}}.call(this),this._=n,this.jQuery=r});