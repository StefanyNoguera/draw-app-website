function PatternTool() {
  // Path to the pattern tool icon and the tool's name
  this.icon = "assets/pattern.png";
  this.name = "Pattern";

  // Size of the shapes to be drawn
  var shapeSize = 50;
  // Current pattern to be drawn ('ellipse' or 'rectangle')
  var pattern = 'ellipse';

  /**
   * Populates the options UI for the pattern tool.
   * Provides a dropdown menu to select the drawing pattern.
   */
  this.populateOptions = function() {
    // Clear any existing options from the options container
    select(".options").html('');

    // Create a dropdown menu for pattern selection
    var patternSelect = createSelect();
    patternSelect.option('Ellipse');
    patternSelect.option('Rectangle');
    patternSelect.changed(function() {
      // Update the pattern based on the user's selection
      var selectedPattern = this.value();
      if (selectedPattern === 'Ellipse') {
        pattern = 'ellipse';
      } else if (selectedPattern === 'Rectangle') {
        pattern = 'rectangle';
      }
    });

    // Add the dropdown menu to the options container in the DOM
    select(".options").child(patternSelect);
  };

  /**
   * Draws the selected pattern on the canvas.
   * Draws an ellipse or rectangle at the mouse position when the mouse is pressed.
   */
  this.draw = function() {
    if (mouseIsPressed) {
      if (pattern === 'ellipse') {
        ellipse(mouseX, mouseY, shapeSize, shapeSize); // Draw ellipse
      } else if (pattern === 'rectangle') {
        rect(mouseX - shapeSize / 2, mouseY - shapeSize / 2, shapeSize, shapeSize); // Draw rectangle
      }
    }
  };

  /**
   * Unselects the tool and resets the pattern to default.
   */
  this.unselectTool = function() {
    pattern = 'ellipse'; // Reset to default pattern
  };
}
