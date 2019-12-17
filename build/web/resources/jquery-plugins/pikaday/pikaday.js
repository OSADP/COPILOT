/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */
(function(a,b){"use strict";var d;if(typeof exports==="object"){try{d=require("moment");}catch(c){}module.exports=b(d);}else{if(typeof define==="function"&&define.amd){define(function(e){var f="moment";d=e.defined&&e.defined(f)?e(f):undefined;return b(d);});}else{a.Pikaday=b(a.moment);}}}(this,function(y){"use strict";var h=typeof y==="function",d=!!window.addEventListener,n=window.document,r=window.setTimeout,p=function(D,E,F,C){if(d){D.addEventListener(E,F,!!C);}else{D.attachEvent("on"+E,F);}},t=function(D,E,F,C){if(d){D.removeEventListener(E,F,!!C);}else{D.detachEvent("on"+E,F);}},B=function(D,C,F){var E;if(n.createEvent){E=n.createEvent("HTMLEvents");E.initEvent(C,true,false);E=v(E,F);D.dispatchEvent(E);}else{if(n.createEventObject){E=n.createEventObject();E=v(E,F);D.fireEvent("on"+C,E);}}},u=function(C){return C.trim?C.trim():C.replace(/^\s+|\s+$/g,"");},a=function(C,D){return(" "+C.className+" ").indexOf(" "+D+" ")!==-1;},k=function(C,D){if(!a(C,D)){C.className=(C.className==="")?D:C.className+" "+D;}},l=function(C,D){C.className=u((" "+C.className+" ").replace(" "+D+" "," "));},j=function(C){return(/Array/).test(Object.prototype.toString.call(C));},z=function(C){return(/Date/).test(Object.prototype.toString.call(C))&&!isNaN(C.getTime());},f=function(C){return C%4===0&&C%100!==0||C%400===0;},c=function(C,D){return[31,f(C)?29:28,31,30,31,30,31,31,30,31,30,31][D];},x=function(C){if(z(C)){C.setHours(0,0,0,0);}},o=function(D,C){return D.getTime()===C.getTime();},v=function(G,F,C){var E,D;for(E in F){D=G[E]!==undefined;if(D&&typeof F[E]==="object"&&F[E].nodeName===undefined){if(z(F[E])){if(C){G[E]=new Date(F[E].getTime());}}else{if(j(F[E])){if(C){G[E]=F[E].slice(0);}}else{G[E]=v({},F[E],C);}}}else{if(C||!D){G[E]=F[E];}}}return G;},i={field:null,bound:undefined,position:"bottom left",format:"YYYY-MM-DD",defaultDate:null,setDefaultDate:false,firstDay:0,minDate:null,maxDate:null,yearRange:10,minYear:0,maxYear:9999,minMonth:undefined,maxMonth:undefined,isRTL:false,yearSuffix:"",showMonthAfterYear:false,numberOfMonths:1,i18n:{previousMonth:"Previous Month",nextMonth:"Next Month",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},onSelect:null,onOpen:null,onClose:null,onDraw:null},A=function(E,C,D){C+=E.firstDay;while(C>=7){C-=7;}return D?E.i18n.weekdaysShort[C]:E.i18n.weekdays[C];},s=function(G,E,F,D,H){if(H){return'<td class="is-empty"></td>';}var C=[];if(D){C.push("is-disabled");}if(F){C.push("is-today");}if(E){C.push("is-selected");}return'<td data-day="'+G+'" class="'+C.join(" ")+'"><button class="pika-button" type="button">'+G+"</button></td>";},e=function(D,C){return"<tr>"+(C?D.reverse():D).join("")+"</tr>";},b=function(C){return"<tbody>"+C.join("")+"</tbody>";},w=function(E){var D,C=[];for(D=0;D<7;D++){C.push('<th scope="col"><abbr title="'+A(E,D)+'">'+A(E,D,true)+"</abbr></th>");}return"<thead>"+(E.isRTL?C.reverse():C).join("")+"</thead>";},q=function(O){var H,G,K,C=O._o,L=O._m,M=O._y,F=M===C.minYear,P=M===C.maxYear,J='<div class="pika-title">',E,N,D=true,I=true;for(K=[],H=0;H<12;H++){K.push('<option value="'+H+'"'+(H===L?" selected":"")+((F&&H<C.minMonth)||(P&&H>C.maxMonth)?"disabled":"")+">"+C.i18n.months[H]+"</option>");}E='<div class="pika-label">'+C.i18n.months[L]+'<select class="pika-select pika-select-month">'+K.join("")+"</select></div>";if(j(C.yearRange)){H=C.yearRange[0];G=C.yearRange[1]+1;}else{H=M-C.yearRange;G=1+M+C.yearRange;}for(K=[];H<G&&H<=C.maxYear;H++){if(H>=C.minYear){K.push('<option value="'+H+'"'+(H===M?" selected":"")+">"+(H)+"</option>");}}N='<div class="pika-label">'+M+C.yearSuffix+'<select class="pika-select pika-select-year">'+K.join("")+"</select></div>";if(C.showMonthAfterYear){J+=N+E;}else{J+=E+N;}if(F&&(L===0||C.minMonth>=L)){D=false;}if(P&&(L===11||C.maxMonth<=L)){I=false;}J+='<button class="pika-prev'+(D?"":" is-disabled")+'" type="button">'+C.i18n.previousMonth+"</button>";J+='<button class="pika-next'+(I?"":" is-disabled")+'" type="button">'+C.i18n.nextMonth+"</button>";return J+="</div>";},m=function(C,D){return'<table cellpadding="0" cellspacing="0" class="pika-table">'+w(C)+b(D)+"</table>";},g=function(E){var C=this,F=C.config(E);C._onMouseDown=function(H){if(!C._v){return;}H=H||window.event;var G=H.target||H.srcElement;if(!G){return;}if(!a(G,"is-disabled")){if(a(G,"pika-button")&&!a(G,"is-empty")){C.setDate(new Date(C._y,C._m,parseInt(G.innerHTML,10)));if(F.bound){r(function(){C.hide();},100);}return;}else{if(a(G,"pika-prev")){C.prevMonth();}else{if(a(G,"pika-next")){C.nextMonth();}}}}if(!a(G,"pika-select")){if(H.preventDefault){H.preventDefault();}else{H.returnValue=false;return false;}}else{C._c=true;}};C._onChange=function(H){H=H||window.event;var G=H.target||H.srcElement;if(!G){return;}if(a(G,"pika-select-month")){C.gotoMonth(G.value);}else{if(a(G,"pika-select-year")){C.gotoYear(G.value);}}};C._onInputChange=function(H){var G;if(H.firedBy===C){return;}if(h){G=y(F.field.value,F.format);G=(G&&G.isValid())?G.toDate():null;}else{G=new Date(Date.parse(F.field.value));}C.setDate(z(G)?G:null);if(!C._v){C.show();}};C._onInputFocus=function(){C.show();};C._onInputClick=function(){C.show();};C._onInputBlur=function(){if(!C._c){C._b=r(function(){C.hide();},50);}C._c=false;};C._onClick=function(H){H=H||window.event;var G=H.target||H.srcElement,I=G;if(!G){return;}if(!d&&a(G,"pika-select")){if(!G.onchange){G.setAttribute("onchange","return;");p(G,"change",C._onChange);}}do{if(a(I,"pika-single")){return;}}while((I=I.parentNode));if(C._v&&G!==F.trigger){C.hide();}};C.el=n.createElement("div");C.el.className="pika-single"+(F.isRTL?" is-rtl":"");p(C.el,"mousedown",C._onMouseDown,true);p(C.el,"change",C._onChange);if(F.field){if(F.bound){n.body.appendChild(C.el);}else{F.field.parentNode.insertBefore(C.el,F.field.nextSibling);}p(F.field,"change",C._onInputChange);if(!F.defaultDate){if(h&&F.field.value){F.defaultDate=y(F.field.value,F.format).toDate();}else{F.defaultDate=new Date(Date.parse(F.field.value));}F.setDefaultDate=true;}}var D=F.defaultDate;if(z(D)){if(F.setDefaultDate){C.setDate(D,true);}else{C.gotoDate(D);}}else{C.gotoDate(new Date());}if(F.bound){this.hide();C.el.className+=" is-bound";p(F.trigger,"click",C._onInputClick);p(F.trigger,"focus",C._onInputFocus);p(F.trigger,"blur",C._onInputBlur);}else{this.show();}};g.prototype={config:function(D){if(!this._o){this._o=v({},i,true);}var E=v(this._o,D,true);E.isRTL=!!E.isRTL;E.field=(E.field&&E.field.nodeName)?E.field:null;E.bound=!!(E.bound!==undefined?E.field&&E.bound:E.field);E.trigger=(E.trigger&&E.trigger.nodeName)?E.trigger:E.field;var C=parseInt(E.numberOfMonths,10)||1;E.numberOfMonths=C>4?4:C;if(!z(E.minDate)){E.minDate=false;}if(!z(E.maxDate)){E.maxDate=false;}if((E.minDate&&E.maxDate)&&E.maxDate<E.minDate){E.maxDate=E.minDate=false;}if(E.minDate){x(E.minDate);E.minYear=E.minDate.getFullYear();E.minMonth=E.minDate.getMonth();}if(E.maxDate){x(E.maxDate);E.maxYear=E.maxDate.getFullYear();E.maxMonth=E.maxDate.getMonth();}if(j(E.yearRange)){var F=new Date().getFullYear()-10;E.yearRange[0]=parseInt(E.yearRange[0],10)||F;E.yearRange[1]=parseInt(E.yearRange[1],10)||F;}else{E.yearRange=Math.abs(parseInt(E.yearRange,10))||i.yearRange;if(E.yearRange>100){E.yearRange=100;}}return E;},toString:function(C){return !z(this._d)?"":h?y(this._d).format(C||this._o.format):this._d.toDateString();},getMoment:function(){return h?y(this._d):null;},setMoment:function(C,D){if(h&&y.isMoment(C)){this.setDate(C.toDate(),D);}},getDate:function(){return z(this._d)?new Date(this._d.getTime()):null;},setDate:function(D,F){if(!D){this._d=null;return this.draw();}if(typeof D==="string"){D=new Date(Date.parse(D));}if(!z(D)){return;}var E=this._o.minDate,C=this._o.maxDate;if(z(E)&&D<E){D=E;}else{if(z(C)&&D>C){D=C;}}this._d=new Date(D.getTime());x(this._d);this.gotoDate(this._d);if(this._o.field){this._o.field.value=this.toString();B(this._o.field,"change",{firedBy:this});}if(!F&&typeof this._o.onSelect==="function"){this._o.onSelect.call(this,this.getDate());}},gotoDate:function(C){if(!z(C)){return;}this._y=C.getFullYear();this._m=C.getMonth();this.draw();},gotoToday:function(){this.gotoDate(new Date());},gotoMonth:function(C){if(!isNaN((C=parseInt(C,10)))){this._m=C<0?0:C>11?11:C;this.draw();}},nextMonth:function(){if(++this._m>11){this._m=0;this._y++;}this.draw();},prevMonth:function(){if(--this._m<0){this._m=11;this._y--;}this.draw();},gotoYear:function(C){if(!isNaN(C)){this._y=parseInt(C,10);this.draw();}},setMinDate:function(C){this._o.minDate=C;},setMaxDate:function(C){this._o.maxDate=C;},draw:function(F){if(!this._v&&!F){return;}var E=this._o,I=E.minYear,C=E.maxYear,G=E.minMonth,H=E.maxMonth;if(this._y<=I){this._y=I;if(!isNaN(G)&&this._m<G){this._m=G;}}if(this._y>=C){this._y=C;if(!isNaN(H)&&this._m>H){this._m=H;}}this.el.innerHTML=q(this)+this.render(this._y,this._m);if(E.bound){this.adjustPosition();if(E.field.type!=="hidden"){r(function(){E.trigger.focus();},1);}}if(typeof this._o.onDraw==="function"){var D=this;r(function(){D._o.onDraw.call(D);},0);}},adjustPosition:function(){var K=this._o.trigger,I=K,D=this.el.offsetWidth,L=this.el.offsetHeight,H=window.innerWidth||n.documentElement.clientWidth,G=window.innerHeight||n.documentElement.clientHeight,E=window.pageYOffset||n.body.scrollTop||n.documentElement.scrollTop,F,J,C;if(typeof K.getBoundingClientRect==="function"){C=K.getBoundingClientRect();F=C.left+window.pageXOffset;J=C.bottom+window.pageYOffset;}else{F=I.offsetLeft;J=I.offsetTop+I.offsetHeight;while((I=I.offsetParent)){F+=I.offsetLeft;J+=I.offsetTop;}}if(F+D>H||(this._o.position.indexOf("right")>-1&&F-D+K.offsetWidth>0)){F=F-D+K.offsetWidth;}if(J+L>G+E||(this._o.position.indexOf("top")>-1&&J-L-K.offsetHeight>0)){J=J-L-K.offsetHeight;}this.el.style.cssText=["position: absolute","left: "+F+"px","top: "+J+"px"].join(";");},render:function(M,L){var D=this._o,G=new Date(),Q=c(M,L),O=new Date(M,L,1).getDay(),J=[],S=[];x(G);if(D.firstDay>0){O-=D.firstDay;if(O<0){O+=7;}}var R=Q+O,E=R;while(E>7){E-=7;}R+=7-E;for(var I=0,C=0;I<R;I++){var N=new Date(M,L,1+(I-O)),P=(D.minDate&&N<D.minDate)||(D.maxDate&&N>D.maxDate),F=z(this._d)?o(N,this._d):false,K=o(N,G),H=I<O||I>=(Q+O);S.push(s(1+(I-O),F,K,P,H));if(++C===7){J.push(e(S,D.isRTL));S=[];C=0;}}return m(D,J);},isVisible:function(){return this._v;},show:function(){if(!this._v){if(this._o.bound){p(n,"click",this._onClick);}l(this.el,"is-hidden");this._v=true;this.draw();if(typeof this._o.onOpen==="function"){this._o.onOpen.call(this);}}},hide:function(){var C=this._v;if(C!==false){if(this._o.bound){t(n,"click",this._onClick);}this.el.style.cssText="";k(this.el,"is-hidden");this._v=false;if(C!==undefined&&typeof this._o.onClose==="function"){this._o.onClose.call(this);}}},destroy:function(){this.hide();t(this.el,"mousedown",this._onMouseDown,true);t(this.el,"change",this._onChange);if(this._o.field){t(this._o.field,"change",this._onInputChange);if(this._o.bound){t(this._o.trigger,"click",this._onInputClick);t(this._o.trigger,"focus",this._onInputFocus);t(this._o.trigger,"blur",this._onInputBlur);}}if(this.el.parentNode){this.el.parentNode.removeChild(this.el);}}};return g;}));