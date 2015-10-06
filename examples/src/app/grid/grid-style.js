"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var gridSpacing=8;var gridSpacingPx=gridSpacing+"px";var itemWidth=210;var itemWidthPx=itemWidth+"px";var imageHolderPadding=10;var imageHolderPaddingPx=imageHolderPadding+"px";var makeMediaStyle=function makeMediaStyle(which,cols){return _defineProperty({},"@media ("+which+"-width: "+((cols+1)*itemWidth+cols*gridSpacing)+"px)",{".scroll-view.grid":{" .scroll-content":{" .content":{width:cols*itemWidth+(cols-1)*gridSpacing+"px"}}}})};var styles=[makeMediaStyle("min",4),makeMediaStyle("max",4),makeMediaStyle("max",3),makeMediaStyle("max",2),makeMediaStyle("max",1),{".scroll-view.grid":{margin:"0 auto"," .scroll-content":{padding:2*gridSpacing+"px 0"," .content":{margin:"0 auto","font-size":0," .page":{margin:"0 "+-gridSpacing/2+"px"}," .grid-item":{display:"inline-block",height:itemWidthPx,width:itemWidthPx,"background-color":"#f0f0f0",margin:[0,gridSpacing/2,gridSpacing,gridSpacing/2].map(function(v){return v+"px"}).join(" ")," .image-holder":{height:itemWidth-2*imageHolderPadding+"px",width:itemWidth-2*imageHolderPadding+"px",overflow:"hidden",position:"relative",margin:imageHolderPaddingPx," .image":{position:"absolute",left:"auto",top:0,right:"auto",bottom:0,width:"100%","background-size":"contain","background-repeat":"no-repeat","background-position-x":"50%"}}}}}}}];exports["default"]=styles;module.exports=exports["default"];