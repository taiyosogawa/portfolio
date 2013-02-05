window.onload = function () {
    var DISP_TIME = 650;
    var GREEN = '#53df00';
    var BLUE = '#099'
    var r = Raphael('container-div', window.innerWidth, window.innerHeight);
    var nodeState = {};
    var fElement = {};
    var pElement = {};

    var bigNode = makeCircle(window.innerWidth / 2, window.innerHeight / 2, 70, {
        fill: GREEN,
        opacity: .7,
        stroke: '#fff',
        'stroke-width': 1.5,
        'cursor':'pointer'
    });

    fElement['baby'] = makeCircle(bigNode.x - 200, bigNode.y, 30, {
        fill: 'url(img/bus_stop.png)',
        opacity: .7,
        stroke: '#fff',
        'stroke-width': 1.2,
        'cursor': 'pointer'
    });

    fElement['image'] = r.image('img/bus_stop.png', 10, 10, 800, 800).attr({
        path: circlePath(40)});

    console.log(fElement['image'].node.attributes);
    fElement['image'].node.setAttribute('clip-path', 'url(#hex-mask)');



    
    // Functions for dragging paths
    var start = function () {
        this.odx = 0;
        this.ody = 0;
    },
    move = function (dx, dy) {
        for(f in fElement) {
            fElement[f].translate(dx - this.odx, dy - this.ody);
        }
        this.translate(dx - this.odx, dy - this.ody);
        this.odx = dx;
        this.ody = dy;
    },
    up = function () {
        this.x += this.odx;
        this.y += this.ody;
        for(f in fElement) {
            fElement[f].x += this.odx;
            fElement[f].y += this.ody;
        }
    },
    selectProject = function () {
        this.toFront();
        var newPath;
        if(+(nodeState[this] = !nodeState[this])){
            bigNode.undrag();
            newPath = RRectPath(15 - this.x, 25 - this.y, window.innerWidth - 95, window.innerHeight - 50, 8, 8);
            fElement['glow'].hide();
            createProject();
            

        } else {
            bigNode.drag(move, start, up);
            newPath = this.cpath;
            removeProject();
            window.setTimeout(fElement['glow'].hide(), DISP_TIME);
            window.setTimeout(bigNode.toFront, DISP_TIME);
        }
        this.stop().animate({
            path: newPath,
            fill: BLUE,
            opacity: .9}, DISP_TIME, 'easeIn');
    };
    
    bigNode.drag(move, start, up);
    bigNode.dblclick(selectProject);
    bigNode.hover(glowOn, glowOff);

    for(f in fElement){
        fElement[f].click(selectProject);
        fElement[f].hover(glowOn, glowOff);
    }


    function createProject() {
        pElement['title'] = r.text(740, 80, 'Bus  Stop').attr({
            'font-family': 'bebas',
            'font-size': 72,
            'text-anchor': 'start',
            'fill': '#fff'
        });
        pElement['image-frame'] = r.rect(45, 50, 666, 495).attr({
            'stroke-width': 4,
            'stroke-linejoin': 'round',
            'stroke': '#222'
        });
        pElement['image'] = r.image('img/bus_stop.png', 45, 50, 666, 495);
        for(p in pElement) {
            pElement[p].attr({opacity: 0});
        }
        window.setTimeout(showProject, DISP_TIME);
    }

    function showProject() {
        for(p in pElement) {
            pElement[p].animate({opacity: 1}, DISP_TIME / 2, 'easeIn');
        }
    }

    function removeProject() {
        for(p in pElement) {
            pElement[p].remove();
        }
    }

    function glowOn() {
        fElement['glow'] = this.glow({'color': '#fff'});
        fElement['glow'].x = this.x;
        fElement['glow'].y = this.y;
        r.add(glowElement);
    }

    function glowOff() {
        fElement['glow'].remove();
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
