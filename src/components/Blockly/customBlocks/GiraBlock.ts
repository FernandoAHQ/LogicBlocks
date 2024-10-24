import {javascriptGenerator, Order} from 'blockly/javascript';



const Gira:any = {
    init: function() {
      this.appendValueInput('Giros')
        .setCheck('Number')  // Expecting a number for steps
        .appendField("Girar");  // Add a label to the block
      this.setPreviousStatement(true, null);  // Block can follow other blocks
      this.setNextStatement(true, null);  // Block can have subsequent blocks
      this.setColour(210);  // Set the block color
      this.setTooltip('Gira una cantidad de veces.');  // Tooltip description
      this.setHelpUrl('');  // Optional help URL
    }
  };
 
                      

  javascriptGenerator.forBlock['girar'] = function(block) {
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_giros = javascriptGenerator.valueToCode(block, 'Giros', Order.ATOMIC) || 0;
  
    // TODO: Assemble javascript into the code variable.
    return JSON.stringify({
      'block': 'ROTATE',
      'args': [value_giros],
    })+'|';
  }
            
  export default Gira;