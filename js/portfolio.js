window.onload = function () {
    var DISP_TIME = 650;
    var r = Raphael("container-div", window.innerWidth, window.innerHeight);
    var nodeState = {};
    var followElements = {};
    followElements['baby'] = makeCircle(300, 300, 20,
        {fill: "red", stroke: "#fff", "stroke-width": 2});

    var bigNode = makeCircle(window.innerWidth / 2, window.innerHeight / 2, 70,
        {fill: "red", stroke: "#fff", "stroke-width": 2, "cursor":"pointer"});
    
    // Functions for dragging paths
    var start = function () {
        this.odx = 0;
        this.ody = 0;
    },
    move = function (dx, dy) {
        for(f in followElements) {
            followElements[f].translate(dx - this.odx, dy - this.ody);
        }

        this.translate(dx - this.odx, dy - this.ody);
        this.odx = dx;
        this.ody = dy;
    },
    up = function () {
        this.x += this.odx;
        this.y += this.ody;
        for(f in followElements) {
            followElements[f].x += this.odx;
            followElements[f].y += this.ody;
        }

    },
    selectProject = function () {
        this.toFront();
        var newPath;
        if(+(nodeState[this] = !nodeState[this])){
            bigNode.undrag();
            newPath = RRectPath(15 - this.x, 25 - this.y, window.innerWidth - 95, window.innerHeight - 50, 6, 6);
            window.setTimeout(displayProject, DISP_TIME);
        } else {
            bigNode.drag(move, start, up);
            newPath = this.cpath;
            window.setTimeout(bigNode.toFront, DISP_TIME);
        }
        this.stop().animate({path: newPath}, DISP_TIME, 'easeIn');
    };
    
    bigNode.drag(move, start, up);
    bigNode.dblclick(selectProject);
    bigNode.hover(function () {
        followElements['glow'] = this.glow();
        followElements['glow'].x = this.x;
        followElements['glow'].y = this.y;
        r.add(glowElement);
    }, function () {
        followElements['glow'].remove();
    });

    follower.click(selectProject);

    function displayProject() {

    }

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
        window.setTimeout(loop, 20);
    };

    loop();
};
