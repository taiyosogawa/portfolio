window.onload = function () {
    var DISP_TIME = 650;
    var GREEN = '#53df00';
    var BLUE = '#099'
    var r = Raphael('container-div', window.innerWidth, window.innerHeight);
    var nodeState = {};
    var fElement = {};
    var projects = {};
    var pElement = {};
    var coreSkills = {};
    var coreSkillsAttr = {
            'font-family': 'bebas',
            'font-size': 36,
            'fill': '#fff',
            'text-anchor': 'end'
    };

    var bigNode = makeCircle(240, window.innerHeight / 2, 70, {
        fill: GREEN,
        opacity: .7,
        stroke: '#fff',
        'stroke-width': 1.5,
        'cursor':'pointer'
    });

    projects['project-1'] = makeCircle(bigNode.x + 160, bigNode.y, 30, {
        fill: BLUE,
        opacity: .7,
        stroke: '#fff',
        'stroke-width': 1.2,
        'cursor': 'pointer'
    });

    fElement['project-1'] = projects['project-1'];

    fElement['name'] = r.text(bigNode.x - 140, bigNode.y, 'Taiyo\nSogawa').attr(coreSkillsAttr);

    coreSkills['Sketch'] = r.text(window.innerWidth - 40, window.innerHeight / 5, 'Sketch').attr(coreSkillsAttr);
    coreSkills['Design'] = r.text(window.innerWidth - 40, 2 * window.innerHeight / 5, 'Design').attr(coreSkillsAttr);
    coreSkills['Build'] = r.text(window.innerWidth - 40, 3 * window.innerHeight / 5, 'Build').attr(coreSkillsAttr);
    coreSkills['Engage'] = r.text(window.innerWidth - 40, 4 * window.innerHeight / 5, 'Engage').attr(coreSkillsAttr);

    // Functions for dragging paths
    var start = function () {
        this.ody = 0;
    },
    move = function (dx, dy) {
        for(f in fElement) {
            fElement[f].translate(0, dy - this.ody);
        }
        this.translate(0, dy - this.ody);
        this.ody = dy;
    },
    up = function () {
        this.y += this.ody;
        for(f in fElement) {
            fElement[f].y += this.ody;
        }
    },
    selectProject = function () {
        this.toFront();
        var newPath;
        var newOpacity;
        if(+(nodeState[this] = !nodeState[this])){
            bigNode.undrag();
            newPath = RRectPath(20 - this.x, 25 - this.y, window.innerWidth - 95, window.innerHeight - 50, 8, 8);
            newOpacity = .9;
            if(fElement['glow'] != undefined) fElement['glow'].hide();
            createProject();
            for(c in coreSkills) coreSkills[c].animate({opacity: 0}, DISP_TIME, 'easeIn');

        } else {
            bigNode.drag(move, start, up);
            newPath = this.cpath;
            newOpacity = .7;
            removeProject();
            window.setTimeout(fElement['glow'].hide(), DISP_TIME);
            window.setTimeout(bigNode.toFront, DISP_TIME);
            for(c in coreSkills) coreSkills[c].animate({opacity: 1}, DISP_TIME, 'easeIn');
        }
        this.stop().animate({
            path: newPath,
            opacity: newOpacity}, DISP_TIME, 'easeIn');
    };
    
    bigNode.drag(move, start, up);
    bigNode.hover(glowOn, glowOff);

    for(p in projects){
        projects[p].hover(glowOn, glowOff);
        projects[p].click(selectProject);
    }


    function createProject() {
        pElement['title'] = r.text(860, 100, 'Bus Stop').attr({
            'font-family': 'bebas',
            'font-size': 72,
            'text-anchor': 'start',
            'fill': '#fff'
        });
        pElement['img-frame'] = r.rect(45, 70, 795, 492).attr({
            'stroke-width': 4,
            'stroke-linejoin': 'round',
            'stroke': '#222'
        });
        
        pElement['img-2'] = r.image('img/bus_stop_2.png', 45, 70, 795, 492);
        pElement['img-3'] = r.image('img/bus_stop_3.png', 45, 70, 795, 492);
        pElement['img-4'] = r.image('img/bus_stop_4.png', 45, 70, 795, 492);
        pElement['img-5'] = r.image('img/bus_stop_5.png', 45, 70, 795, 492);
        pElement['img-1'] = r.image('img/bus_stop_1.png', 45, 70, 795, 492);

        var textAttr = {
            'font-family': 'arial',
            'font-size': 16,
            'text-anchor': 'start',
            'fill': '#bbb',
            'cursor': 'pointer'
        };
        pElement['story-1'] = r.text(860, 200, 
            'I was searching for a way to make a bus stop\na desireable place to be.').attr(textAttr);
        pElement['story-2'] = r.text(860, 270, 
            'A meditative enclosing would be relaxing...\nbut who might you meet inside?').attr(textAttr);
        pElement['story-3'] = r.text(860, 330, 
            'I opted for a design that makes being in the elements a joy.').attr(textAttr);
        pElement['story-4'] = r.text(860, 390, 
            'The bus stop became a self sustained ecosphere which\npowers its own display and collects water for its plants.').attr(textAttr);
        pElement['story-5'] = r.text(860, 460, 
            'The community is empowered with a display of\nconcerted environmental efforts.').attr(textAttr);

        pElement['story-1'].img = 'img-1';
        pElement['story-2'].img = 'img-2';
        pElement['story-3'].img = 'img-3';
        pElement['story-4'].img = 'img-4';
        pElement['story-5'].img = 'img-5';


        pElement['story-1'].attr({'fill':'#fff'});
        pElement['story-1'].hover(onTxt, offTxt);
        pElement['story-2'].hover(onTxt, offTxt);
        pElement['story-3'].hover(onTxt, offTxt);
        pElement['story-4'].hover(onTxt, offTxt);
        pElement['story-5'].hover(onTxt, offTxt);
        
        for(p in pElement) {
            pElement[p].attr({opacity: 0});
        }

        window.setTimeout(showProject, DISP_TIME);
    }

    function onTxt() {
        pElement[this.img].toFront();
        pElement['story-1'].stop().animate({'fill': '#bbb'}, 400, 'easeIn');
        this.stop().animate({'fill': '#fff'}, 400, 'easeIn');
    }

    function offTxt() {
        this.stop().animate({'fill': '#bbb'}, 400, 'easeIn');
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
        if (nodeState[this] != undefined) {
            if(nodeState[this] == 0) {
                fElement['glow'] = this.glow({'color': '#fff'});
                fElement['glow'].x = this.x;
                fElement['glow'].y = this.y;
                r.add(glowElement);
            }
        }
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
