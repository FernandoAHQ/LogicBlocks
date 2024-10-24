import * as Blockly from 'blockly/core';
import {javascriptGenerator, Order} from 'blockly/javascript';

const Objeto:any = {
  init: function() {
    this.appendDummyInput('Objeto')
      .appendField(new Blockly.FieldDropdown([
          ['Moneda', 'COIN'],
          ['Obstaculo', 'ROCK'],
          ['Trampa', 'TRAP']
        ]), 'Object');
    this.setOutput(true, 'Objeto'); // Restrict output to a specific type, e.g., 'ObjectType'
    this.setTooltip('Escoge qué detectar.');
    this.setHelpUrl('');
    this.setColour(240);
  }
};
                      

  javascriptGenerator.forBlock['objeto'] = function(block) {
    const dropdown_object = block.getFieldValue('Object');
  
    // TODO: Assemble javascript into the code variable.
    const code = dropdown_object;
    // TODO: Change Order.NONE to the correct operator precedence strength
    return [code, Order.NONE];
  }

  export default Objeto;