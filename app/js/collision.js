// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = false;

const collisionSVG = "collisionSVG";
var force = [];
var nodes = [];

window.onload = async function () {
  if (!window.saveDataAcrossSessions) {
    var localstorageDataLabel = "webgazerGlobalData";
    localforage.setItem(localstorageDataLabel, null);
    var localstorageSettingsLabel = "webgazerGlobalSettings";
    localforage.setItem(localstorageSettingsLabel, null);
  }
  const webgazerInstance = await webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    .setTracker("TFFacemesh")
    .begin();
  webgazerInstance
    .showVideoPreview(true) /* shows all video previews */
    .showPredictionPoints(
      false
    ) /* shows a square every 100 milliseconds where current prediction is */
    .applyKalmanFilter(true); // Kalman Filter defaults to on.
  // Add the SVG component on the top of everything.
  setupCollisionSystem();
  webgazer.setGazeListener(collisionEyeListener);
};

window.onbeforeunload = function () {
  if (window.saveDataAcrossSessions) {
    webgazer.end();
  } else {
    localforage.clear();
  }
};

function setupCollisionSystem() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var numberOfNodes = 50;

  (nodes = d3.range(numberOfNodes).map(function () {
    return { radius: Math.random() * 12 + 4 };
  })),
    (nodes[0].radius = 0);
  nodes[0].fixed = true;

  force = d3.layout
    .force()
    .gravity(0.05)
    .charge(function (d, i) {
      return i ? 0 : -2000;
    })
    .nodes(nodes)
    .size([width, height])
    .start();

  var svg = d3
    .select("body")
    .insert("svg", ":first-child")
    .attr("id", collisionSVG)
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("inset", "0px")
    .style("z-index", 10);

  var color = d3.scale.category10();
  var colors = [];
  for (var i = 0; i < numberOfNodes - 2; i++) {
    //colors[i] = color(i%3);
    colors[i] = color(0);
  }
  colors.push("orange");

  svg
    .selectAll("circle")
    .data(nodes.slice(1))
    .enter()
    .append("circle")
    .attr("r", function (d) {
      return d.radius;
    })
    .style("fill", function (d, i) {
      return colors[i];
    });

  force.on("tick", function (e) {
    var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    svg
      .selectAll("circle")
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
  });

  svg
    .append("line")
    .attr("id", "eyeline1")
    .attr("class", "eyeline")
    .attr("stroke-width", 1)
    .attr("stroke", "gray");

  svg
    .append("line")
    .attr("id", "eyeline2")
    .attr("class", "eyeline")
    .attr("stroke-width", 1)
    .attr("stroke", "gray");

  svg
    .append("ellipse")
    .attr("id", "predictionPoint")
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", "limegreen");

  svg.on("mousemove", function () {
    var p1 = d3.mouse(this);
    nodes[0].px = p1[0];
    nodes[0].py = p1[1];
    force.resume();
  });

  function collide(node) {
    var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
    return function (quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== node) {
        var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
        if (l < r) {
          l = ((l - r) / l) * 0.5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }
}

var webgazerCanvas = null;

var previewWidth = webgazer.params.videoViewerWidth;

var collisionEyeListener = async function (data, clock) {
  if (!data) return;

  nodes[0].px = data.x;
  nodes[0].py = data.y;
  force.resume();

  if (!webgazerCanvas) {
    webgazerCanvas = webgazer.getVideoElementCanvas();
  }

  var fmPositions = await webgazer.getTracker().getPositions();

  var whr = webgazer.getVideoPreviewToCameraResolutionRatio();

  var line = d3
    .select("#eyeline1")
    .attr("x1", data.x)
    .attr("y1", data.y)
    .attr("x2", previewWidth - fmPositions[145][0] * whr[0])
    .attr("y2", fmPositions[145][1] * whr[1]);

  var line = d3
    .select("#eyeline2")
    .attr("x1", data.x)
    .attr("y1", data.y)
    .attr("x2", previewWidth - fmPositions[374][0] * whr[0])
    .attr("y2", fmPositions[374][1] * whr[1]);

  var dot = d3.select("#predictionPoint").attr("cx", data.x).attr("cy", data.y);
};
