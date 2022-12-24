function getDragCorners() {
    return {
      topleft: function (d, bb0, m) {
        d.x = Math.max(0, Math.min(bb0.x + bb0.width, m[0]));
        d.y = Math.max(0, Math.min(bb0.y + bb0.height, m[1]));
        d.w = (m[0] > 0) ? Math.min(Math.abs(self.options.w - d.x), Math.abs(bb0.x + bb0.width - m[0])) : d.w;
        d.h = (m[1] > 0) ? Math.min(Math.abs(self.options.h - d.y), Math.abs(bb0.y + bb0.height - m[1])) : d.h;
      },

      topright: function (d, bb0, m) {
        d.x = Math.max(0, Math.min(bb0.x, m[0]));
        d.y = Math.max(0, Math.min(bb0.y + bb0.height, m[1]));
        d.w = (m[0] > 0) ? Math.min(Math.abs(self.options.w - d.x), Math.abs(bb0.x - m[0])) : d.w;
        d.h = (m[1] > 0) ? Math.min(Math.abs(self.options.h - d.y), Math.abs(bb0.y + bb0.height - m[1])) : d.h;
      },

      botleft: function (d, bb0, m) {
        d.x = Math.max(0, Math.min(bb0.x + bb0.width, m[0]));
        d.y = Math.max(0, Math.min(bb0.y, m[1]));
        d.w = (m[0] > 0) ? Math.min(Math.abs(self.options.w - d.x), Math.abs(bb0.x + bb0.width - m[0])) : d.w;
        d.h = (m[1] > 0) ? Math.min(Math.abs(self.options.h - d.y), Math.abs(bb0.y - m[1])) : d.h;
      },

      botright: function (d, bb0, m) {
        d.x = Math.max(0, Math.min(bb0.x, m[0]));
        d.y = Math.max(0, Math.min(bb0.y, m[1]));
        d.w = (m[0] > 0) ? Math.min(Math.abs(self.options.w - d.x), Math.abs(bb0.x - m[0])) : d.w;
        d.h = (m[1] > 0) ? Math.min(Math.abs(self.options.h - d.y), Math.abs(bb0.y - m[1])) : d.h;
      }
    };
  }

  var makeContainer = function (id) {
    // Make a container, which depends on the corner (specified by `id`)
    var dragCorners, cursor, bb0;

    // Get the correct transformation function
    dragCorners = getDragCorners()[id];
    // Get the correct cursor
    if (contains(['topleft', 'botright'], id)) {
      cursor = 'nwse-resize';
    } else {
      cursor = 'nesw-resize';
    }

    var start = function () {
      // Set the present group to be active
      self.setActive(groupClass, false);
      // Get the active groups
      activeG = d3.selectAll('g.active');
      // Get the initial Bounding Box
      bb0 = r.node().getBBox();
      // Display correct cursor tip
      self.svg.style('cursor', cursor);
    }

    var drag = function () {
      // Mouse position
      m = d3.mouse(self.zoomG.node());
      // Update parameters depending on
      dragCorners(g.datum(), bb0, m);
      // Set the coordinates
      setCoordsData(g.datum());
    }

    var end = function () {
      // Undo formatting
      self.svg.style('cursor', 'default');
    }

    // return the drag container
    return d3.drag()
      .on('start', start)
      .on('drag', drag)
      .on('end', end);

  }


  function makeRectEdgeCorner() {
    // Adds edges and corners to rectangle for drag move and resize.

    // "Prototype" elements
    var proto = [
    // Rectangular edges
    g.append('rect')
      .attr('class', 'rectEdge cornerEdge ' + groupClass + debug)
      ,

    // Circular corners - NWSE cursor
    g.append('rect')
        .attr('height', dbWidth)
        .attr('width', dbWidth)
        .attr('id', 'topright')
        .attr('class', 'rectCorner cornerEdge nwse ' + groupClass + debug)
        ,

    // Circular corners - NESW cursor
    g.append('rect')
        .attr('height', dbWidth)
        .attr('width', dbWidth)
        .attr('id', 'topright')
        .attr('class', 'rectCorner cornerEdge nesw ' + groupClass + debug)
        ,
    ];

    // Behaviors to attach to corners and edges
    var move = moveRect();
    var resize = resizeRect();

    // Create Edges
    clone('.rectEdge.' + groupClass)
      .classed('rectEdge-left', true)
      .call(move.drag);
    clone('.rectEdge.' + groupClass)
      .classed('rectEdge-right', true)
      .call(move.drag);
    clone('.rectEdge.' + groupClass)
      .classed('rectEdge-top', true)
      .call(move.drag);
    clone('.rectEdge.' + groupClass)
      .classed('rectEdge-bottom', true)
      .call(move.drag);

    // Create Corners
    clone('.nwse.' + groupClass)
      .classed('rectCorner-topleft', true)
      .call(resize.makeContainer('topleft'));
    clone('.nesw.' + groupClass)
      .classed('rectCorner-topright', true)
      .call(resize.makeContainer('topright'));
    clone('.nesw.' + groupClass)
      .classed('rectCorner-botleft', true)
      .call(resize.makeContainer('botleft'));
    clone('.nwse.' + groupClass)
      .classed('rectCorner-botright', true)
      .call(resize.makeContainer('botright'));

    // Remove prototype elements from DOM
    proto.forEach(function (d, i) {
      d.remove();
    });

    // Format size and shape of added objects.
    setCoordsData(g.datum());
  }
