import * as Blockly from 'blockly/core';
import {javascriptGenerator, Order} from 'blockly/javascript';

const Repetir:any = {
  init: function() {
    this.appendValueInput('Cantidad')
    .setCheck('Number')
      .appendField('Cantidad');
    this.appendStatementInput('Accion')
      .appendField('Repetir');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Repetir una o varias acciones');
    this.setHelpUrl('');
    this.setColour(60);
  }
};
                    
                    
                    
javascriptGenerator.forBlock['repetir'] = function(block) {
  // Retrieve the number of repetitions
  const value_cantidad = javascriptGenerator.valueToCode(block, 'Cantidad', Order.ATOMIC) || '1';

  // Generate the code for nested actions within the loop
  const statement_accion = javascriptGenerator.statementToCode(block, 'Accion') || '';

  // Split concatenated statements and parse them into JSON objects
  const acciones = statement_accion
    .split('|')
    .filter(Boolean)
    .map(blockCode => JSON.parse(blockCode));

  // Return a JSON object for the loop structure
  return JSON.stringify({
    'block': 'LOOP',
    'args': [value_cantidad],
    'actions': acciones
  }) + '|';  // Append a delimiter for further splitting
};


export default Repetir;