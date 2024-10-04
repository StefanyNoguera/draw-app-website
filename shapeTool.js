function ShapeTool() {
  // Path to the shape tool icon and the tool's name
  this.icon = "assets/shape.png";
  this.name = "shape";

  // Variables to store the starting position of the shape
  var startX = -1;
  var startY = -1;
  var drawing = false;

  // Default shape type
  var shapeType = "rectangle";

  /**
   * Draws the selected shape on the canvas.
   * Updates the canvas based on mouse position.
   */
  this.draw = function() {
    if (mouseIsPressed) {
      if (startX == -1) {
        // Start drawing a new shape
        startX = mouseX;
        startY = mouseY;
        drawing = true;
        loadPixels(); // Save the current pixel array to restore it later
      } else {
        // Restore previous pixel array to hide any partial shapes
        updatePixels();
        var w = mouseX - startX;
        var h = mouseY - startY;

        var fillColor = colourP.selectedColour; // Get the selected color from the ColourPalette

        // Draw the selected shape
        if (shapeType == "rectangle") {
          fill(fillColor);
          noStroke(); // Remove stroke
          rect(startX, startY, w, h);
        } else if (shapeType == "ellipse") {
          fill(fillColor);
          noStroke(); // Remove stroke
          ellipse(startX, startY, w, h);
        } else if (shapeType == "triangle") {
          fill(fillColor);
          noStroke(); // Remove stroke
          triangle(startX, startY + h, startX + w / 2, startY, startX + w, startY + h);
        } else if (shapeType == "heart") {
          fill(fillColor);
          noStroke(); // Remove stroke
          // Draw heart shape
          beginShape();
          var x = startX + w / 2;
          var y = startY + h / 4;
          var size = min(w, h);
          vertex(x, y);
          bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
          bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
          endShape(CLOSE);
        }
      }
    } else if (drawing) {
      // Finalize drawing, save the latest pixel state, and reset
      updatePixels();
      var w = mouseX - startX;
      var h = mouseY - startY;

      var fillColor = colourP.selectedColour; // Get the selected color from the ColourPalette

      // Draw the final shape
      if (shapeType == "rectangle") {
        fill(fillColor);
        noStroke(); // Remove stroke
        rect(startX, startY, w, h);
      } else if (shapeType == "ellipse") {
        fill(fillColor);
        noStroke(); // Remove stroke
        ellipse(startX, startY, w, h);
      } else if (shapeType == "triangle") {
        fill(fillColor);
        noStroke(); // Remove stroke
        triangle(startX, startY + h, startX + w / 2, startY, startX + w, startY + h);
      } else if (shapeType == "heart") {
        fill(fillColor);
        noStroke(); // Remove stroke
        // Draw heart shape
        beginShape();
        var x = startX + w / 2;
        var y = startY + h / 4;
        var size = min(w, h);
        vertex(x, y);
        bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        endShape(CLOSE);
      }

      // Reset drawing state
      drawing = false;
      startX = -1;
      startY = -1;
    }
  };

  /**
   * Populates the options UI for the shape tool.
   * Provides a dropdown menu to select the shape type.
   */
  this.populateOptions = function() {
    select(".options").html(
      "<label for='shapeType'>Shape:</label>" +
      "<select id='shapeType'>" +
      "<option value='rectangle'>Rectangle</option>" +
      "<option value='ellipse'>Ellipse</option>" +
      "<option value='triangle'>Triangle</option>" +
      "<option value='heart'>Heart</option>" +
      "</select>"
    );

    // Update shapeType variable when the selection changes
    select("#shapeType").changed(function() {
      shapeType = this.value();
    });
  };

  /**
   * Unselects the tool and resets the shape type to default.
   */
  this.unselectTool = function() {
    shapeType = "rectangle"; // Reset to default shape
  };
}
