function FreehandTool() {
  // Path to the freehand tool icon and the tool's name
  this.icon = "assets/freehand.jpg";
  this.name = "freehand";

  // Variables to store the previous mouse positions for smooth drawing
  // Initialized to -1 to indicate no drawing has started yet
  var previousMouseX = -1;
  var previousMouseY = -1;

  // Variable to determine if dynamic stroke weight is enabled
  var dynamicStroke = false;

  /**
   * Draws the freehand stroke on the canvas.
   * Continuously called while the mouse is pressed.
   */
  this.draw = function() {
    if (mouseIsPressed) {
      // If previous mouse positions are -1, set them to the current mouse positions
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      } else {
        // Use dynamic stroke weight if enabled
        if (dynamicStroke) {
          let speed = dist(mouseX, mouseY, previousMouseX, previousMouseY);
          strokeWeight(map(speed, 0, 50, 1, 10)); // Map speed to stroke weight
        }

        // Draw a line from the previous mouse position to the current mouse position
        line(previousMouseX, previousMouseY, mouseX, mouseY);

        // Update previous mouse positions
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    } else {
      // Reset previous mouse positions when the mouse is released
      previousMouseX = -1;
      previousMouseY = -1;
    }
  };

  /**
   * Populates the options UI for the freehand tool.
   * Provides a checkbox to enable or disable dynamic stroke weight.
   */
  this.populateOptions = function() {
    // Create and append the checkbox for dynamic stroke weight
    select(".options").html(
      "<label>Dynamic Stroke Weight</label>" +
      "<input type='checkbox' id='dynamicStrokeCheckbox'>"
    );

    // Set the checkbox state based on the dynamicStroke variable
    select("#dynamicStrokeCheckbox").elt.checked = dynamicStroke;

    // Add event listener to update the dynamicStroke variable when the checkbox is changed
    select("#dynamicStrokeCheckbox").changed(function() {
      dynamicStroke = this.checked();
    });
  };
}
