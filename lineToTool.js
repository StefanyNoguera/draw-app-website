function LineToTool() {
  // Path to the line tool icon and the tool's name
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";

  // Variables to store the start position of the line
  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  // New property to store the current line style
  this.lineStyle = 'solid'; // Options: 'solid', 'dashed', 'dotted'

  /**
   * Draws the line to the screen.
   * Updates the canvas based on the mouse position.
   */
  this.draw = function() {
    if (mouseIsPressed) {
      // Start drawing a new line if no start position is set
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        loadPixels(); // Save the current pixel array to restore it later
      } else {
        // Restore previous pixel array to hide any partial lines
        updatePixels();
        this.applyLineStyle(); // Apply the selected line style
        line(startMouseX, startMouseY, mouseX, mouseY); // Draw the line
      }
    } else if (drawing) {
      // Finalize drawing, save the latest pixel state, and reset
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };

  /**
   * Applies the current line style to the drawing context.
   */
  this.applyLineStyle = function() {
    if (this.lineStyle === 'dashed') {
      drawingContext.setLineDash([5, 17]); // 5 pixels drawn, 17 pixels skipped
    } else if (this.lineStyle === 'dotted') {
      drawingContext.setLineDash([0.5, 6]); // 0.5 pixels drawn, 6 pixels skipped
    } else {
      drawingContext.setLineDash([]); // Solid line (no dash)
    }
  };

  /**
   * Populates the options UI for the line tool.
   * Provides a dropdown to select the line style.
   */
  this.populateOptions = function() {
    select(".options").html(
      `<label for="lineStyle">Line Style:</label>
      <select id="lineStyle">
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
        <option value="dotted">Dotted</option>
      </select>`
    );

    // Set event listener to update line style when the dropdown value changes
    select("#lineStyle").changed(() => {
      this.lineStyle = select("#lineStyle").value();
    });
  };

  /**
   * Unselects the tool and resets the canvas.
   * Clears the options and restores the default line style.
   */
  this.unselectTool = function() {
    updatePixels();
    // Reset line style to solid by clearing the line dash array
    drawingContext.setLineDash([]);
    this.lineStyle = 'solid';
    // Clear the options UI
    select(".options").html("");
  };
}
