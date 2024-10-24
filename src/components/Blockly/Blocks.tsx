import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';  // Correct import for the JavaScript generator
 import Avanza from './customBlocks/AvanzaBlock';  // Import your custom block
import Retrocede from './customBlocks/retrocederBlock.ts'; 
 import Girar from './customBlocks/GiraBlock.ts';
 import Detectar from './customBlocks/DetectBlock.ts';
 import Objeto from './customBlocks/ObjectDetectedBlock.ts';
 import Repetir from './customBlocks/repetirBlock.ts';
import { generateCommands } from '../../utils/blocklyCommands';
import Saltar from './customBlocks/jumpBlock.ts';

interface BlocksComponentProps {
  handleSequence: (sequence: any) => void; // Adjust the type based on what you expect
}

const BlocksComponent: React.FC<BlocksComponentProps> = ({ handleSequence }) => {
  const workspaceRef = useRef<any>(null);
  const blocklyDiv = useRef<any>(null);

  const registerBlocks = ()=>{
    Blockly.Blocks['avanzar'] = Avanza;  
    Blockly.Blocks['detectar'] = Detectar;  
    Blockly.Blocks['girar'] = Girar;  
    Blockly.Blocks['objeto'] = Objeto;  
    Blockly.Blocks['retroceder'] = Retrocede;  
    Blockly.Blocks['repetir'] = Repetir;  
    Blockly.Blocks['saltar'] = Saltar;  
    
    
  }

  useEffect(() => {

    registerBlocks();

    // Initialize Blockly workspace
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        "kind": "flyoutToolbox",
        "contents": [
          {"kind": "block", "type": "avanzar" },
          { "kind": "block", "type": "retroceder" },
          { "kind": "block", "type": "saltar" },
           { "kind": "block", "type": "girar" },
           { "kind": "block", "type": "detectar" },
           { "kind": "block", "type": "objeto" },
          { "kind": "block", "type": "repetir" },
          { "kind": "block", "type": "math_number" },

        ]
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      zoom: {
        controls: false,
        wheel: false,
      }
    });

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, []);



const handleRunCode = () => {



    const code = javascriptGenerator.workspaceToCode(workspaceRef.current); 
    console.log(code);
    
    handleSequence(code)// Generate code from the workspace
    //const sequence = sequenceGenerator(code);  // Convert code to an array of block objects
    //console.log(generateCommands(sequence));
  };

  return (
    <div>
     {// <h1>Blockly in React</h1>
     }
      <div
        ref={blocklyDiv}
        style={{ height: '520px', width: '100%', border: '1px solid #ccc' }}
      />
      <button onClick={handleRunCode}>Run Code</button>
    </div>
  );
};

export default BlocksComponent;
