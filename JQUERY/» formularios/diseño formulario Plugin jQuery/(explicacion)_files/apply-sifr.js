$(function(){
	if(typeof sIFR == "function"){
		    sIFR.replaceElement(".titreHeader h1", named({sFlashSrc: THEME_URL+"/swf/helvetica.swf", sColor: "#FFFFFF", sCase: "upper", sWmode:"transparent"}));
		    sIFR.replaceElement(".titreHeader h2", named({sFlashSrc: THEME_URL+"/swf/helvetica.swf", sColor: "#FFFFFF", sCase: "upper", sWmode:"transparent"}));
	}
});