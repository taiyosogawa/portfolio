window.onload = function () {
    var r = Raphael("container-div", window.innerWidth, window.innerHeight);
    
     // Rect 3
    (function () {
        var start = function () {
          this.odx = 0;
          this.ody = 0;
          this.animate({"fill-opacity": 0.2}, 500);
        },
        move = function (dx, dy) {
          this.translate(dx - this.odx, dy - this.ody);
          this.odx = dx;
          this.ody = dy;
        },
        up = function () {
            this.animate({"fill-opacity": 1}, 500);
        };

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

        function makeRoundedRect(x, y, w, h, r) {
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
            var r = f.getBBox().x2 - f.getBBox().x / 2;
            var oldPath = makeCircle(f.getBBox().x + f.getBBox().x2 / 2, f.getBBox().y + f.getBBox().y2 / 2, r);
            var dx = c.getBBox().x - f.getBBox().x;
            var dy = c.getBBox().y - f.getBBox().y;
            var newPath = makeCircle((dx - x) / 2, (dy - y) / 2, r);
            f.stop().animate({oldPath: newPath}, 1000, 'easeIn');
        }

        var path1 = makeCircle(window.innerWidth / 2, window.innerHeight / 2, 70),
            path2 = makeRoundedRect(50, 50, window.innerWidth - 100, window.innerHeight - 100, 10, 10);
        var el = r.path(path1).attr({fill: "red", stroke: "#fff", "stroke-width": 2}),
            elattrs = [{path: path2}, {path: path1}],
            now = 1;

        var follower = r.path(makeCircle(300, 300, 20)).attr({fill: "red", stroke: "#fff", "stroke-width": 2});

        follow(follower, el, 100, 100);
        el.drag(move, start, up);

        el.dblclick(function () {
            el.stop().animate(elattrs[+(now = !now)], 1000, 'easeIn');
        });

    })();
};


// Concurrently change od with the shape transform