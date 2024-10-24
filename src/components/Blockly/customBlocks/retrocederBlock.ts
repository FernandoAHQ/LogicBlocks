import * as Blockly from 'blockly/core';  // Import the Blockly core library
import { javascriptGenerator, Order} from 'blockly/javascript';  // Import the JavaScript generator

// Define the custom 'Retrocede' block
const Retrocede:any = {
  init: function() {
    this.appendValueInput('Pasos')
      .setCheck('Number')  // Expecting a number for steps
      .appendField("Retrocede");  // Add a label to the block
    this.setPreviousStatement(true, null);  // Block can follow other blocks
    this.setNextStatement(true, null);  // Block can have subsequent blocks
    this.setColour(300);  // Set the block color
    this.setTooltip('Retrocede una cantidad de pasos');  // Tooltip description
    this.setHelpUrl('');  // Optional help URL
  }
};


// Define the JavaScript code generator for the custom 'Retrocede' block
javascriptGenerator.forBlock['retroceder'] = function(block) {
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_pasos = javascriptGenerator.valueToCode(block, 'Pasos', Order.ATOMIC) || 1;
  
    return JSON.stringify({
        'block': 'BACKWARD',
        'args': [value_pasos],
      })+'|';
  }

export default Retrocede;
