jQuery(document).ready(function($) {
	$('.show-tooltip').tooltip();
	
	$('#menu-landing a').on('click', function(e){
		var thePageID = $(this).attr('href');
		if (thePageID.indexOf("http") >= 0) {
		} else {
			e.preventDefault();
			$.scrollTo(thePageID, 600, {easing:'easeInOutQuart'});
			$('.navbar-collapse.collapse.in').removeClass('in');
		}
	});
	
	$("a[data-target=#myModal]").click(function(ev) {
		ev.preventDefault();
	    $("#myModal").html('');
	    var target = $(this).data("url");
	    // load the url and show modal on success
	    $("#myModal").load(target, function() { 
	         $("#myModal").modal({show:true}); 
	    });
	});
		var myLatlng = new google.maps.LatLng(34.053923,-118.242691);
		
		var mapOptions = {
		scrollwheel: false,
		center: myLatlng,
		zoom: 14
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);
		var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map,
		    title:"LA City Hall"
		});
		marker.setMap(map);
	
	$('#map-overlay').on('mousedown', function(){
		$(this).addClass('active');
	});
	$('#map-overlay').on('mouseup', function(){
		$(this).removeClass('active');
	});
	
	
	
		
	var t = new Trianglify({noiseIntensity: 0});
	var prevheight = height();
		
	 window.onresize = function() {
	            redraw();
	        };
	
	        function heightChange() {
	            if (height() != prevheight) {
	                console.log("height changed from "+prevheight+" to "+height());
	                prevheight = height();
	                redraw();
	            };
	        }
	 redraw();
	
	        function redraw() {
	            console.log("drawing "+document.body.clientWidth+"x"+height())
	            var pattern = t.generate(document.body.clientWidth, height());
	            document.getElementById('section-bg').setAttribute('style', 'background-image: '+pattern.dataUrl);
	        };
	
	        function recolor() {
	            t.options.x_gradient = Trianglify.randomColor();
	            t.options.y_gradient = t.options.x_gradient.map(function(c){return d3.rgb(c).brighter(.5)});
	        }
	
	        function noise(i) {
	            i += t.options.noiseIntensity;
	            if (i >= 0 && i <= 1) {
	                t.options.noiseIntensity = i;
	                redraw();
	            } else if (i < 0) { 
	                t.options.noiseIntensity = 0;
	                redraw();
	            }
	        }
	
	        function cellsize(i) {
	            i += t.options.cellsize;
	            if (i >= 0) {
	                t.options.cellsize = i;
	                t.options.bleed = i;
	                if (t.options.cellpadding >= t.options.cellsize/2) {
	                    t.options.cellpadding = 5*Math.floor((t.options.cellsize/2 - 1)/5);
	                }
	                redraw();
	            }
	        }
	
	        function cellpadding(i) {
	            i += t.options.cellpadding;
	            if (i >= 0  && i < t.options.cellsize/2) {
	                t.options.cellpadding = i;
	                redraw();
	            }
	        }
	
	        function height() {
	            return Math.max(
	                document.body.scrollHeight, document.documentElement.scrollHeight,
	                document.body.offsetHeight, document.documentElement.offsetHeight,
	                document.body.clientHeight, document.documentElement.clientHeight
	            );
	        }
	
	        function toggleClass(el, className) {
	            if (el.classList) {
	              return el.classList.toggle(className);
	            } else {
	              var classes = el.className.split(' ');
	              var existingIndex = classes.indexOf(className);
	
	              if (existingIndex >= 0)
	                classes.splice(existingIndex, 1);
	              else
	                classes.push(className);
	
	              el.className = classes.join(' ');
	              return existingIndex >= 0;
	            }
	        }
	
	
});