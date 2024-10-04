function ColourPalette() {
  // A list of web colour strings
  this.colours = [
    "black", "silver", "gray", "white", "maroon", "red", "purple",
    "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow",
    "navy", "blue", "teal"
  ];

  // Make the start colour be black
  this.selectedColour = "black";

  var self = this;
  var colourPicker = select("#colourPicker");

  // Function to handle colour swatch click
  var colourClick = function() {
    // Remove the old border from the previously selected colour swatch
    var current = select("#" + self.selectedColour + "Swatch");
    if (current) {
      current.style("border", "0");
    }

    // Get the new colour from the id of the clicked element
    var c = this.id().split("Swatch")[0];

    // Set the selected colour and update fill and stroke
    self.selectedColour = c;
    fill(c);
    stroke(c);

    // Add a new border to the selected colour
    this.style("border", "2px solid blue");

    // Clear the color picker selection to avoid sticking on the last picked color
    colourPicker.value("");
  };

  // Load in the colours
  this.loadColours = function() {
    // Set the initial fill and stroke to black
    fill(this.colours[0]);
    stroke(this.colours[0]);

    // Create a new div in the HTML for each colour swatch
    for (var i = 0; i < this.colours.length; i++) {
      var colourID = this.colours[i] + "Swatch";

      // Create and configure the colour swatch
      var colourSwatch = createDiv();
      colourSwatch.class('colourSwatches');
      colourSwatch.id(colourID);

      // Add the swatch to the palette and set its background colour
      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style("background-color", this.colours[i]);

      // Attach click event to the swatch
      colourSwatch.mouseClicked(colourClick);
    }

    // Add a border to the initially selected colour (black)
    select("#blackSwatch").style("border", "2px solid blue");
  };

  // Handle changes in the color picker
  colourPicker.changed(function() {
    var pickedColour = this.value();

    // Remove the border from the previously selected colour swatch
    var current = select("#" + self.selectedColour + "Swatch");
    if (current) {
      current.style("border", "0");
    }

    // Update selected colour and apply it
    self.selectedColour = pickedColour;
    fill(pickedColour);
    stroke(pickedColour);

    // Add a border to the new colour swatch if it exists, otherwise, highlight the picker
    var newColourSwatch = select("#" + pickedColour + "Swatch");
    if (!newColourSwatch) {
      // No swatch exists for the custom colour, so use a temporary indicator
      colourPicker.style("border", "2px solid blue");
    } else {
      // If the colour matches a predefined swatch, highlight it
      newColourSwatch.style("border", "2px solid blue");
    }
  });

  // Call the loadColours function to initialize the palette
  this.loadColours();
}
