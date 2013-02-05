window.onload = function () {
    var r = Raphael("container-div", window.innerWidth, window.innerHeight);
    var nodeState = {};
    var follower = makeCircle(300, 300, 20,
        {fill: "red", stroke: "#fff", "stroke-width": 2});
    
    // Functions for dragging paths
    var start = function () {
        this.odx = 0;
        this.ody = 0;
    },
    move = function (dx, dy) {
        follower.translate(dx - this.odx, dy - this.ody);
        this.translate(dx - this.odx, dy - this.ody);
        this.odx = dx;
        this.ody = dy;
    },
    up = function () {
        this.x += this.odx;
        this.y += this.ody;
    };
    
    var bigNode = makeCircle(window.innerWidth / 2, window.innerHeight / 2, 70,
        {fill: "red", stroke: "#fff", "stroke-width": 2, "cursor":"pointer"});
    bigNode.drag(move, start, up);

    bigNode.dblclick(function () {
        var newPath;
        if(+(nodeState[this] = !nodeState[this])){
            bigNode.undrag();
            newPath = RRectPath(50 - this.x, 50 - this.y, window.innerWidth - 100, window.innerHeight - 100, 10, 10);
        } else {
            bigNode.drag(move, start, up);
            newPath = this.cpath;
        }
        this.stop().animate({path: newPath}, 1000, 'easeIn');
    });


    function makeCircle(x, y, rad, a) {
        var p = circlePath(rad);
        var circle = r.path(p).attr(a);
        circle.cpath = p;
        circle.translate(x, y);
        circle.x = x;
        circle.y = y;
        nodeState[circle] = 0;
        return circle;
    }

    function circlePath(r) {
        var l = r / Math.sqrt(2);
        var s = r - l;
        var string = 'M 0, 0';
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

    function RRectPath(x, y, w, h, r) {
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

    function follow(f, x, y) {
        f.translate(x, y);
    }


    var loop = function () {
        //follower.translate(bigNode.x / 2, bigNode.y / 2);
        window.setTimeout(loop, 20);
    };

    loop();

};
