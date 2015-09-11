  function GenerateNewWindowLightbox(NewWindowURL, WindowTitle, e) {
    //Generate Random ID
    Randomnumber = Math.floor(Math.random()*1000000);
    //Config
    StartWindowOuterWidth  = 200;
    StartWindowOuterHeight = 100;      
    EndWindowOuterWidth    = 800;
    EndWindowOuterHeight   = 400;      
    //If Windows to big
    MinSpacing = 20;
    if (WindowTitle == '') WindowTitle = NewWindowURL;
    
    
    //#########################################################################
    //Check Content Type ------------------------------------------------------
    //#########################################################################
    var ext = NewWindowURL.split('.').pop().toLowerCase();
    var allow = new Array('gif','png','jpg','jpeg');
    if(jQuery.inArray(ext, allow) != -1) {
      WindowType = 'Image';
    } else {
      WindowType = 'Link';
    }
    if(WindowType == 'Image') {
      //#######################################################################
      //Image Type ------------------------------------------------------------
      //#######################################################################
      $('body').append(
        '<div id="'+Randomnumber+'">' +
        '  <image src="'+NewWindowURL+'" style="border: 0px;">' +
        '</div>');    
      //Resize to big Images to Viewport
      MinSpacing = 20;
      if (
        (($(window).width()-32-MinSpacing)  < $('#'+Randomnumber).find('img').width()) ||
        (($(window).height()-72-MinSpacing) < $('#'+Randomnumber).find('img').height())
      ) {
        a = $(window).width()+32+MinSpacing  - $('#'+Randomnumber).find('img').width();
        b = $(window).height()+72+MinSpacing - $('#'+Randomnumber).find('img').height();
        if (a < b) {
          EndWindowOuterWidth  = $(window).width()-MinSpacing;
          EndWindowOuterHeight = ($('#'+Randomnumber).find('img').height() / ($('#'+Randomnumber).find('img').width()/($(window).width())))-MinSpacing;
        } else {
          EndWindowOuterWidth  = ($('#'+Randomnumber).find('img').width() / ($('#'+Randomnumber).find('img').height()/($(window).height())))-MinSpacing;
          EndWindowOuterHeight = $(window).height()-MinSpacing;
        }
      } else {
        EndWindowOuterWidth  = 32+($('#'+Randomnumber).find('img').width());
        EndWindowOuterHeight = 72+($('#'+Randomnumber).find('img').height());
      }
      $('#'+Randomnumber).find('img').css({
        width: '100%',
        height: '100%'
      });
      //Window Icon
      $("body").append('<img id="tmpIcon" style="visibility: hidden" src="'+NewWindowURL+'/favicon.ico">');
      if ($("#tmpIcon").width() == 0 || $("#tmpIcon").width() == 28 ) {
        image = 'images/icons/default.png';
      } else {
        image = NewWindowURL+'/favicon.ico';
      }
    } else {
      //#######################################################################
      //Link Type -------------------------------------------------------------
      //#######################################################################
      $('body').append(
        '<div id="'+Randomnumber+'">' +
         '<table style="height: 100%; width: 100%"><tr><td style="text-align: center"><img src="images/loading.gif"></td></tr></table>'+
        '</div>');    
      //Resize to big Windows to Viewport
      if (
        (($(window).width()-MinSpacing)  < EndWindowOuterWidth) ||
        (($(window).height()-MinSpacing) < EndWindowOuterHeight)
      ) {
        a = $(window).width()+MinSpacing  - EndWindowOuterWidth;
        b = $(window).height()+MinSpacing - EndWindowOuterHeight;
        if (a < b) {
          WindowOuterWidth  = $(window).width()-MinSpacing;
          WindowOuterHeight = (EndWindowOuterHeight / (EndWindowOuterWidth/($(window).width())))-MinSpacing;
        } else {
          WindowOuterWidth  = (EndWindowOuterWidth / (EndWindowOuterHeight/($(window).height())))-MinSpacing;
          WindowOuterHeight = $(window).height()-MinSpacing;
        }
        EndWindowOuterWidth  = WindowOuterWidth;
        EndWindowOuterHeight = WindowOuterHeight;
      }
      //Window Icon
      $("body").append('<img id="tmpIcon" style="visibility: hidden" src="'+NewWindowURL+'/favicon.ico">');
      if ($("#tmpIcon").width() == 0 || $("#tmpIcon").width() == 28 ) {
        image = 'images/icons/default.png';
      } else {
        image = NewWindowURL+'/favicon.ico';
      } 
    }
    //#########################################################################
    //#########################################################################
    //#########################################################################    
    //Set Opacity 50%
    if ( !$.browser.msie ) {
      $('#'+Randomnumber).css({
        opacity: 0.5
      });
    } 
    //Build Window
    $('#'+Randomnumber).AeroWindow({
      WindowDesktopIconFile: image,
      WindowTitle:           WindowTitle,
      WindowPositionTop:     e.pageY-(StartWindowOuterHeight/2),
      WindowPositionLeft:    e.pageX-(StartWindowOuterWidth/2),
      WindowStatus:          'window',   
      WindowOuterWidth:      StartWindowOuterWidth,
      WindowOuterHeight:     StartWindowOuterHeight,
      WindowDesktopIcon:     false,
      WindowMinimize:        false
    });
    //Animate Window
    $('#'+Randomnumber).data('AeroWindow').set('WindowStatus', 'onChange');
    $('#'+Randomnumber).data('AeroWindow').set('WindowTop',  ($(window).height()/2) + $(window).scrollTop() - $('#'+Randomnumber).data('AeroWindow').get('WindowOuterHeight')/2);
    $('#'+Randomnumber).data('AeroWindow').set('WindowLeft', ($(window).width()/2) + $(window).scrollLeft() - $('#'+Randomnumber).data('AeroWindow').get('WindowOuterWidth')/2);
    $('#'+Randomnumber).data('AeroWindow').ResizeWindow('changeSize');
    //Animate Window
    $('#'+Randomnumber).data('AeroWindow').set('WindowStatus', 'onChange');
    $('#'+Randomnumber).data('AeroWindow').set('WindowOuterWidth',  EndWindowOuterWidth);
    $('#'+Randomnumber).data('AeroWindow').set('WindowOuterHeight', EndWindowOuterHeight);
    $('#'+Randomnumber).data('AeroWindow').set('WindowTop',  ($(window).height()/2) + $(window).scrollTop() - $('#'+Randomnumber).data('AeroWindow').get('WindowOuterHeight')/2);
    $('#'+Randomnumber).data('AeroWindow').set('WindowLeft', ($(window).width()/2) + $(window).scrollLeft() - $('#'+Randomnumber).data('AeroWindow').get('WindowOuterWidth')/2);
    $('#'+Randomnumber).data('AeroWindow').ResizeWindow('changeSize');
    //Drop Content 
    if(WindowType == 'Link') {
      window.setTimeout(function() {
        $('#'+Randomnumber).find('.table-mm-content').html('<iframe src="'+NewWindowURL+'" width="100%" height="100%" style="border: 0px;" frameborder="0"></iframe><div class="iframeHelper"></div>');
      }, 2500);      
    }
    $("body #tmpIcon").remove();
  }
