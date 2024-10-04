function EraserTool() {
  // Path to the eraser icon and name of the tool
  this.icon = "assets/eraser.png";
  this.name = "Eraser";

  // Initial size of the eraser
  var eraserSize = 20;

  // Previous mouse positions for drawing
  var prevX = null;
  var prevY = null;

  /**
   * Draws the eraser effect on the canvas.
   * Called continuously while the mouse is pressed.
   */

  this.draw = function() {
    if (mouseIsPressed) {
      // Check if the mouse is within the canvas boundaries
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (prevX !== null && prevY !== null) {
          // Calculate the distance between the current and previous mouse positions
          var steps = dist(mouseX, mouseY, prevX, prevY);
          for (var i = 0; i <= steps; i++) {
            var x = lerp(prevX, mouseX, i / steps); // Interpolated x-coordinate
            var y = lerp(prevY, mouseY, i / steps); // Interpolated y-coordinate
            this.erase(x, y); // Erase at the interpolated coordinates
          }
        } else {
          // Erase at the current position if there's no previous position
          this.erase(mouseX, mouseY);
        }
        // Update previous mouse positions
        prevX = mouseX;
        prevY = mouseY;
      }
    } else {
      // Reset previous positions when the mouse is not pressed
      prevX = null;
      prevY = null;
    }
  };

  /**
   * Erases a section of the canvas at the specified coordinates.
   */
  this.erase = function(x, y) {
    var halfSize = Math.floor(eraserSize / 2);
    for (var i = x - halfSize; i < x + halfSize; i++) {
      for (var j = y - halfSize; j < y + halfSize; j++) {
        // Ensure coordinates are within canvas boundaries
        if (i >= 0 && i < width && j >= 0 && j < height) {
          set(i, j, color(255, 255, 255, 0)); // Set the pixel to transparent
        }
      }
    }
    updatePixels(); // Apply the changes to the canvas
  };

  /**
   * Populates the options UI for the eraser tool.
   * Allows users to adjust the size of the eraser.
   */

  this.populateOptions = function() {
    // Ensure that the DOM is fully loaded before accessing elements
    if (!select(".options")) return;

    // Clear previous options
    select(".options").html("");

    // Create and append the label and slider for eraser size
    var label = createElement('label', 'Eraser Size:');
    label.parent(select(".options"));

    var slider = createSlider(5, 50, eraserSize, 1);
    slider.parent(select(".options"));

    // Update eraser size when slider value changes
    slider.input(function() {
      eraserSize = this.value();
    });
  };
}
