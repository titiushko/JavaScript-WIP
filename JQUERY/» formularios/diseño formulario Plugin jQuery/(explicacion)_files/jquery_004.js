/**
* jQuery paginate plugin.
* This is a paginate plugin for jquery
*
* Author: Mathieu Vilaplana <mvilaplana@df-e.com>
* Date: March 2008
* rev: 1.0
*
*/
(function($) {
	$.concat = function(){
		var objTarget=null;
		if(arguments.length == 0){return objTarget;}
		
		//get the first argument not null
		var iStart=-1;
		for(i=0;i<arguments.length;i++){
			if(arguments[i]){
				objTarget = arguments[i];
				iStart=i;
				break;
			}
		}
		if(iStart == -1){return objTarget;}
		
		
		for(i=(iStart+1);i<arguments.length;i++){
			objTemp = arguments[i];
			if(objTemp!=null && objTemp.length && objTemp.size() > 0){
				size=objTemp.size();
				for(j=0;j < size;j++) {
					objTarget[objTarget.length]=objTemp.get(j);
					objTarget.length+=1;
				}
			}
		}
		return objTarget;
	}
	$.fn.paginate = function(userOptions) {

		__showPage=function(pageNumber, $params){

			//hidde all the elements
			$params.childs.hide();
			$params.options.currentPage=pageNumber;
						
			
			$boxes =$params.boxes;

						
			$boxes.each(function(){
				var $linkChilds = $(this).children('a');
				$linkChilds.removeClass($params.options.classSelected);
				$linkChilds.eq(pageNumber+1).addClass($params.options.classSelected);
				
				//Activate desactivate first, previous, next, last links
				if(pageNumber != 1) {$linkChilds.eq(0).removeClass('unactive');$linkChilds.eq(1).removeClass('unactive');}
				else {$linkChilds.eq(0).addClass('unactive');$linkChilds.eq(1).addClass('unactive');}
				
				if(pageNumber != $params.options.nbPages){
					$linkChilds.eq(($params.options.nbPages+3)).removeClass('unactive');
					$linkChilds.eq(($params.options.nbPages+2)).removeClass('unactive');
				}
				else {
					$linkChilds.eq(($params.options.nbPages+2)).addClass('unactive');
					$linkChilds.eq(($params.options.nbPages+3)).addClass('unactive');
				}
				
				//hide the link if to much
				if($params.options.nbPagesMax!=false && $params.options.nbPagesMax < $params.options.nbPages){
					unit=$params.options.nbPagesMax/2;
					var $nbPageAfter= Math.ceil($params.options.nbPagesMax/2);
					var $nbPageBefore = $nbPageAfter;
					$nbPageAfter--;
					if( $nbPageBefore != $params.options.nbPagesMax/2){
						$nbPageBefore--;
						$nbPageBefore=($nbPageBefore<0)?0:$nbPageBefore;
					}
					var $pageStart = pageNumber-$nbPageBefore;
					var $pageEnd = pageNumber + $nbPageAfter;
					if($pageStart < 1){
						$pageEnd +=-$pageStart+1;
						$pageStart=1;
						if($pageEnd > $params.options.nbPages){$pageEnd=$params.options.nbPages;}
					}else {
						if($pageEnd > $params.options.nbPages){
							$pageStart += $params.options.nbPages-$pageEnd;
							$pageEnd=$params.options.nbPages;
							if($pageStart<1){$pageStart=1;}
						}
					}
					$linkChilds.hide();
					var $indexStart = $pageStart+1;
					var $indexEnd = $pageEnd+2;
					for(i=$indexStart;i<$indexEnd;i++){
						$linkChilds.eq(i).show();
					}
					$linkChilds.eq(0).show();
					$linkChilds.eq(1).show();
					$linkChilds.eq($params.options.nbPages+2).show();
					$linkChilds.eq($params.options.nbPages+3).show();
				}else {//show all links
					$linkChilds.show();
				}
			});
			$iStart = (pageNumber-1)*$params.options.nbElemsPerPage;
			$iEnd = $iStart+$params.options.nbElemsPerPage;
				for($i=$iStart;$i<$iEnd;$i++){
					$params.childs.eq($i).show();
				}
		}

		var $options = $.extend({currentPage:1},$.fn.paginate.defaultOptions,userOptions||{});
		//if paginate box is defined by default do not show the paginate after
		if($options.paginateBox){
			if(!userOptions.bShowAfter)
				$options.bShowAfter=false;
		}
		
		return this.each(function() {
			var $this=$(this);
			if($this.is('table') && (!userOptions || !userOptions.items)){
				$options = $.extend($options,{items:'tr'});
			}
			if($this.is('ul') && (!userOptions || !userOptions.items)){
				$options = $.extend($options,{items:'li'});
			}
			var $childs = $this.is('table')?$this.find($options.items):$this.children($options.items);

			//if paginate not necessary
			if($childs.size() < $options.nbElemsPerPage){
				if($options.paginateBox.size()>0)
					$options.paginateBox.hide();
				return;
			}
				
			var $boxPaginateModel = $('<div></div>').addClass($options.classPaginate);
			var $boxPaginateTop = null;
			var $boxPaginateBottom = null;

			if($options.bShowBefore){$boxPaginateTop= $boxPaginateModel.clone(true).insertBefore($this);}
			if($options.bShowAfter){$boxPaginateBottom=$boxPaginateModel.clone(true).insertAfter($this);}
			
			//number of pages
			var $nbPages = Math.ceil($childs.size()/ $options.nbElemsPerPage);
			$.extend($options,{nbPages:$nbPages});
			var $boxes = $.concat($boxPaginateTop, $boxPaginateBottom, $options.paginateBox);

			var params = {options:$options,childs:$childs,boxes:$boxes}

			//Add links to pages
			for($i=1;$i<=$nbPages;$i++){
				var myLink = $('<a></a>').addClass($options.classNumber).attr('href','#').html(' '+$i+' ').bind('click',$i,function($e){
					__showPage($e.data,params);
					return false;
				}).appendTo($boxes);
			}			
			
			//add prev and next link
			var $linkPrev=$('<a></a>').addClass($options.classPrev).attr('href','#').html($options.strPrev).bind('click',params,function($e){
				if($options.currentPage > 1){__showPage(($options.currentPage-1),$e.data);}
				return false;
			}).prependTo($boxes);
			var $linkNext=$('<a></a>').addClass($options.classNext).attr('href','#').html($options.strNext).bind('click',params,function($e){
				if($options.currentPage < $options.nbPages){__showPage($options.currentPage+1,$e.data);}
				return false;
			}).appendTo($boxes);
			//First and last link
			var $linkFirst = $('<a></a>').addClass($options.classFirst).attr('href','#').html($options.strFirst).bind('click',params,function($e){
				__showPage(1,$e.data);
				return false;
			}).prependTo($boxes);
			var $linkLast = $('<a></a>').addClass($options.classLast).attr('href','#').html($options.strLast).bind('click',params,function($e){
				__showPage($options.nbPages,$e.data);
				return false;
			}).appendTo($boxes);
			
			//
			$showPage = Math.ceil($options.startIndex/$options.nbElemsPerPage);
			__showPage($showPage,params);
		});//return each
	}
	
	$.fn.paginate.defaultOptions={
		items:'div',
		nbElemsPerPage: 4,
		nbPagesMax:false,
		classSelected:'selected',
		classPaginate :'paginate',
		bShowBefore:false,
		bShowAfter:true,
		paginateBox:null,
		startIndex:1,
		classNumber:'Number',
		classNext:'Next',
		classPrev:'Prev',
		classFirst:'First',
		classLast:'Last',
		strNext: ' > ',
		strPrev:' < ',
		strFirst:'<< ',
		strLast:' >>'
	}
	
})(jQuery);