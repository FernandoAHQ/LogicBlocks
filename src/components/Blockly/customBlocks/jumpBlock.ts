import { javascriptGenerator, Order } from 'blockly/javascript';  // Import the JavaScript generator

// Define the custom 'Avanza' block
const Saltar: any = {
    init: function() {
      this.appendDummyInput('Saltar')
      .appendField("Saltar");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Avanza una cantidad de pasos');
      this.setHelpUrl('');
    }
  };
  


javascriptGenerator.forBlock['saltar'] = function(block) {
  //const value_pasos = javascriptGenerator.valueToCode(block, 'Pasos', Order.ATOMIC) || '1';  // Default to '1' if not specified

  return JSON.stringify({
    'block': 'JUMP',
    'args': [],
  }) + '|'; // Append delimiter
};

export default Saltar;
