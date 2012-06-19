# rotateAndSwitch #
## like 'bait and switch', only prettier... ##

Simple setup:

1. Include D's Javascript Extensions (you will need the core, css and anim modules)

        <script src="https://raw.github.com/Xalior/djsex/master/Core.js" type="text/javascript"></script>
        <script src="https://raw.github.com/Xalior/djsex/master/CSS.js" type="text/javascript"></script>
        <script src="https://raw.github.com/Xalior/djsex/master/Anim.js" type="text/javascript"></script>

    * "D's Javascript Extensions" available from <http://www.rimron.co.uk/djsex/>



2. Include rotateAndSwitch.js and rotateAndSwitch.css

        <script src="https://raw.github.com/Xalior/baitAndSwitch/master/baitAndSwitch.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" media="screen"  href="https://raw.github.com/Xalior/baitAndSwitch/master/baitAndSwitch.css" />

3. Setup your basic markup for the 3D world

        <div id="container">
          <div class="threedworld">
            <div class="cube">
              <div class="front_face">
                Ur AWESOMES example content goes in this div...
              </div>
            </div>
          </div>
        </div>

4. Initialise the rotateAndSwitch controller API

        bestestContentEvar = new rotateAndSwitch(document.getElementById('container'));

5. Add new content via bestestContentEvar.next(), bestestContentEvar.prev(), etc!

        el = document.createElement("div");
        el.innerHTML = "Hello World";
        bestestContentEvar.next(el);

    * and so on.... see the [main djsex site](http://www.rimron.co.uk/djsex/) for more details&hellip;
