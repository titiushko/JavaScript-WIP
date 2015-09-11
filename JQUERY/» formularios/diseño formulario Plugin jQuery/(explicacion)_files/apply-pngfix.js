//apply to div#logo, undo fix, then apply the fix again 
$(function(){
	window.onload=function(){$('img[@src$=.png], #global-haut, .moreleft, .moreright, .more').ifixpng();}
}); 
 
