"use strict";var c=function(r,e){return function(){try{return e||r((e={exports:{}}).exports,e),e.exports}catch(a){throw (e=0, a)}};};var q=c(function(B,f){
function R(r,e,a,i,l){var n,u,t,v,s,o;if(s=r-e,r<=0||s<=0)return NaN;if(r===1||i===0)return 0;for(u=l,n=0,t=0,o=0;o<r;o++)v=a[u],n+=v*v,t+=v,u+=i;return(n-t/r*t)/s}f.exports=R
});var x=c(function(C,p){
var S=require('@stdlib/strided-base-stride2offset/dist'),_=q();function E(r,e,a,i){return _(r,e,a,i,S(r,i))}p.exports=E
});var j=c(function(D,k){
var O=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),y=x(),b=q();O(y,"ndarray",b);k.exports=y
});var g=require("path").join,h=require('@stdlib/utils-try-require/dist'),w=require('@stdlib/assert-is-error/dist'),z=j(),d,m=h(g(__dirname,"./native.js"));w(m)?d=z:d=m;module.exports=d;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
