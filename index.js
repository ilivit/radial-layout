'use strict';

var tree = {
    value: 'root',
    chlidren: [
        {
            value: 1,
            children: [{ value: 11 }, {
                value: 12,
                children: [
                    { value: 121 }
                ]
            }, {
                value: 13,
                children: [
                    {}, {}, {}, {}, {}
                ]
            }]
        },
        {
            value: 2,
            children: [{
                value: 21,
                children: [
                    { value: 121 },
                    { value: 121 }
                ]
            }, { value: 22 }]
        },
        {
            value: 3,
            children: [{ value: 31 },
            {
                value: 32,
                children: [{ value: 321 }, { value: 322 }]
            }]
        }, {}, {}]
};

var w = 600;
var h = 400;

var r = 100;

var cx = w / 2;
var cy = h / 2;


var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: w,
    height: h,
    model: graph,
    gridSize: 1
});

// var rect = new joint.shapes.basic.Rect({
//     position: { x: 100, y: 30 },
//     size: { width: 100, height: 30 },
//     attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
// });

// var rect2 = rect.clone();
// rect2.translate(300, 10);

// var link = new joint.dia.Link({
//     source: { id: rect.id },
//     target: { id: rect2.id }
// });

// graph.addCells([rect, rect2, link]);

function link(src, dst) {
    return new joint.dia.Link({
        source: { id: src.id },
        target: { id: dst.id }
    });
}

function circle(val, th, r, cx, cy) {
    var pos = {
        x: r * Math.cos(th) + cx,
        y: r * Math.sin(th) + cy
    };
    return new joint.shapes.basic.Circle({
        position: pos,
        size: { width: 30, height: 30 },
        attrs: { text: { text: val } }
    })
}

var root = circle('root', 0, 0, cx, cy);
graph.addCell(root);

//(2πi/m,r),

_.forEach(tree.chlidren, function (n, i, arr) {
    var th = 2 * Math.PI * i / arr.length;
    var node = circle(n.value, th, r, cx, cy);
    graph.addCells([node, link(root, node)]);

    var fi0 = Math.PI - th;

    drawSubtree(node.attributes.position.x, node.attributes.position.y, fi0, n, node);
})

function drawSubtree(cx, cy, fi0, tree, parent) {
    var children = tree.children || [];
    // (π −φ/2+φi/m+φ/(2m),r), 
    var π = Math.PI;
    var φ = 2;
    var m = children.length;
    _.forEach(children, function (n, i) {
        //i+=1;
        var th = (Math.PI - φ / 2 + φ * i / m + φ / (2 * m)) - fi0;
        var r = 50;
        var c = circle(n.value, th, r, cx, cy);
        graph.addCells([c, link(parent, c)])

        var fi00 = Math.PI - th;

        drawSubtree(c.attributes.position.x, c.attributes.position.y, fi00, n, c);


    });





}
