window.onload = function () {
    /*
     * CONSTANTS
     */
    var DISP_TIME = 800;
    var BLUE = '#5f9ea0';
    var WHITE = '#fff';
    var RED = '#b22222';
    var DARKRED = '#900000';
    var GRAYBLUE = '#7bb';
    var DARKBLUE = '#2f6e70';
    var svgWidth = Math.max(window.innerWidth, screen.width - 400);
    var svgHeight = window.innerHeight;
    if(svgWidth < svgHeight * 1.8) svgHeight = svgWidth / 1.8;
    var r = Raphael('container-div', svgWidth, svgHeight);
    var bubbles = {};
    var bubbleLabels = {};
    var pElements = {};
    var mElements = {};
    var coreSkills = {};
    var activeState = 'loading';
    var activeBubble;
    var activeProject;
    var coreSkillsAttr = {
        'font-family': 'mido',
        'font-size': 40,
        'fill': '#fff',
        'cursor': 'default'
    };
    var bubbleAttrs = {
        'fill': BLUE,
        'opacity': .5,
        'stroke': DARKBLUE,
        'stroke-width': 1.5,
        'cursor': 'pointer'
    };
    var bigRedAttrs = {
        fill: RED,
        opacity: .9,
        stroke: DARKRED,
        'stroke-width': 1.5
    };
    var titleAttrs = {
        'font-family': 'mido',
        'text-anchor': 'start',
        'fill': '#fff',
        'cursor': 'default',
        'font-size': 30
    };
    var textAttrs = {
        'font-family': 'Roboto Condensed',
        'text-anchor': 'start',
        'fill': GRAYBLUE,
        'cursor': 'default',
        'font-size': 22
    };

    /*
     * PROJECTS
     */

    var designPhilosophy = 'I believe in design!';

     var projects = {
        'Pulley Chair': {
            'name': 'Pulley Chair',
            'title': 'Alternative Student Breaks',
            'story': [
                'Through Northwestern Alternative Student Breaks,\nI volunteered at Habitat for Humanity in Mississippi.',
                'I wanted to get more involved and I saw that\n the group needed help with their website.',
                'I was appointed to be the ASB Publicity Coordinator\nand started working out usable code.',
                'I even practiced some graphic design. It was a\ncreative outlet for a cause that mattered to me.',
                'Of course nothing compared to getting on the road\nagain; this time leading a trip for new freshmen\nto a school for children with autism in Pittsburgh.'
            ],
            'drawV': .2,
            'designV': .3,
            'buildV': .3,
            'engageV': .2
        },

        'WildCloud': {
            'name': 'WildCloud',
            'title': 'WildCloud Classroom Software',
            'story': [
                'Our team noticed that instructors often struggle to get\nhonest, useful feedback in a large class.',
                'We began prototyping interfaces that would facilitate\nreal-time communication in a classroom setting.',
                'User testing showed flaws in our system. Users had no\nway of deleting classes they had mistakenly joined.',
                'We got some of the website functionality right...',
                'But through this experience, I learned about the\nimportance of robust web design across browsers.'
            ],
            'drawV': .1,
            'designV': .6,
            'buildV': .3,
            'engageV': .1
        },

        'Nomad': {
            'name': 'Nomad',
            'title': 'Nomad',
            'story': [
                'A team of engineers and MBAs, we saw a technology\nneed among food trucks as a business opportunity for us.',
                'The truck owner\'s workflow revealed that their IT was\ncumbersome and outdated.',
                'We also found that the food truck industry was growing.\nIt was the market for us.',
                'Based on observations, we explored every user sequence\nat the chalkboard.',
                'My contribution was building the website with PHP,\njQuery, and OAuth. A step up from my WildCloud project.'
            ],
            'drawV': .1,
            'designV': .3,
            'buildV': .4,
            'engageV': .2
        },

        'Bus Stop': {
            'name': 'Bus Stop',
            'title': 'Bus Stop',
            'story': [
                'For an industrial design project, I was looking for\na way to make the bus stop a desireable place to be.',
                'A meditative enclosing could be relaxing, but you\ndon\'t know who you might meet inside.',
                'The design evolved to capitalize on its\nsurroundings rather than closing them off.',
                'It eventually became a self sustained ecosphere,\npowering its own display and collecting water and\ncompost for its plants.',
                'A display of concerted environmental efforts\nwould involve the entire community.'
            ],
            'drawV': .8,
            'designV': .2,
            'buildV': 0,
            'engageV': 0
        },

        'ASB': {
            'name': 'ASB',
            'title': 'Alternative Student Breaks',
            'story': [
                'Through Northwestern Alternative Student Breaks, I\nvolunteered at Habitat for Humanity in Mississippi.',
                'I wanted to get more involved and saw that the group\nneeded help with their website.',
                'I was appointed to be the ASB Publicity Coordinator\nand started working out usable code.',
                'I even practiced some graphic design. It was a creative\noutlet for a cause that mattered to me.',
                'Of course nothing compared to getting on the road again;\nthis time leading a trip for new freshmen to a school for\nchildren with autism in Pittsburgh.'
            ],
            'drawV': .2,
            'designV': 0,
            'buildV': .3,
            'engageV': .5
        },

        'Brad Box': {
            'name': 'Brad Box',
            'title': 'Brad Box',
            'story': [
                'Brad, a man who has no motor control beneath the neck and uses\nsynthesized speech, needed a better way to make phone calls.',
                'Before designing anything, our team tried to imagine ourselves\nin his shoes by sketchin and playing out user scenarios',
                'Through research and experimentation, I devised a software and\nhardware setup that enables Brad to control an Android phone.',
                'The integrated system was tested so that Brad\'s system would\nbe robust in many contexts',
                'I\'m looking forward to handing it off to Brad!'
            ],
            'drawV': .1,
            'designV': .3,
            'buildV': .5,
            'engageV': .1
        }
    };

    var pElements = {
        'story': []
    };

    var bigRed = makeCircle(100, -50, 70, bigRedAttrs);

    /*
     * CODE
     */ 

    var plusX = 190;

    for(p in projects){
        makeBubble(projects[p], bigRed['attrs']['path'][0][1] + plusX);
        plusX += 145;
    }

    for(b in bubbles){
        bubbles[b].pname = b;
        bubbles[b].hover(function () {
            this.animate({'stroke-width': 7}, 600, 'elastic');}, 
            function () {
                if(activeState == 'home'){
                    this.animate(bubbleAttrs, 600, 'elastic');
                }
            });
        bubbles[b].click(selectProject);
    }

    coreSkills['Draw'] = r.text(bigRed['attrs']['path'][0][1], svgHeight / 5, 'draw').attr(coreSkillsAttr);
    coreSkills['Design'] = r.text(bigRed['attrs']['path'][0][1], 2 * svgHeight / 5, 'design').attr(coreSkillsAttr);
    coreSkills['Build'] = r.text(bigRed['attrs']['path'][0][1], 3 * svgHeight / 5, 'build').attr(coreSkillsAttr);
    coreSkills['Engage'] = r.text(bigRed['attrs']['path'][0][1], 4 * svgHeight / 5, 'engage').attr(coreSkillsAttr);

    var myPanel = r.rect(0, svgHeight, svgWidth, svgHeight - 60).attr({
        'fill': 'url(img/first_aid_kit.png)'
    });

 
 /*
    var navRibbonPath = 'M 30 ' + (-.95 * svgHeight) + ' h 120 v ' + (.95 * svgHeight) + ' l -60 -60 l -60 60 v ' + (-.95 * svgHeight);

    var navRibbon = r.path(navRibbonPath).attr({
        'fill': 'url(img/ribbon.png)',
        'stroke': WHITE
    })
*/

    var name = r.image('img/name.png', svgWidth - 307, svgHeight - 64, 290, 50).attr({'cursor': 'pointer'});
    name.click(function () {
        if(activeState == 'home') {
            activeState = 'aboutMe';
            for(b in bubbles) bubbles[b].animate({'opacity': 0}, DISP_TIME, 'easeIn');
            for(bl in bubbleLabels) bubbleLabels[bl].animate({'opacity': 0}, DISP_TIME, 'easeIn');
            myPanel.toFront();
            //navRibbon.toFront();
            bigRed.stop().animate({'opacity': 0}, DISP_TIME, 'easeIn');
            this.stop().animate({'y': 10}, DISP_TIME + 200, 'bounce', createAboutMe);
            myPanel.stop().animate({'y': 64}, DISP_TIME + 200, 'bounce');
            //navRibbonPath = 'M 30 -1 h 120 v ' + (.95 * svgHeight) + ' l -60 -60 l -60 60 v ' + (-.95 * svgHeight);
        } else if(activeState == 'aboutMe') {
            changeToHome();
            destroyPElements();
            for(b in bubbles) bubbles[b].animate(bubbleAttrs, DISP_TIME, 'easeIn');
            for(bl in bubbleLabels) bubbleLabels[bl].animate({'opacity': 1}, DISP_TIME, 'easeIn');
            for(m in mElements) mElements[m].remove();
            bigRed.stop().animate(bigRedAttrs, DISP_TIME, 'easeIn');
            this.stop().animate({'y': svgHeight - 64}, DISP_TIME, 'bounce');
            myPanel.stop().animate({'y': svgHeight}, DISP_TIME, 'bounce');
            //navRibbonPath = 'M 30 ' + (-.95 * svgHeight) + ' h 120 v ' + (.95 * svgHeight) + ' l -60 -60 l -60 60 v ' + (-.95 * svgHeight);
        } else if(activeState == 'project') {
            changeToHome();
            destroyPElements();
            for(b in bubbles) bubbles[b].animate(bubbleAttrs, DISP_TIME, 'easeIn');
            for(bl in bubbleLabels) bubbleLabels[bl].animate({'opacity': 1}, DISP_TIME, 'easeIn');
            for(c in coreSkills) coreSkills[c].animate({opacity: 1}, DISP_TIME, 'easeIn');
            bigRed.stop().animate(bigRedAttrs, DISP_TIME, 'easeIn');
            activeBubble.stop().animate({path: activeBubble.cpath, 'stroke-width': 1.5}, DISP_TIME, 'easeIn');
            activeBubble.attr({'cursor': 'pointer'});
        }
        //navRibbon.animate({'path': navRibbonPath}, DISP_TIME, 'easeOut');
    });

    bubbleFollow(svgHeight / 5, DISP_TIME, 'easeIn');
    window.setTimeout(function () {activeState = 'home';}, DISP_TIME);
    /*
     * FUNCTION DEFINITIONS
     */

    function destroyPElements() {
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

    function makeBubble(p, x){
        bubbles[p['name']] = makeCircle(x, bigRed.y, 10, bubbleAttrs);
        bubbleLabels[p['name']] = r.text(x, bigRed.y - 25, p['name']).attr({'fill': WHITE, 'font-family': 'mido', 'font-size': 14});
        bubbles[p['name']].drawV = p['drawV'];
        bubbles[p['name']].designV = p['designV'];
        bubbles[p['name']].buildV = p['buildV'];
        bubbles[p['name']].engageV = p['engageV'];
    }

    function setPicBackground(p){
        bubbles[p['name']].attr({'fill': 'url(img/' + p['name'] + '.png)'});
    }

    function selectProject() {
        if(activeState == 'home') {
            for(b in bubbles) {
                if(b != this.pname) bubbles[b].animate({'opacity': 0}, DISP_TIME, 'easeIn');
            }
            for(bl in bubbleLabels) bubbleLabels[bl].animate({'opacity': 0}, DISP_TIME, 'easeIn');
            activeState = 'toProject';
            activeBubble = this;
            this.toFront();
            this.cpath = this['attrs']['path'];
            this.attr({'cursor': 'default'});
            createProject(this.pname);
            for(c in coreSkills) coreSkills[c].animate({opacity: 0}, DISP_TIME, 'easeIn');
            bigRed.animate({opacity: 0}, DISP_TIME, 'easeIn');
            this.stop().animate({path: panelPath( 8, 25, svgWidth - 20, svgHeight - 50, 6, 6)}, DISP_TIME, 'easeIn');
        }
    }

    function createAboutMe() {
        var iconAttrs = {'opacity': 0, 'cursor': 'pointer'};
        var imgWidth = svgWidth - 200;
        var imgHeight = svgWidth * 900 / 3283;
        if (imgHeight > svgHeight - 240) {
            imgHeight = svgHeight - 240;
            svgWidth = svgHeight * 3283 / 900;
        }
        mElements['design-philosophy'] = r.image('img/design-philosophy.png', 100, (svgHeight - (imgHeight + 60)) / 2, imgWidth, imgHeight).attr({'opacity': 0});
        mElements['resume-icon'] = r.image('img/resume-icon.png', 4 * svgWidth / 11 - 30, svgHeight - 70, 60, 60).attr(iconAttrs);
        mElements['email-icon'] = r.image('img/email-icon.png', 5 * svgWidth / 11 - 30, svgHeight - 70, 60, 60).attr(iconAttrs);
        mElements['linkedin-icon'] = r.image('img/linkedin-icon.png', 6 * svgWidth / 11 - 30, svgHeight - 70, 60, 60).attr(iconAttrs);
        mElements['github-icon'] = r.image('img/github-icon.png', 7 * svgWidth / 11 - 30, svgHeight - 70, 60, 60).attr(iconAttrs);

        mElements['resume-icon'].click(function(){window.open('resume.pdf');});
        mElements['linkedin-icon'].click(function(){window.open('http://linkedin.com/in/taiyosogawa');});
        mElements['github-icon'].click(function(){window.open('https://github.com/taiyosogawa');});

        mElements['design-philosophy'].animate({opacity: 1}, DISP_TIME/2, 'easeIn');   
        for(m in mElements) {
            mElements[m].animate({opacity: 1}, DISP_TIME, 'easeIn');   
        }
    }

    function createProject(pname) {
        var project = projects[pname];
        var imgHeight = svgHeight - 140;
        var imgWidth = Math.min(Math.min(imgHeight * 1.55, svgWidth / 1.6), svgWidth - 400) - 40;
        imgHeight = imgWidth / 1.55;

        var imgX = 100;
        if(imgWidth + imgX + 340 > svgWidth) {
            imgX = 30;
        } else {
            var valAttrs = {
                'font-family': 'mido',
                'font-size': 12,
                'fill': '#fff',
                'cursor': 'default'};
            var valCircleAttrs = {
                'fill': RED,
                'opacity': .65,
                'stroke': DARKRED,
                'stroke-width': 1.5
            };
            pElements['drawVC'] = r.path(circlePath(54, svgHeight/5, 5 + 35*project['drawV'])).attr(valCircleAttrs);
            pElements['drawVT'] = r.text(54, svgHeight/5 - 15 - 35*project['drawV'], 'Draw').attr(valAttrs);
            pElements['designVC'] = r.path(circlePath(54, 2*svgHeight/5, 5 + 35*project['designV'])).attr(valCircleAttrs);
            pElements['designVT'] = r.text(54, 2*svgHeight/5 - 17 - 35*project['designV'], 'Design').attr(valAttrs);
            pElements['buildVC'] = r.path(circlePath(54, 3*svgHeight/5, 5 + 35*project['buildV'])).attr(valCircleAttrs);
            pElements['buildVT'] = r.text(54, 3*svgHeight/5 - 15 - 35*project['buildV'], 'Build').attr(valAttrs);
            pElements['engageVC'] = r.path(circlePath(54, 4*svgHeight/5, 5 + 35*project['engageV'])).attr(valCircleAttrs);
            pElements['engageVT'] = r.text(54, 4*svgHeight/5 - 17 - 35*project['engageV'], 'Engage').attr(valAttrs);

        }

        var imgY = (svgHeight - imgHeight) / 2;
        var margin = 20;

        pElements['img-frame'] = r.rect(imgX, imgY, imgWidth, imgHeight).attr({
            'stroke-width': 4,
            'stroke-linejoin': 'round',
            'stroke': '#222'
        });

        pElements['img'] = r.image('img/' + project['title'].replace(/\s+/g, '-').toLowerCase() + '0.png', imgX, imgY, imgWidth, imgHeight);

        var maxWidth = svgWidth - imgX - imgWidth - margin - 30;
        var fontSize = 30;
        var txtX = imgX + imgWidth + margin;

         while(true) {
            var i;
            var story;
            var storyWidth;
            story = r.text(txtX, 0, project['title']).attr(titleAttrs).attr({'font-size': fontSize});
            storyWidth = story.getBBox()['width'];
            story.remove();
            if(storyWidth > maxWidth) fontSize -= 1;
            else break;
        }

        pElements['title'] = r.text(imgX + imgWidth + margin, 85, project['title']).attr(titleAttrs).attr({'font-size': fontSize});

        var maxHeight = svgHeight - pElements['title'].getBBox()['y2'] - 105;
        fontSize = 22;

        // Calculate correct layouts
        while(true) {
            var i;
            var story;
            var storyWidth;
            var toth = 0;
            for(i = 0; i < project['story'].length; i++) {
                story = r.text(txtX, 0, project['story'][i]).attr(textAttrs).attr({'font-size': fontSize});
                storyWidth = story.getBBox()['width'];
                toth += story.getBBox()['height'];
                story.remove();
                if(storyWidth > maxWidth) {
                    fontSize -= 1;
                    break;
                }
            }
            if((i == project['story'].length) || (fontSize < 4)) {
                break;
            }
        }

        // Actually draw text
        var txtY = pElements['title'].getBBox()['y2'] + Math.min(50, 20 + (maxHeight - toth) / i);
        var txtM = Math.min(100, maxHeight / i);
        for(i = 0; i < project['story'].length; i++) {
                pElements['story'][i] = r.text(txtX, txtY, 
                project['story'][i]).attr(textAttrs).attr({'font-size': fontSize}).hover(function () {
                    if(activeState == 'project') {
                        pElements['img'].attr({
                            'src': 'img/' + pElements['title']['attrs']['text'].replace(/\s+/g, '-').toLowerCase() + pElements['story'].indexOf(this) + '.png'
                        });
                        for(var i = 0; i < pElements['story'].length; i++) {
                            pElements['story'][i].stop().animate({'fill': GRAYBLUE}, 400, 'easeIn');
                        }
                        this.stop().animate({'fill': '#fff'}, 400, 'easeIn');
                    }
                }, function(){});
               txtY += txtM;
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
        window.setTimeout(function () {activeState = 'project';}, DISP_TIME/2);
    }


    function makeCircle(x, y, rad, a) {
        var p = circlePath(x, y, rad);
        var circle = r.path(p).attr(a);
        circle.cpath = p;
        circle.y = y;
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

    function changeToHome() {
        activeState = 'toHome';
        window.setTimeout(function() {activeState = 'home';}, DISP_TIME);
    }

    function mouseX(evt) {if (!evt) evt = window.event; if (evt.pageX) return evt.pageX; else if (evt.clientX)return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); else return 0;}
    function mouseY(evt) {if (!evt) evt = window.event; if (evt.pageY) return evt.pageY; else if (evt.clientY)return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); else return 0;}

    function followMouse(evt) {
        if ((Math.random() > .7) && (activeState == 'home')) {
            var my = mouseY(evt);
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
        var drawF = Math.max(0, (80 - (Math.abs(coreSkills['Draw']['attrs']['y'] - my) / 2)));
        var designF = Math.max(0, (80 - (Math.abs(coreSkills['Design']['attrs']['y'] - my) / 2)));
        var buildF = Math.max(0, (80 - (Math.abs(coreSkills['Build']['attrs']['y'] - my) / 2)));
        var engageF = Math.max(0, (80 - (Math.abs(coreSkills['Engage']['attrs']['y'] - my) / 2)));

        for(b in bubbles) {
            // Try to synch this with bigRed!
            var r = 10;
            r += bubbles[b].drawV * drawF;
            r += bubbles[b].designV * designF;
            r += bubbles[b].buildV * buildF;
            r += bubbles[b].engageV * engageF;
            bubbles[b].animate({path: circlePath(bubbles[b]['attrs']['path'][0][1], my, r)}, time, ease);
            bubbleLabels[b].animate({'x': bubbles[b]['attrs']['path'][0][1], 'y': my - r - 12}, time, ease);
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
        'img/alternative-student-breaks0.png',
        'img/alternative-student-breaks1.png',
        'img/alternative-student-breaks2.png',
        'img/alternative-student-breaks3.png',
        'img/alternative-student-breaks4.png'
    ];

    preloadImages(imageURLs);


};


/*
    TODO
    -Dynamically size Title
    -Have story points align correctly horizontally
    -Have story points align correctly vertically
    -Have SVG scale correctly to window size -- have scroll bars appear if necessary. Don't have svg exceed the screen size (unless window size exceeds screen size)
    -Design philosophy jumps up when clicking on name
    -An easier way to transition from project back to the main screen 
    -Labels for each project
    -LinkedIn, GitHub links
    -


    Consider having onmousemove update a variable and create an infinite loop that checks that variable!!
*/


/* bigRed drag functions

  // Functions for dragging paths
    function start() {
        this.ody = 0;
    }

    function move(dx, dy) {
        bigRed.stop().animate({path: circlePath(bigRed['attrs']['path'][0][1], this.ody, 70)}, 500, 'easeOut');
        for(b in bubbles) {
            bubbles[b].stop().animate({path: circlePath(bubbles[b]['attrs']['path'][0][1], this.ody, 40)}, 500, 'easeOut');
        }
        this.ody = dy;
    }
    function up() {
        this.y += this.ody;
        for(b in bubbles) {
            bubbles[b].y += this.ody;
        }
    };

*/