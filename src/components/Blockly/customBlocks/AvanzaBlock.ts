import { javascriptGenerator, Order } from 'blockly/javascript';  // Import the JavaScript generator

// Define the custom 'Avanza' block
const Avanza: any = {
    init: function() {
      this.appendValueInput('Pasos')
        .setCheck('Number')
        .appendField("Avanzar");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip('Avanza una cantidad de pasos');
      this.setHelpUrl('');
    }
  };
  


// JavaScript generator for the 'Avanza' block
javascriptGenerator.forBlock['avanzar'] = function(block) {
  const value_pasos = javascriptGenerator.valueToCode(block, 'Pasos', Order.ATOMIC) || '1';  // Default to '1' if not specified

  return JSON.stringify({
    'block': 'FORWARD',
    'args': [value_pasos],
  }) + '|'; // Append delimiter
};

export default Avanza;
