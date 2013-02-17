window.onload = function () {
    /*
     * CONSTANTS
     */
    var DISP_TIME = 650;
    var BLUE = '#5f9ea0';
    var WHITE = '#fff';
    var RED = '#b22222';
    var GRAYBLUE = '#7bb';
    var DARKBLUE = '#2f6e70';
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
    if(svgWidth < svgHeight * 1.8) svgWidth = svgHeight * 1.8;
    var r = Raphael('container-div', svgWidth, svgHeight);
    var nodeState = {};
    var fElements = {};
    var bubbles = {};
    var pElements = {};
    var coreSkills = {};
    var panelActive = false;
    var coreSkillsAttr = {
        'font-family': 'mido',
        'font-size': 40,
        'fill': '#fff',
        'cursor': 'default'
    };
    var bubbleAttrs = {
        'fill': BLUE,
        'opacity': .6,
        'stroke': WHITE,
        'stroke-width': 1.2,
        'cursor': 'pointer'
    };

    /*
     * PROJECTS
     */

     var projects = {
        'bus-stop': {
            'name': 'bus-stop',
            'title': 'Bus Stop',
            'story': [
                'As an industrial design project, I was looking for\na way to make the bus stop a desireable place to be.',
                'A meditative enclosing could be relaxing, but you\ndon\'t know who you might meet inside.',
                'I instead opted for a design that makes the most\nof being outdoors.',
                'The bus stop became a self sustained ecosphere,\npowering its own display and collecting water and\ncompost for its plants.',
                'The community would be empowered with a\ndisplay of concerted environmental efforts.'
            ],
            'sketchV': .8,
            'designV': .2,
            'buildV': 0,
            'engageV': 0
        },

        'nomad': {
            'name': 'nomad',
            'title': 'Nomad',
            'story': [
                'As a team of engineers and MBAs, we thought\nthere might be a technology need and business\nopportunity for food trucks.',
                'The truck owner\'s workflow showed that their\nIT was cumbersome and outdated.',
                'We also found that the food truck industry \nwas growing. It was the market for us.',
                'After observations, we explored ever user\nsequence at the chalkboard.',
                'My contribution was building the website, using\nPHP, jQuery, and even OAuth for the first\ntime. A step up from my WildCloud project!'
            ],
            'sketchV': .1,
            'designV': .3,
            'buildV': .4,
            'engageV': .2
        },

        'asb': {
            'name': 'asb',
            'title': 'Alternative Student Breaks',
            'story': [
                'During one winter break, I volunteered for\nHabitat for Humanity in Mississippi.',
                'I wanted to get more involved and it was clear\nthat the group needed help with their website.',
                'I applied to be the Publicity Coordinator and\nstarted hammering out usable code.',
                'I even did some graphic design. It was a\ncreative outlet for a cause that mattered to me.',
                'Of course nothing compared getting out in the\ncommunity again; this time leading a trip\nfor new freshmen.'
            ],
            'sketchV': .2,
            'designV': .2,
            'buildV': .3,
            'engageV': .3
        }
    };

    var pElements = {
            'story': []
    };

    var bigRed = makeCircle(100, 0, 70, {
        fill: RED,
        opacity: .9,
        stroke: '#fff',
        'stroke-width': 1.5
    });

    /*
     * CODE
     */ 

    var plusX = 190;

    for(p in projects){
        makeBubble(projects[p], bigRed['attrs']['path'][0][1] + plusX);
        plusX += 160;
    }

    function makeBubble(p, x){
        bubbles[p['name']] = makeCircle(x, bigRed.y, 10, bubbleAttrs);
        bubbles[p['name']].sketchV = p['sketchV'];
        bubbles[p['name']].designV = p['designV'];
        bubbles[p['name']].buildV = p['buildV'];
        bubbles[p['name']].engageV = p['engageV'];
    }

    for(b in bubbles){
        bubbles[b].pname = b;
        fElements[b] = bubbles[b];
        bubbles[b].hover(onBubble, offBubble);
        bubbles[b].click(selectProject);
    }

    var name = r.image('img/name.png', svgWidth - 307, svgHeight - 60, 290, 50);
    coreSkills['Sketch'] = r.text(bigRed['attrs']['path'][0][1], svgHeight / 5, 'sketch').attr(coreSkillsAttr);
    coreSkills['Design'] = r.text(bigRed['attrs']['path'][0][1], 2 * svgHeight / 5, 'design').attr(coreSkillsAttr);
    coreSkills['Build'] = r.text(bigRed['attrs']['path'][0][1], 3 * svgHeight / 5, 'build').attr(coreSkillsAttr);
    coreSkills['Engage'] = r.text(bigRed['attrs']['path'][0][1], 4 * svgHeight / 5, 'engage').attr(coreSkillsAttr);

    function createProject(pname) {
        var project = projects[pname];

        var imgHeight = svgHeight - 140;
        var imgWidth = imgHeight * 1.61;
        var imgX = 30;
        var imgY = 70;
        var margin = 20;

        pElements['img-frame'] = r.rect(imgX, imgY, imgWidth, imgHeight).attr({
            'stroke-width': 4,
            'stroke-linejoin': 'round',
            'stroke': '#222'
        });

        pElements['img'] = r.image('img/' + project['title'].replace(/\s+/g, '-').toLowerCase() + '0.png', imgX, imgY, imgWidth, imgHeight);

        pElements['title'] = r.text(imgX + imgWidth + margin, 85, project['title']).attr({
            'font-family': 'mido',
            'text-anchor': 'start',
            'fill': '#fff',
            'font-size': 30,
            'cursor': 'default'
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
            for (var i = 0; i < project['story'].length; i++) pElements['story'][i].remove();
            if ((bigWidth < maxWidth) || (fontSize < 4)) break;
            else fontSize -= 1;
        }

        // Actually draw text
        var txtY = pElements['title'].getBBox()['y2'] + 40;

        var txtM = Math.min(35, (maxHeight - toth) / i + 1);
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
        if(+(nodeState[this] = !nodeState[this])){
            bigRed.undrag();
            this.cpath = this['attrs']['path'];
            createProject(this.pname);
            for(c in coreSkills) coreSkills[c].animate({opacity: 0}, DISP_TIME, 'easeIn');
            panelActive = true;
            this.stop().animate({
                path: panelPath( 8, 25, svgWidth - 20, svgHeight - 50, 6, 6),
                opacity: 1}, DISP_TIME, 'easeIn'
            );
        } else {
            bigRed.drag(move, start, up);
            removeProject();
            window.setTimeout(bigRed.toFront, DISP_TIME);
            for(c in coreSkills) coreSkills[c].animate({opacity: 1}, DISP_TIME, 'easeIn');
            panelActive = false;
            this.stop().animate({
                path: this.cpath,
                opacity: .7}, DISP_TIME + 100, 'easeOut'
            );
        }
        
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

    function onBubble() {
        this.animate({'stroke-width': 7, 'stroke': DARKBLUE}, 600, 'elastic');
    }

    function offBubble() {
        if(!nodeState[this]){
            this.animate(bubbleAttrs, 600, 'elastic');
        }
    }

    function makeCircle(x, y, rad, a) {
        var p = circlePath(x, y, rad);
        var circle = r.path(p).attr(a);
        circle.cpath = p;

        circle.y = y;
        nodeState[circle] = 0;
        return circle;
    }

    function circlePath(x, y, r) {
        var l = r / Math.sqrt(2);
        var s = r - l;
        var string = 'M ' + x + ', ' + y;
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

    // Functions for dragging paths
    function start() {
        this.ody = 0;
    }

    function move(dx, dy) {
        bigRed.stop().animate({path: circlePath(bigRed['attrs']['path'][0][1], this.ody, 70)}, 500, 'easeOut');
        for(f in fElements) {
            fElements[f].stop().animate({path: circlePath(fElements[f]['attrs']['path'][0][1], this.ody, 40)}, 500, 'easeOut');
        }
        this.ody = dy;
    }
    function up() {
        this.y += this.ody;
        for(f in fElements) {
            fElements[f].y += this.ody;
        }
    };

    function mouseX(evt) {if (!evt) evt = window.event; if (evt.pageX) return evt.pageX; else if (evt.clientX)return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); else return 0;}
    function mouseY(evt) {if (!evt) evt = window.event; if (evt.pageY) return evt.pageY; else if (evt.clientY)return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); else return 0;}

    function followMouse(evt) {
        var my = mouseY(evt);
        //console.log(Math.abs((bigRed['attrs']['path'][0][2]) - my));
        if((Math.abs((bigRed['attrs']['path'][0][2]) - my) > 22) && (!panelActive)) { 
            var mx = mouseX(evt);
            if (mx < 150) {
                bubbleFollow(my, 250, 'easeOut');
            } else if (mx < 200) {
                bubbleFollow(my, mx + 100, 'easeOut');
            }
        }
    }

    function bubbleFollow(my, time, ease) {
        bigRed.stop().animate({path: circlePath(bigRed['attrs']['path'][0][1], my, 70)}, time, ease);
        var sketchF = Math.max(0, (80 - (Math.abs(coreSkills['Sketch']['attrs']['y'] - my) / 2)));
        var designF = Math.max(0, (80 - (Math.abs(coreSkills['Design']['attrs']['y'] - my) / 2)));
        var buildF = Math.max(0, (80 - (Math.abs(coreSkills['Build']['attrs']['y'] - my) / 2)));
        var engageF = Math.max(0, (80 - (Math.abs(coreSkills['Engage']['attrs']['y'] - my) / 2)));

        for(f in fElements) {
            // Try to synch this with bigRed!
            var r = 10;
            r += fElements[f].sketchV * sketchF;
            r += fElements[f].designV * designF;
            r += fElements[f].buildV * buildF;
            r += fElements[f].engageV * engageF;
            fElements[f].animate({path: circlePath(fElements[f]['attrs']['path'][0][1], my, r)}, time, ease);
        }
    }
    document.onmousemove = followMouse;



    function preloadImages(array) {
        if (!preloadImages.list) {
            preloadImages.list = [];
        }
        for (var i = 0; i < array.length; i++) {
            var img = new Image();
            img.src = array[i];
            preloadImages.list.push(img);
        }
    }

    var imageURLs = [
        'img/bus-stop0.png',
        'img/bus-stop1.png',
        'img/bus-stop2.png',
        'img/bus-stop3.png',
        'img/bus-stop4.png',
        'img/nomad0.png',
        'img/nomad1.png',
        'img/nomad2.png',
        'img/nomad3.png',
        'img/nomad4.png',
        'img/asb0.png',
        'img/asb1.png',
        'img/asb2.png',
        'img/asb3.png',
        'img/asb4.png'
    ];

    preloadImages(imageURLs);
};






                    