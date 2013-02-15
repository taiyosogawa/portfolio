window.onload = function () {
    /*
     * CONSTANTS
     */
    var DISP_TIME = 650;
    var BLUE = '#5f9ea0';
    var WHITE = '#fff';
    var RED = '#b22222';
    var GRAYBLUE = '#7bb';
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
    if(svgWidth < svgHeight * 1.8) svgWidth = svgHeight * 1.8;
    var r = Raphael('container-div', svgWidth, svgHeight);
    var nodeState = {};
    var fElements = {};
    var bubbles = {};
    var pElements = {};
    var coreSkills = {};
    var coreSkillsAttr = {
        'font-family': 'mido',
        'font-size': 40,
        'fill': '#fff'
    };


    /*
     * PROJECTS
     */

     var projects = {
        'bus-stop': {
            'name': 'bus-stop',
            'title': 'Bus Stop',
            'story': [
                'I was looking for a way to make the bus stop a\ndesireable place to be.',
                'A meditative enclosing could be relaxing, but you\ndon\'t know who you might meet inside.',
                'I instead opted for a design that makes the most\nof being outdoors.',
                'The bus stop became a self sustained ecosphere,\npowering its own display and collecting water and\ncompost for its plants.',
                'The community would be empowered with a\ndisplay of concerted environmental efforts.'
            ]
        }
    };

    var pElements = {
            'story': []
    };

    /*
     * CODE
     */ 

    var bigRed = makeCircle(100, 0, 70, {
        fill: RED,
        opacity: .9,
        stroke: '#fff',
        'stroke-width': 1.5,
        'cursor':'pointer'
    });

    bigRed.drag(move, start, up);
    bigRed.hover(glowOn, glowOff);

    fElements['bus-stop-label'] = r.text(bigRed.x + 170, bigRed.y, 'Bus\nStop').attr(coreSkillsAttr).attr({'font-size': '16'});

    bubbles['bus-stop'] = makeCircle(bigRed.x + 170, bigRed.y, 40, {
        fill: BLUE,
        opacity: .6,
        stroke: WHITE,
        'stroke-width': 1.2,
        'cursor': 'pointer'
    });

    for(b in bubbles){
        bubbles[b].pname = b;
        fElements[b] = bubbles[b];
        bubbles[b].hover(glowOn, glowOff);
        bubbles[b].click(selectProject);
    }

    var name = r.image('img/name.png', svgWidth - 307, svgHeight - 60, 290, 50);
    coreSkills['Sketch'] = r.text(bigRed.x, svgHeight / 5, 'sketch').attr(coreSkillsAttr);
    coreSkills['Design'] = r.text(bigRed.x, 2 * svgHeight / 5, 'design').attr(coreSkillsAttr);
    coreSkills['Build'] = r.text(bigRed.x, 3 * svgHeight / 5, 'build').attr(coreSkillsAttr);
    coreSkills['Engage'] = r.text(bigRed.x, 4 * svgHeight / 5, 'engage').attr(coreSkillsAttr);

    function createProject(pname) {
        var project = projects[pname];

        var imgHeight = svgHeight - 140;
        var imgWidth = imgHeight * 1.61;
        var imgX = 45;
        var imgY = 70;
        var margin = 20;

        pElements['img-frame'] = r.rect(imgX, imgY, imgWidth, imgHeight).attr({
            'stroke-width': 4,
            'stroke-linejoin': 'round',
            'stroke': '#222'
        });

        pElements['img'] = r.image('img/' + project['name'] + '0.png', imgX, imgY, imgWidth, imgHeight);

        pElements['title'] = r.text(imgX + imgWidth + margin, 85, project['title']).attr({
            'font-family': 'mido',
            'text-anchor': 'start',
            'fill': '#fff',
            'font-size': 40
        });

        var textAttr = {
            'font-family': 'Roboto Condensed',
            'text-anchor': 'start',
            'fill': GRAYBLUE,
            'cursor': 'default'
        };

        var maxWidth = svgWidth - imgX - imgWidth - margin;
        var maxHeight = svgHeight - pElements['title'].getBBox()['y2'] - 80;
        var fontSize = 22;
        var txtY = pElements['title'].getBBox()['y2'] + 25;
        var txtX = imgX + imgWidth + margin;

        // Calculate correct layouts
        while(true) {
            var bigWidth = 0;
            var tw = 0;
            var toth = 0;
            var i;
            for(i = 0; i < project['story'].length; i++) {
                pElements['story'][i] = r.text(txtX, txtY, 
                project['story'][i]).attr(textAttr).attr({'font-size': fontSize}).hover(onTxt, offTxt);
                tw = pElements['story'][i].getBBox()['width'];
                toth += pElements['story'][i].getBBox()['height'];
                if(tw > bigWidth) bigWidth = tw;
            }

            //alert((maxHeight - toth) / i);
            for(var i = 0; i < project['story'].length; i++) pElements['story'][i].remove();
            if(bigWidth < maxWidth) break;
            else fontSize -= 1;
        }

        // Actually draw text
        var txtM = Math.min(35, (maxHeight - toth) / i);
        txtY += txtM/2;
        for(i = 0; i < project['story'].length; i++) {
                pElements['story'][i] = r.text(txtX, txtY, 
                project['story'][i]).attr(textAttr).attr({'font-size': fontSize}).hover(onTxt, offTxt);
                txtY += pElements['story'][i].getBBox()['height'] + txtM;
        }

        pElements['story'][0].attr({'fill':'#fff'});

        for(p in pElements) {
            if(p == 'story'){
                for(s in pElements[p]) {
                    pElements[p][s].attr({opacity: 0});
                }
            } else {
                pElements[p].attr({opacity: 0});
            }
        }
        window.setTimeout(showProject, DISP_TIME);
    }

    function selectProject() {
        this.toFront();
        var newPath;
        var newOpacity;
        if(+(nodeState[this] = !nodeState[this])){
            bigRed.undrag();
            newPath = panelPath( 8 - this.x, 25 - this.y, svgWidth - 20, svgHeight - 50, 6, 6);
            newOpacity = 1;
            if(fElements['glow'] != undefined) fElements['glow'].hide();
            createProject(this.pname);
            for(c in coreSkills) coreSkills[c].animate({opacity: 0}, DISP_TIME, 'easeIn');
        } else {
            bigRed.drag(move, start, up);
            newPath = this.cpath;
            newOpacity = .7;
            removeProject();
            window.setTimeout(fElements['glow'].hide(), DISP_TIME);
            window.setTimeout(bigRed.toFront, DISP_TIME);
            for(c in coreSkills) coreSkills[c].animate({opacity: 1}, DISP_TIME, 'easeIn');
        }
        this.stop().animate({
            path: newPath,
            opacity: newOpacity}, DISP_TIME, 'easeIn');
    }

    function onTxt() {
        pElements['img'].attr({
            'src': 'img/' + pElements['title']['attrs']['text'].replace(/\s+/g, '-').toLowerCase() + pElements['story'].indexOf(this) + '.png'
        });
        for(var i = 0; i < pElements['story'].length; i++) {
            pElements['story'][i].stop().animate({'fill': GRAYBLUE}, 400, 'easeIn');
        }
        this.stop().animate({'fill': '#fff'}, 400, 'easeIn');
    }

    function offTxt() {
    }

    function showProject() {
        for(p in pElements) {
            if(p == 'story'){
                for(s in pElements[p]) {
                    pElements[p][s].animate({opacity: 1}, DISP_TIME / 2, 'easeIn');
                }
            } else {
                pElements[p].animate({opacity: 1}, DISP_TIME / 2, 'easeIn');
            }
        }
    }

    function removeProject() {
        for(p in pElements) {
            if(p == 'story'){
                for(s in pElements[p]) {
                    pElements[p][s].remove();
                }
            } else {
                pElements[p].remove();
            }
        }
    }

    function glowOn() {
        if (nodeState[this] != undefined) {
            if(nodeState[this] == 0) {
                fElements['glow'] = this.glow({'color': '#fff'});
                fElements['glow'].x = this.x;
                fElements['glow'].y = this.y;
                r.add(glowElement);
            }
        }
    }

    function glowOff() {
        fElements['glow'].remove();
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

    function panelPath(x, y, w, h, r) {
        w = w - r;
        h = h - r;
        var string = 'M '+x+' '+y;
        string += 'h '+w;
        string += 'a '+r+','+r+' 0 0,1 '+r+','+r;
        string += 'v '+ (h - 50);
        string += 'a '+r+','+r+' 0 0,1 -'+r+','+r;
        string += 'h -285 l -50 50';
        string += 'h -' + (w-335);
        //string += 'a '+r+','+r+' 0 0,1 -'+r+',-'+r;
        string += 'v -'+h;
        //string += 'a '+r+','+r+' 0 0,1 '+r+',-'+r;
        string += 'z';
        return string;
    }

    function follow(f, x, y) {
        f.translate(x, y);
    }

    // Functions for dragging paths
    function start() {
        this.ody = 0;
    }

    function move(dx, dy) {
        for(f in fElements) {
            fElements[f].translate(0, dy - this.ody);
        }
        this.translate(0, dy - this.ody);
        this.ody = dy;
    }
    function up() {
        this.y += this.ody;
        for(f in fElements) {
            fElements[f].y += this.ody;
        }
    };

    /*
    $("body").mousemove(function(event) {
      var msg = "Handler for .mousemove() called at ";
      msg += event.pageX + ", " + event.pageY;
      $("#log").append("<div>" + msg + "</div>");
    });
    

    var loop = function () {
        window.setTimeout(loop, 20);
    };

    loop();
    */

    function onMouseMove() {

    }
};
