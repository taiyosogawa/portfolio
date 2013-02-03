window.onload = function () {
    var r = Raphael("container-div", window.innerWidth, window.innerHeight);
    var follower = r.path(makeCircle(300, 300, 20)).attr({fill: "red", stroke: "#fff", "stroke-width": 2});
    
    // Functions for dragging paths
    var start = function () {
        this.odx = 0;
        this.ody = 0;
    },
    move = function (dx, dy) {
        testfollow(follower, dx - this.odx, dy - this.ody);
        this.translate(dx - this.odx, dy - this.ody);
        this.odx = dx;
        this.ody = dy;
    },
    up = function () {
        this.totdx += this.odx;
        this.totdy += this.ody;
    };
    
    var bigNodePath = makeCircle(window.innerWidth / 2, window.innerHeight / 2, 70);
    var bigNode = r.path(bigNodePath).attr({fill: "red", stroke: "#fff", "stroke-width": 2, "cursor":"pointer"});
    initNode(bigNode);
    var now = 1;


    follow(follower, bigNode, 100, 100);

    bigNode.drag(move, start, up);

    bigNode.dblclick(function () {
        rectPath = makeRoundedRect(50 - this.totdx, 50 - this.totdy, window.innerWidth - 100, window.innerHeight - 100, 10, 10);
        var nodeToRect = [{path: rectPath}, {path: bigNodePath}];
        this.stop().animate(nodeToRect[+(now = !now)], 1000, 'easeIn');
    });

    /**
    * Returns the path of a circle
    * @x {Number} x coord of center
    * @y {Number} y coord of center
    * @r {Number} radius
    */
    function makeCircle(x, y, r) {
        var l = r / Math.sqrt(2);
        var s = r - l;
        var string = 'M'+x+','+y;
        string +='m 0,-'+r;
        string +='a '+r+','+r+' 0 0,1 '+l+','+s;
        string +='a '+r+','+r+' 0 0,1 '+s+','+l;
        string +='a '+r+','+r+' 0 0,1 -'+s+','+l;
        string +='a '+r+','+r+' 0 0,1 -'+l+','+s;
        string +='a '+r+','+r+' 0 0,1 -'+l+',-'+s;
        string +='a '+r+','+r+' 0 0,1 -'+s+',-'+l;
        string +='a '+r+','+r+' 0 0,1 '+s+',-'+l;
        string +='a '+r+','+r+' 0 0,1 '+l+',-'+s;
        string +='z';
        return string;
    }

    /**
    * Returns the path of a rounded rectangle
    * @x {Number} x coord of upper left corner
    * @y {Number} y coord of upper left corner
    * @w {Number} width of rectangle
    * @h {Number} height of rectangle
    * @r {Number} radius of rounded corner
    */
    function makeRoundedRect(x, y, w, h, r) {
        w = w - r;
        h = h - r;
        var string = 'M '+x+' '+y;
        string += 'h '+w;
        string += 'a '+r+','+r+' 0 0,1 '+r+','+r;
        string += 'v '+h;
        string += 'a '+r+','+r+' 0 0,1 -'+r+','+r;
        string += 'h -'+w;
        string += 'a '+r+','+r+' 0 0,1 -'+r+',-'+r;
        string += 'v -'+h;
        string += 'a '+r+','+r+' 0 0,1 '+r+',-'+r;
        string += 'z';
        return string;
    }

    function follow(f, c, x, y) {
        var targetX = (c.getBBox().x2 + c.getBBox().x) / 2;
        f.translate(1, 1);
        /*
        var r = f.getBBox().x2 - f.getBBox().x / 2;
        var oldPath = makeCircle(f.getBBox().x + f.getBBox().x2 / 2, f.getBBox().y + f.getBBox().y2 / 2, r);
        var dx = c.getBBox().x - f.getBBox().x;
        var dy = c.getBBox().y - f.getBBox().y;
        var newPath = makeCircle((dx - x) / 2, (dy - y) / 2, r);
        f.stop().animate({oldPath: newPath}, 1000, 'easeIn');
        */
    }

    function testfollow(f, x, y) {
        f.translate(x, y);
    }

    function initNode(n) {
        n.totdx = 0;
        n.totdy = 0;
    }

    var loop = function () {
        follower.translate(1, 1);
        console.log(bigNode.totdx);
        window.setTimeout(loop, 10);
    };

    loop();

};
