import * as d3 from 'd3';

const ResizeableRect = (data, svg) => {

  var selectedRoom = null;
  var MAP_HEIGHT = 2500;
  var MAP_WIDTH = MAP_HEIGHT * Math.sqrt(2);

  var MAX_TRANSLATE_X = MAP_WIDTH / 2;
  var MIN_TRANSLATE_X = -MAX_TRANSLATE_X;

  var MAX_TRANSLATE_Y = MAP_HEIGHT / 2;
  var MIN_TRANSLATE_Y = -MAX_TRANSLATE_Y;

  var MIN_RECT_WIDTH = 100;
  var MIN_RECT_HEIGHT = 100;

  var HANDLE_R = 5;
  var HANDLE_R_ACTIVE = 12;

  var wrapper = document.getElementById('main');

  var height = wrapper.offsetHeight;
  var width = wrapper.offsetWidth;

  var svg = d3.select('svg');

  var g = svg;

  g.append('rect')
    .style('fill', 'transparent')
    .attr('x', MIN_TRANSLATE_X)
    .attr('y', MIN_TRANSLATE_Y)
    .attr('width', MAP_WIDTH)
    .attr('height', MAP_HEIGHT);

  function zoomed(event) {
    g.attr('transform', event.transform);
  }

  var zoom = d3.zoom()
    .scaleExtent([1 / 4, 4])
    .translateExtent([
      [MIN_TRANSLATE_X, MIN_TRANSLATE_Y],
      [MAX_TRANSLATE_X, MAX_TRANSLATE_Y]
    ])
    .constrain(function (transform, extent, translateExtent) {
      var cx = transform.invertX((extent[1][0] - extent[0][0]) / 2),
        cy = transform.invertY((extent[1][1] - extent[0][1]) / 2),
        dcx0 = Math.min(0, cx - translateExtent[0][0]),
        dcx1 = Math.max(0, cx - translateExtent[1][0]),
        dcy0 = Math.min(0, cy - translateExtent[0][1]),
        dcy1 = Math.max(0, cy - translateExtent[1][1]);
      return transform.translate(
        Math.min(0, dcx0) || Math.max(0, dcx1),
        Math.min(0, dcy0) || Math.max(0, dcy1)
      );
    })
    .on('zoom', zoomed)

  svg.call(zoom);

  function resizerHover(event) {
    var el = d3.select(this), isEntering = event.type === 'mouseenter';
    el
      .classed('hovering', isEntering)
      .attr(
        'r',
        isEntering || el.classed('resizing') ?
          HANDLE_R_ACTIVE : HANDLE_R
      );
  }

  function rectResizeStartEnd(event) {
    var el = d3.select(this), isStarting = event.type === 'start';
    d3.select(this)
      .classed('resizing', isStarting)
      .attr(
        'r',
        isStarting || el.classed('hovering') ?
          HANDLE_R_ACTIVE : HANDLE_R
      );
  }

  function rectResizing(event, d) {

    var dragX = Math.max(
      Math.min(event.x, MAX_TRANSLATE_X),
      MIN_TRANSLATE_X
    );

    var dragY = Math.max(
      Math.min(event.y, MAX_TRANSLATE_Y),
      MIN_TRANSLATE_Y
    );

    if (d3.select(this).classed('topleft')) {

      var newWidth = Math.max(d.width + d.x - dragX, MIN_RECT_WIDTH);

      d.x += d.width - newWidth;
      d.width = newWidth;

      var newHeight = Math.max(d.height + d.y - dragY, MIN_RECT_HEIGHT);

      d.y += d.height - newHeight;
      d.height = newHeight;

    } else {

      d.width = Math.max(dragX - d.x, MIN_RECT_WIDTH);
      d.height = Math.max(dragY - d.y, MIN_RECT_HEIGHT);

    }

    update();
  }

  function rectMoveStartEnd(event, d) {
    d3.select(this).classed('moving', event.type === 'start');
  }

  function rectMoving(event,d) {

    var dragX = Math.max(
      Math.min(event.x, MAX_TRANSLATE_X - d.width),
      MIN_TRANSLATE_X
    );

    var dragY = Math.max(
      Math.min(event.y, MAX_TRANSLATE_Y - d.height),
      MIN_TRANSLATE_Y
    );

    d.x = dragX;
    d.y = dragY;

    update();
  }

  function update() {

    var rects = g
      .selectAll('.bg')
      .data(data, function (d) {
        return d;
      });

    rects.exit().remove();

    var newRects =
      rects.enter()
        .append('g')
        .classed('rectangle', true);

    newRects
      .append('rect')
      .classed('bg', true)
      .attr('id', function(d) { return d.id })
      .attr('fill', function (d) {return d.color} )
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('transform', 'none')
      .call(d3.drag()
        .container(g.node())
        .on('start end', rectMoveStartEnd)
      )
      .on('click', function (d,i) {
        // Find previously selected, unselect
        d3.select(".selected-room").classed("selected-room", false);

        // Select current item
        const cur = d3.select(this);
        cur.classed("selected-room", true);
        console.log('CLICK', i)
        selectedRoom = i.id
        update()
      });

    newRects
      .append('g')
      .classed('circles', true)
      .each(function (d) {
        var circleG = d3.select(this);
        console.log('selectedRoom', selectedRoom, d)
        // circleG
        //   .append('circle')
        //   .classed('topleft', true)
        //   .attr('r', HANDLE_R)
        //   .on('mouseenter mouseleave', resizerHover)
        //   .call(d3.drag()
        //     .container(g.node())
        //     .subject(function (event) {
        //       return {x: event.x, y: event.y};
        //     })
        //     .on('start end', rectResizeStartEnd)
        //     .on('drag', rectResizing)
        //   );
        if (selectedRoom == d.id) {
        svg.selectAll('.bottomright').remove()
        circleG
          .append('circle')
          .classed('bottomright', true)
          .attr('r', HANDLE_R)
          .on('mouseenter mouseleave', resizerHover)
          .call(d3.drag()
            .container(g.node())
            .subject(function (event) {
              return {x: event.x, y: event.y};
            })
            .on('start end', rectResizeStartEnd)
            .on('drag', rectResizing)
          );
        }
      });

    var allRects = newRects.merge(rects);

    allRects
      .attr('transform', function (d) {
        console.log('dagta', d)
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    allRects
      .select('rect.bg')
      .attr('height', function (d) {
        return d.height;
      })
      .attr('width', function (d) {
        return d.width;
      });

    allRects
      .select('circle.bottomright')
      .attr('cx', function (d) {
        return d.width;
      })
      .attr('cy', function (d) {
        return d.height;
      });

  }

  function controlChange() {
    data[0][this.id] = +this.value;
    update();
  }

  function windowResize() {
    var zoomTransform = d3.zoomTransform(svg.node());

    var k = zoomTransform.k,
      x = zoomTransform.x,
      y = zoomTransform.y;

    x -= width / 2;
    y -= height / 2;

    height = wrapper.offsetHeight;
    width = wrapper.offsetWidth;
    zoom.extent([[0, 0], [width, height]])

    x += width / 2;
    y += height / 2;
  }

  zoom.transform(svg, d3.zoomIdentity.translate(width / 2, height / 2));

  window.addEventListener('resize', windowResize);

  windowResize();
  update();
  return svg
}

export default ResizeableRect;
