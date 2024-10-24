import {javascriptGenerator, Order} from 'blockly/javascript';

const Detectar:any = {
    init: function() {
      this.appendValueInput('Detectar')
        .setCheck('Objeto') // This will restrict it to only accept the 'Objeto' block.
        .appendField('Si se detecta');
      this.appendStatementInput('Detectado')
        .appendField('Entonces');
      this.appendStatementInput('No Detectado')
        .appendField('Si no');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Detectar');
      this.setHelpUrl('');
      this.setColour(225);
    }
  };
                      
  
  javascriptGenerator.forBlock['detectar'] = function(block) {
    // Retrieve the condition (value to detect)
    const value_detectar = javascriptGenerator.valueToCode(block, 'Detectar', Order.ATOMIC) || '';

    // Generate the code for nested statements (blocks inside "Detectado" and "No Detectado")
    const statement_detectado = javascriptGenerator.statementToCode(block, 'Detectado') || '';
    const statement_no_detectado = javascriptGenerator.statementToCode(block, 'No Detectado') || '';

    // Split the concatenated blocks (if there are multiple) and parse them into JSON objects
    const detectadoActions = statement_detectado
      .split('|')
      .filter(Boolean)
      .map(blockCode => JSON.parse(blockCode));
    
    const noDetectadoActions = statement_no_detectado
      .split('|')
      .filter(Boolean)
      .map(blockCode => JSON.parse(blockCode));

    // Return a JSON string representing the structure of the "Detectar" block
    return JSON.stringify({
      'block': 'DETECT',
      'args': [value_detectar],
      'actions': [detectadoActions, noDetectadoActions]
    }) + '|';  // Append a delimiter for further splitting
};

export default Detectar;