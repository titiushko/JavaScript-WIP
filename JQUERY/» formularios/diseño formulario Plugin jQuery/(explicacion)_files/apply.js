// test si 5e niveau alors enleve la puce du 4e.
$(function(){
				
		if( $('.abs').size() > 0 ) {
		
			//init
			iMarge = 20;
			iRouded = 10;
			
			// position du bloc "resume sous un bloc menu"              	
			iTop = $(".fourth-menu").innerHeight()+iMarge;
			$(".abs").css({top:iTop,'display':'block'});
			
			// augmentation de la hauteur de la colonne
			iHeight = $("#colonne-gauche34").innerHeight()+$(".abs").innerHeight()+iMarge+(2*iRouded);
			$("#colonne-gauche34").css({height:iHeight});

		}
		
		//Gestion de la puce sur le menu de gauche, on vient la placer en absolue, en face de la ligne sélectionner
		var oLinkSelected = $(".fourth-menu").find('a.selected:last');
		if(oLinkSelected.size()>0){
			var pos = oLinkSelected.offset();
			var posfourth = $(".fourth-menu").offset();		
			oPuce = $("#puceMenu").remove().appendTo('body');
			var iLeft = (posfourth.left+$(".fourth-menu").width());
			oPuce.css({position:'absolute',top:pos.top,left:iLeft}).css('display','block');
		}		

});