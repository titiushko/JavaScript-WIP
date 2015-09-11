/* 
   Carousel.us JavaScript Document
   Written by Ikonic (Pellevillain Cédric)
   Copyright (c) 2008 - 2009 Piksite.com 
   version 2.0 (05/27/2009)
   ---------------------------------------
   Some rights reserved. This work is licensed under a Creative Commons Attribution-Noncommercial 3.0 Unported License.
   
   You are free:

    * to Share — to copy, distribute and transmit the work
    * to Remix — to adapt the work

   Under the following conditions:

    * Attribution. You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
    * Noncommercial. You may not use this work for commercial purposes.

    * For any reuse or distribution, you must make clear to others the license terms of this work. The best way to do this is with a link to this web page.
    * Any of the above conditions can be waived if you get permission from the copyright holder.
    * Nothing in this license impairs or restricts the author's moral rights.
   
   If you want to include this work in a selling package, make a donation or mail me : contact@piksite.com        
*/

var Carousel = new Class({
	
	//implements
	Implements: [Options],

	//options
	options: {

    /* The options you can change */      
    display_text:  true,            // Display or not texts (true or false)
    textfield   :  'textfield',     // The id for the text container (string)
    texts_class :  'texts',         // The class for the div containing text (string)
    opacity     :  80/100,          // Reflection opacity (0-1)
    height      :  1/3,             // Reflection height (0-1)
    radiusx     :  400,             // Horizontal spacing between opposite images (pixel)
    radiusy     :  120,             // Vertical spacing between opposite images (pixel)
    centerx     :  240,             // Position X of the carousel center (pixel)
    centery     :  190,             // Position Y of the carousel center (pixel)
    clickit     :  true,            // Add onclick event on each image (true or false)
    base        :  0.15,            // Base speed (number)
    speed       :  0.05,            // Carousel speed (number)
    depth       :  100,             // The height (distance) when carousel disappears on click (pixels)
    duration    :  500,             // Animations duration (ms)
    zoomIn      :  75/100,          // Scale ratio (0-1)
    padding     :  10,              // The CSS padding-left for the textfield (pixels)
    
    /* You should not to have to modify these following options */      
    b           :  0,
    elt_posx    :  0,
    elt_posy    :  0,
    counter     :  0,
    tempX       :  0,
    elements    :  new Array(),
    texts       :  new Array(),
    zooms       :  new Array()
    
	},
	
	//initialization
	initialize: function(element,options) {	
		//set options
		this.setOptions(options);		
		this.options.element = element;		
		var global_images = this.options.element.getElements('img');	
    var images = new Array();
    global_images.each(function(img) {
      if(img.getParent('div').get('class') != this.options.texts_class) { images.push(img); }
    }.bind(this));	
    
    if(this.options.display_text==true) {
      var textfield = new Element('div', { 'id': this.options.textfield, 'styles': { 'visibility': 'hidden', 'opacity': '0' } }).inject(this.options.element);
      // get text for each image
      $$('.' + this.options.texts_class).each(function(text) { 
        this.options.texts[text.id] = text.innerHTML;
        text.destroy();
      }.bind(this));
    } else {
      $$('.' + this.options.texts_class).each(function(text) {
        text.destroy();
      });
    }
    // create each element
    images.each(function(photo,i) {
        id = photo.src.split('/');
        id = id[(id.length-1)].split('.')[0];
        var div = new Element('div', { 'id': id, 'class': 'carousel', 'styles': { 'position': 'absolute', 'opacity': '0' } }).inject(this.options.element); 
        if(this.options.clickit != false) { div.setStyle('cursor', 'pointer').addEvent('click', function() { this.Click(div.id); }.bind(this) ); }
        var img = new Element('img', { 'src': photo.src, 'alt': photo.get('alt') }).inject(div);
        this.reflect(img,{ 'height': this.options.height, 'opacity': this.options.opacity });        
				if (!Browser.Engine.trident) { img.destroy(); }        
        this.options.elements.include(id);
        photo.destroy();        
        this.options.zooms[i] = new Hash({
          'divX': [ div.getSize().x , Math.round(div.getSize().x * parseFloat(this.options.zoomIn)) ], 
          'divY': [ div.getSize().y , Math.round(div.getSize().y * parseFloat(this.options.zoomIn)) ]
        });         
    }.bind(this));	
    this.options.element.getElements('canvas').each(function(canvas,i) {      
        canvas.getParent('div').setStyles({ 'height': this.options.zooms[i]['divY'][1] + 'px', 'width': this.options.zooms[i]['divX'][1] + 'px' });
        canvas.setStyles({ 'width': this.options.zooms[i]['divX'][1] + 'px', 'height': this.options.zooms[i]['divY'][1] + 'px' });       
    }.bind(this));
		if (Browser.Engine.trident) { 
      this.options.element.getElements('div.carousel').each(function(ie_div,i) {        
        ie_div.setStyles({ 'height': this.options.zooms[i]['divY'][1] + 'px', 'width': this.options.zooms[i]['divX'][1] + 'px' });        
        ie_div.getElements('img').each(function(img,j) {
          img.setStyles({ 'width': img.width * parseFloat(this.options.zoomIn) + 'px', 'height': img.height * parseFloat(this.options.zoomIn) + 'px', 'visibility': 'visible' });
        }.bind(this));        
      }.bind(this));
    }
    this.options.element.onmousemove = this.position.bind(this);
    this.options.element.onmouseout = this.out.bind(this); 
		this.open();    		
	},
	
	// add reflection
	reflect: function(img,options) {	
		if (img.get('tag') == 'img') {		
			function doReflect() {			
				var global, reflection, reflectionHeight = Math.floor(img.height * options.height), wrapper, context, gradient;        
				if (Browser.Engine.trident) {
					reflection = new Element('img', {src: img.src, alt: img.get('alt'), styles: {
						width: img.width,
						height: img.height,
						marginBottom: -img.height + reflectionHeight,
						filter: "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + (options.opacity * 100) + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + (options.height * 100) + ")"
					}});
				  reflection.setStyles({display: "block", border: 0});
				  wrapper = new Element(($(img.parentNode).get("tag") == "a") ? "span" : "div").injectAfter(img).adopt(img, reflection);				
				} else {	
  				reflection = new Element('canvas', {width: img.width, height: reflectionHeight});		
  				context = reflection.getContext("2d");
  				context.save();
  				context.translate(0, img.height-1);
  				context.scale(1, -1);
  				context.drawImage(img, 0, 0, img.width, img.height);
  				context.restore();
  				context.globalCompositeOperation = "destination-out";
  				gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
  				gradient.addColorStop(0, "rgba(255, 255, 255, " + (1 - options.opacity) + ")");
  				gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
  				context.fillStyle = gradient;
  				context.rect(0, 0, img.width, reflectionHeight);
  				context.fill();
  				global = new Element('canvas', {width: img.width, height: img.height + reflectionHeight, title: img.get('alt')} ).inject($(img.parentNode));
      		ctx = global.getContext("2d");
      		ctx.drawImage(img, 0, 0, img.width, img.height);
          ctx.drawImage(reflection, 0, 0, reflection.width, reflection.height, 0, img.height, reflection.width, reflection.height);
          reflection.destroy();       
        }        			
			}
			if (img.complete) doReflect();
			else img.onload = doReflect;
		}
		return img;  
  },
	
  // create each element
  open: function () {     
    // appear each element
    this.options.elements.each(function(element) {
    	var appear_effect = new Fx.Morph(element, { duration: 800, transition: Fx.Transitions.Sine.easeOut });
      appear_effect.start({ 'opacity': [0, 1] });  
    });    
    // start carousel   
    this.options.b =  setInterval(function() { this.carousel(); }.bind(this),40);
  },
   
  // set mouse events
  position: function(e) {  
    if (navigator.appName.substring(0,3) == "Net") {
      e.preventDefault();
      this.options.tempX = e.pageX;
    } else {
      this.options.tempX = event.x + document.body.scrollLeft;
    }    
   	this.move();     	
  },  
 
  out: function() {	  
    this.options.speed = this.options.base;    
  },
  
  // carousel 
  carousel: function() {  
    this.options.elements.each(function(photo, i) {
      angle = i * 2 * Math.PI / this.options.elements.length;		
      posx = this.options.centerx + Math.sin( this.options.counter * ( this.options.base * this.options.speed ) + angle ) * this.options.radiusx;
      posy = this.options.centery + Math.cos( this.options.counter * ( this.options.base * this.options.speed ) + angle ) * this.options.radiusy;
      $(photo).setStyles({ left: posx + 'px', top: posy + 'px', zIndex: Math.round( posy / 3 ) + this.options.depth });
    }.bind(this));	    
    var circon = Math.PI * ( (3 * (this.options.radiusx / 2 + this.options.radiusy / 2)) - Math.sqrt( (3 * this.options.radiusx / 2 + this.options.radiusy / 2) * (this.options.radiusx / 2 + 3 * this.options.radiusy / 2) ) );    
    if((this.options.counter + 40) >= parseInt(circon)) {
      this.options.counter = 0;
    } else {    
      this.options.counter++;
    }     
  },
 
  // on mouse move on main container
  move: function() {	  
    this.options.speed = (this.options.tempX - this.options.centerx) / (this.options.elements.length * 1000);
    if(this.options.tempX <= this.options.element.getSize().x /2) {
      this.options.counter--;
    }
  },
  
  // Change image event to back
  textIt:function (elt) {  
    $(elt).removeEvents().addEvent('click', function() { this.Back(elt); }.bind(this) );    
  },
  
  // Change image event to click
  untextIt: function (elt) {
    $(elt).removeEvents().addEvent('click', function() { this.Click(elt); }.bind(this) );    
  },  
  
  Click: function(elt) {
    // stop carousel
    $clear(this.options.b);
    // get clicked element positions
    this.options.elt_posx = $(elt).getStyle('left').toInt();
    this.options.elt_posy = $(elt).getStyle('top').toInt();
    // define actions
    var fader = ''; 
    if(this.options.display_text==true) {
      fader += "this.options.TextEffect = new Fx.Morph($('" + this.options.textfield + "'), {duration: this.options.duration, transition: Fx.Transitions.Sine.easeOut, onStart: function() { this.requestText('" + elt + "') }.bind(this), onComplete: function() { this.textIt('" + elt + "') }.bind(this) }); ";
    } else {
      fader += "this.textIt('" + elt + "');";  
    }
      this.options.elements.each(function(photo,i) {
        if(photo != elt) { 
          fader += "this.DropOut($('" + photo + "'));";
        } else {
          fader += "$('" + photo + "').morph({top:0,left:0,";
          fader += 'height: ' + this.options.zooms[i]['divY'][0] + ', width: ' + this.options.zooms[i]['divX'][0] + ' });';
          if(!Browser.Engine.trident) {       
            fader += "$('" + photo + "').getElement('canvas').morph({ 'width': " + this.options.zooms[i]['divX'][0] + ", 'height':" + this.options.zooms[i]['divY'][0] + " });";        
          } else {
            fader += "$('" + photo + "').getElements('img').each(function(img){img.morph({ 'width': img.width/parseFloat(" + this.options.zoomIn + "), 'height':img.height/parseFloat(" + this.options.zoomIn + ") });}.bind(this));";
          }
              if(this.options.display_text==true) {
          fader += "$('" + this.options.textfield + "').setStyle('padding-left', '" + (this.options.zooms[i]['divX'][0] + this.options.padding) + "px');";
          }
        }
      }.bind(this));
    // do actions
    eval(fader);
  },

  // Back to carousel
  Back: function(elt) {
    // define actions
    var appearer = '';    
    if(this.options.display_text==true) {
      this.options.elements.each(function(photo,i) {        
        if(photo != elt) { 
          appearer += "var AppearEffect = new Fx.Morph($('" + photo + "'), {duration: this.options.duration, transition: Fx.Transitions.Sine.easeOut }); AppearEffect.start({visibility: ['hidden', 'visible'], 'opacity': [0, 1]});";
        } else {
          appearer += "$('" + photo + "').morph({position: 'absolute', left: " + this.options.elt_posx + ", top: " + this.options.elt_posy;
          appearer += ', height: ' + this.options.zooms[i]['divY'][1] + ', width: ' + this.options.zooms[i]['divX'][1] + ' });'; 
          if(!Browser.Engine.trident) {
            appearer += "$('" + photo + "').getElement('canvas').morph({ 'width': " + this.options.zooms[i]['divX'][1] + ", 'height':" + this.options.zooms[i]['divY'][1] + "});";
          } else {
            appearer += "$('" + photo + "').getElements('img').each(function(img){img.morph({ 'width': img.width*parseFloat(" + this.options.zoomIn + "), 'height':img.height*parseFloat(" + this.options.zoomIn + ") });}.bind(this));";
          }
        }
      }.bind(this));  
      appearer += "var TextEffect = new Fx.Morph($('" + this.options.textfield + "'), {duration: this.options.duration, transition: Fx.Transitions.Sine.easeOut, onComplete: function() { this.untextIt('" + elt + "'); $(this.options.textfield).innerHTML = ''; this.options.b = setInterval(function() { this.carousel(); }.bind(this),40); }.bind(this) }); TextEffect.start({visibility: ['visible', 'hidden'], 'opacity': [1, 0]});";
    } else {
      this.options.elements.each(function(photo,i) {        
        if(photo != elt) { 
          appearer += "var AppearEffect = new Fx.Morph($('" + photo + "'), {duration: this.options.duration, transition: Fx.Transitions.Sine.easeOut }); AppearEffect.start({visibility: ['hidden', 'visible'], 'opacity': [0, 1]});";
        } else {
          appearer += "var photoEffect = new Fx.Morph($('" + photo + "'), { onComplete: function() { this.untextIt('" + elt + "'); this.options.b = setInterval(function() { this.carousel(); }.bind(this),40); }.bind(this) }); photoEffect.start({position: 'absolute', left: " + this.options.elt_posx + ", top: " + this.options.elt_posy + ", height: " + this.options.zooms[i]['divY'][1] + ", width: " + this.options.zooms[i]['divX'][1] + " });";
          if(!Browser.Engine.trident) {
            appearer += "$('" + photo + "').getElement('canvas').morph({ 'width': " + this.options.zooms[i]['divX'][1] + ", 'height':" + this.options.zooms[i]['divY'][1] + "});";
          } else {
            appearer += "$('" + photo + "').getElements('img').each(function(img){img.morph({ 'width': img.width*parseFloat(" + this.options.zoomIn + "), 'height':img.height*parseFloat(" + this.options.zoomIn + ") });}.bind(this));";
          }
        }
      }.bind(this));  
    }
    // do actions
    eval(appearer);    
  },

  // DropOut Effect
  DropOut : function(element) {  
    var oldtop = element.getStyle('top').toInt();      
    var DropOutEffect = new Fx.Morph(element, {duration: this.options.duration, transition: Fx.Transitions.Sine.easeOut, onComplete: function() { element.setStyle('top', oldtop); if(this.options.display_text==true) { this.options.TextEffect.start({visibility: ['hidden', 'visible'], 'opacity': [0, 1]});} }.bind(this) });
    DropOutEffect.start({'top': [oldtop + 'px', oldtop + this.options.depth + 'px'], 'opacity': [1, 0]});    
  },
	
  // request text
  requestText: function(elt) {
    $(this.options.textfield).innerHTML = this.options.texts[elt];    
    $(this.options.textfield).getElements('a.back').each(function(back) {
      back.addEvent('click', function() { this.Back(elt); }.bind(this) );
    }.bind(this));    
  }
	
});