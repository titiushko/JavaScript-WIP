/********************************************************************************************/
/* AJAX Simple Tabs by developersnippets, This code is intended for practice purposes.      */
/* You may use these functions as you wish, for commercial or non-commercial applications,  */
/* but please note that the author offers no guarantees to their usefulness, suitability or */
/* correctness, and accepts no liability for any losses caused by their use.                */
/********************************************************************************************/

var req;
function callPage(pageUrl, divElementId, loadinglMessage, pageErrorMessage) {
     document.getElementById(divElementId).innerHTML = loadinglMessage;
     try {
     req = new XMLHttpRequest(); /* e.g. Firefox */
     } catch(e) {
       try {
       req = new ActiveXObject("Msxml2.XMLHTTP");  /* some versions IE */
       } catch (e) {
         try {
         req = new ActiveXObject("Microsoft.XMLHTTP");  /* some versions IE */
         } catch (E) {
          req = false;
         } 
       } 
     }
     req.onreadystatechange = function() {responsefromServer(divElementId, pageErrorMessage);};
     req.open("GET",pageUrl,true);
     req.send(null);
  }

function responsefromServer(divElementId, pageErrorMessage) {
   var output = '';
   if(req.readyState == 4) {
      if(req.status == 200) {
         output = req.responseText;
         document.getElementById(divElementId).innerHTML = output;
         } else {
         document.getElementById(divElementId).innerHTML = pageErrorMessage+"\n"+output;
         }
      }
  }
  
/* This Function is for Tab Panels */
function activeTab(tab)
	{   
		document.getElementById("tab1").className = "";
		document.getElementById("tab2").className = "";
		document.getElementById("tab3").className = "";
		document.getElementById("tab"+tab).className = "active";
		if(tab == 1) // If your tabs are more, then you can use 'switch' condition instead of 'if' condition for better practice
		{callPage('contentpage1.html', 'content', '<img src=\"images/loading.gif\" /> Content is loading, Please Wait...', 'Error in Loading page <img src=\"images/error_caution.gif\" />');
		}else if(tab == 2){
		callPage('contentpage2.html', 'content', '<img src=\"images/loading.gif\" /> Content is loading, Please Wait...', 'Error in Loading page <img src=\"images/error_caution.gif\" />');
		}else
		callPage('contentpage3.html', 'content', '<img src=\"images/loading.gif\" /> Content is loading, Please Wait...', 'Error in Loading page <img src=\"images/error_caution.gif\" />');
	}