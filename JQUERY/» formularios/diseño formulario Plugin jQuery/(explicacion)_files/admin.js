var oDialogAdmin=null;
var iDialogWidth=800;
var strFileEditorUrl=false;

//script à charger lors d'un ctrl+a
var	$tabScriptsToLoadDialog = new Array(

		SITE_URL+'vendors/jscripts/jqueryui/jquery-ui-pollencms-1.5.2.min.js',
		SITE_URL+'core/jscripts/ui.dialog.extra.js',
		SITE_URL+'vendors/jscripts/jqueryplugins/jquery.metadata.js'

	);

//chargement de la page, on ne charge que les hotkeys
$(function(){
	initHotkeys();
});

function loadJS(tab, callback){
	loadScript(0, tab, callback);
}
function loadScript(iIndex, tab, callBack){
	//fin du chargement, on lance la fonction
	if(iIndex == tab.length) {
		//because safari sometimes bugs add a timeout before exec the action
		if($.browser.safari)
			setTimeout(callBack.apply(),200);
		else
			callBack.apply(); 
		return;
	}
	var iNext = iIndex+1;
	$.ajax({
		type: "GET",
		url: tab[iIndex],
		data: null,
		success: function(){loadScript(iNext, tab, callBack);},
		dataType: 'script',
		cache:true
	});
}

function initHotkeys (){
	//ADMIN HOT KEYS ACTIONS
	$.hotkeys.add('Ctrl+a', function(){
		if(oDialogAdmin == null){
			loadJS($tabScriptsToLoadDialog, initDialog);return;
		}
		if(oDialogAdmin.parents(".ui-dialog").is(':visible')){
			oDialogAdmin.dialog('close');
		}
		else {
			oDialogAdmin.dialog('openAdmin');
		}
	});
	$.hotkeys.add('Ctrl+j', function(){
		if(oDialogAdmin != null){oDialogAdmin.dialog('fullscreen');}
	});
	$.hotkeys.add('Ctrl+e', function(){
		if(current_page_path) {
			var urlEditorRelative= 'admin_file_editor.php?file='+escape(current_page_path);
			var ulrEditorAbsolute = SITE_URL+'core/admin/'+urlEditorRelative;
			if(oDialogAdmin==null){loadJS($tabScriptsToLoadDialog, function(){initDialog(ulrEditorAbsolute);});return;}
			else {
				var oIFrame = $('iframe',oDialogAdmin);
				//si la page courante est la page d'édition on réouvre sans changer d'url
				if(oDialogAdmin){
					var currentUrl = oDialogAdmin.data('current_url');
					if( unescape(currentUrl).indexOf(urlEditorRelative)>-1 || (!currentUrl && oIFrame.attr('src') == ulrEditorAbsolute) ){
						!oDialogAdmin.parents('.ui-dialog').is(':visible') && oDialogAdmin.dialog('openAdmin');
						return;
					}						
				}
				oIFrame.attr('src', ulrEditorAbsolute);
				!oDialogAdmin.parents('.ui-dialog').is(':visible') && oDialogAdmin.dialog('openAdmin');
			}
		}
		else{
			alert("Cette page n'est pas éditable.");
		}
	});
}

function initDialog(strFileEditorUrl){
	if(!strFileEditorUrl)
		strFileEditorUrl=SITE_URL+'core/admin/admin.php';
	//Iframe that contains the admin page
	var oIFrame = $('<iframe frameborder="0" hspace="0" class="frameContent"></iframe>')
		.attr({'src':strFileEditorUrl, 'frameborder':'0', 'hspace':'0'});

	//The adming window object
	//attention option autoResize casse tout
	oDialogAdmin=$('<div>')
	.addClass('pcms')
	.css({'overflow':'hidden','background':'#F5F5F5'})
	.append(oIFrame)
	.dialog({title:"Panneau d'Administration",width:iDialogWidth,height:100, position:Array('center',20),autoResize:false,resizable:false,modal:false,dragable:true,autoOpen:false,bgiframe:false})
	.bind('dialogclose',function(){
		if($.browser.mozilla)
			$('body').find('embed').css('visibility','visible');	
		window.focus();	
	})
	.bind('dialogopen',function(){
		//a cause d'un bug dans ui dialog qui fait un appendTo a chaque ouverture on doit
		//passer par une autre fonction
	});
	
	if($.browser.mozilla)
		$('body').find('embed').css('visibility','hidden');			

	oDialogAdmin.dialog('open');
}

function max(i,j){
	return (i<j)?j:i;
}
