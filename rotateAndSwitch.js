function rotateAndSwitch(el, options) {
    this.el = el;
    this.world = el.children[0];
    this.cube = this.world.children[0];
    this.front_face = this.cube.children[0];
    this.dir = null;
    
    this.options = {
        autodelete_page: true,
        duration: 6000,
    // Shortcut Directions...
        next: 'right',
        prev: 'left',
    };

    if(options) {
    
    }
    this.createCSS();
};

rotateAndSwitch.prototype.next = function(el, speed)
{
    this.turn(el, this.options.next, speed);
}

rotateAndSwitch.prototype.prev = function(el, speed)
{
    this.turn(el, this.options.prev, speed);
}

rotateAndSwitch.prototype.turn = function(el, dir, speed)
{
    if(!dir)
        return
    this.dir = dir;
    var processElement,
        inboundClass;
    if(this.dir=="left") {
        if(el)
            this.left_face = el;
        processElement = this.left_face;
        inboundClass="left_face";
    } else 
    if(this.dir=="right") {
        if(el)
            this.right_face = el;
        processElement = this.right_face;
        inboundClass="right_face";
    }
    if(this.dir=="top") {
        if(el)
            this.top_face = el;
        processElement = this.top_face;
        inboundClass="top_face";
    }
    if(this.dir=="bottom") {
        if(el)
            this.bottom_face = el;
        processElement = this.bottom_face;
        inboundClass="bottom_face";
    }
    if(processElement) {
        djsex.css.appendClass(processElement, inboundClass);
        this.cube.appendChild(processElement);
        var turnSpeed = "turn-"+dir;
        if(speed) {
            turnSpeed==turnSpeed+"-"+speed
        }
        djsex.css.appendClass(this.world,turnSpeed);
        
        djsex.anim.redraw(this.cube);
        if(this.options.autodelete_page) {
            that = this;
            this.autoDeleter = window.setTimeout(function() {
                el = djsex.deleteNode(that.front_face);
                that.front_face = processElement;
                djsex.css.deleteClass(that.front_face, inboundClass);
                djsex.css.appendClass(that.front_face, "front_face");
                that.right_face = null;
                if(that.dir=="right") {
                    that.right_face = null;
                } else
                if(that.dir=="left") {
                    that.left_face = null;
                } else 
                if(that.dir=="top") {
                    that.top_face = null;
                }
                if(that.dir=="bottom") {
                    that.bottom_face = null;
                }
                djsex.css.deleteClass(that.world, turnSpeed);
                djsex.anim.redraw(that.cube);
            }, this.options.duration+1);
        }
    }
};

rotateAndSwitch.prototype.createCSS = function() {
    var depth = this.el.offsetWidth/2;
    var planedepth = this.el.offsetHeight/2;
    var planediff = (this.el.offsetWidth-this.el.offsetHeight)/2;
    var swingDepth = Math.sqrt(Math.pow(depth,2)*2);

    var swingPlaneDepth = Math.sqrt(Math.pow(planedepth,2)*2);
    console.log("depth:"+depth+" planedepth:"+planedepth+" swingDepth:"+swingDepth+" swingPlaneDepth:"+swingPlaneDepth);
    djsex.css.create(" \
.threedworld { \
  -webkit-transform: translateZ(-"+depth+"px); \
} \
.cube .left_face { \
  -webkit-transform: rotateY(270deg) translateZ("+depth+"px); \
} \
.cube .front_face { \
  -webkit-transform: rotateY(0deg) translateZ("+depth+"px) ; \
} \
.cube .right_face { \
  -webkit-transform: rotateY(90deg) translateZ("+depth+"px); \
} \
.cube .top_face { \
 -webkit-transform: translateY(-"+planedepth+"px) translateZ("+planediff+"px) rotateX(90deg); \
} \
.cube .bottom_face { \
 -webkit-transform:  translateY("+planedepth+"px) translateZ("+planediff+"px) rotateX(-90deg); \
} \
\
@-webkit-keyframes next-frame-1 { \
  0%   { 	-webkit-transform: translateZ(-"+depth+"px); opacity: 1.0;} \
  33%  {    -webkit-transform: translateZ(-"+swingDepth+"px); opacity: 0.9;} \
  60%  {    -webkit-transform: translateZ(-"+swingDepth+"px); opacity: 0.9;} \
  100% { 	-webkit-transform: translateZ(-"+depth+"px); opacity: 1.0;} \
}\
\
@-webkit-keyframes top-frame-1 { \
  0%   { 	-webkit-transform: translateZ(-"+depth+"px); opacity: 1.0; } \
  33%  {    -webkit-transform: translateZ(-"+swingDepth+"px); opacity: 0.9;} \
  60%  {    -webkit-transform: translateZ(-"+swingDepth+"px) translateY(-"+planediff+"px); opacity: 0.9;} \
  100% { 	-webkit-transform: translateZ(-"+planedepth+"px) translateY(-"+planediff+"px); opacity: 1.0;} \
}\
\
@-webkit-keyframes bottom-frame-1 { \
  0%   { 	-webkit-transform: translateZ(-"+depth+"px); opacity: 1.0; } \
  33%  {    -webkit-transform: translateZ(-"+swingDepth+"px); opacity: 0.9;} \
  60%  {    -webkit-transform: translateZ(-"+swingPlaneDepth+"px) translateY("+planediff+"px); opacity: 0.9;} \
  100% { 	-webkit-transform: translateZ(-"+planedepth+"px) translateY("+planediff+"px); opacity: 1.0;} \
}\
/* \
 * Turn Right \
*/ \
.threedworld.turn-right-slow  { \
  -webkit-animation: next-frame-1 "+(this.options.duration*1.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-right-slow .cube  { \
  -webkit-animation: next-frame-2 "+(this.options.duration*1.5)/3000+"s "+(this.options.duration*1.5)/3000+"s 1 forwards; \
} \
\
.threedworld.turn-right { \
  -webkit-animation: next-frame-1 "+this.options.duration/1000+"s 1 forwards; \
\} \
\
.threedworld.turn-right .cube  { \
  -webkit-animation: next-frame-2 "+this.options.duration/3000+"s "+this.options.duration/3000+"s 1 forwards; \
} \
\
.threedworld.turn-right-fast { \
  -webkit-animation: next-frame-1 "+(this.options.duration*0.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-right-fast .cube  { \
  -webkit-animation: next-frame-2 "+(this.options.duration*0.5)/3000+"s "+(this.options.duration*0.5)/3000+"s 1 forwards; \
} \
\
/* \
 * Turn Left \
*/ \
.threedworld.turn-left-slow  { \
  -webkit-animation: next-frame-1 "+(this.options.duration*1.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-left-slow .cube  { \
  -webkit-animation: prev-frame-2 "+(this.options.duration*1.5)/3000+"s "+(this.options.duration*1.5)/3000+"s 1 forwards; \
} \
\
.threedworld.turn-left { \
  -webkit-animation: next-frame-1 "+this.options.duration/1000+"s 1 forwards; \
} \
\
.threedworld.turn-left .cube  { \
  -webkit-animation: prev-frame-2 "+this.options.duration/3000+"s "+this.options.duration/3000+"s 1 forwards; \
} \
\
.threedworld.turn-left-fast { \
  -webkit-animation: next-frame-1 "+(this.options.duration*0.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-left-fast .cube  { \
  -webkit-animation: prev-frame-2 "+(this.options.duration*0.5)/3000+"s "+(this.options.duration*0.5)/3000+"s 1 forwards; \
} \
\
/* \
 * Turn Top \
*/ \
.threedworld.turn-top-slow  { \
  -webkit-animation: plane-frame-1 "+(this.options.duration*1.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-top-slow .cube  { \
  -webkit-animation: top-frame-2 "+(this.options.duration*1.5)/3000+"s "+(this.options.duration*1.5)/3000+"s 1 forwards; \
} \
\
.threedworld.turn-top { \
  -webkit-animation: top-frame-1 "+this.options.duration/1000+"s 1 forwards; \
} \
\
.threedworld.turn-top .cube  { \
  -webkit-animation: top-frame-2 "+this.options.duration/3000+"s "+this.options.duration/3000+"s 1 forwards; \
} \
\
.threedworld.turn-top-fast { \
  -webkit-animation: top-frame-1 "+(this.options.duration*0.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-top-fast .cube  { \
  -webkit-animation: top-frame-2 "+(this.options.duration*0.5)/3000+"s "+(this.options.duration*0.5)/3000+"s 1 forwards; \
} \
\
/* \
 * Turn Bottom \
*/ \
.threedworld.turn-bottom-slow  { \
  -webkit-animation: bottom-frame-1 "+(this.options.duration*1.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-bottom-slow .cube  { \
  -webkit-animation: bottom-frame-2 "+(this.options.duration*1.5)/3000+"s "+(this.options.duration*1.5)/3000+"s 1 forwards; \
} \
\
.threedworld.turn-bottom { \
  -webkit-animation: bottom-frame-1 "+this.options.duration/1000+"s 1 forwards; \
} \
\
.threedworld.turn-bottom .cube  { \
  -webkit-animation: bottom-frame-2 "+this.options.duration/3000+"s "+this.options.duration/3000+"s 1 forwards; \
} \
\
.threedworld.turn-bottom-fast { \
  -webkit-animation: bottom-frame-1 "+(this.options.duration*0.5)/1000+"s 1 forwards; \
} \
\
.threedworld.turn-bottom-fast .cube  { \
  -webkit-animation: bottom-frame-2 "+(this.options.duration*0.5)/3000+"s "+(this.options.duration*0.5)/3000+"s 1 forwards; \
} \
", "rotateAndSwitch_styles");
};