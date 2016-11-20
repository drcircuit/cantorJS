function createScreen(name, width, height) {
    var scr    = document.createElement('canvas');
    scr.id     = name;
    scr.width  = width;
    scr.height = height;
    document.body.appendChild(scr);
    return {
        screen: scr,
        ctx: scr.getContext('2d'),
        height: height,
        width: width
    };
}
function cantor(c) {
    if (c.sections) {
        c.sections.forEach(function (sc) {
            cantor(sc);
        });
    } else {
        var next   = c.width / 3;
        var c1     = {width: next, startX: c.startX, y: c.y  + c.margin, margin:c.margin};
        var c2     = {width: next, startX: c.startX + next * 2, y: c.y + c.margin, margin:c.margin};
        c.sections = [c1, c2];
    }
}
function draw(c, screen, height) {

    screen.fillStyle = '#fff';
    screen.fillRect(c.startX, c.y, c.width, height);
    if (c.sections) {
        c.sections.forEach(function (nextc) {
            draw(nextc, screen, height *0.88);
        });
    }
}
function main() {
    var scr    = createScreen('screen', window.innerWidth, window.innerHeight);
    var margin = 10;

    var iterations = 15;
    var c          = {width: scr.width - margin * 2, startX: margin, y: margin * 2, margin: margin*7};
    for (var i = 0; i < iterations; ++i) {
        cantor(c);
    }
    draw(c, scr.ctx,50);
}
main();