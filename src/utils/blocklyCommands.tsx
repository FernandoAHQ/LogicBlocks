interface Block {
    block: string;
    args: (string | number)[];
    actions?: any[];  // Optional actions, can be an array of blocks or a tuple of two arrays
  }


  function processBlock(block: Block, result: any[]) {
    const { block: blockType, args, actions } = block;
    console.log(block);
    
  
    // Convert string arguments to numbers where necessary
    const numericArgs = args.map(arg => (typeof arg === 'string' ? parseInt(arg, 10) : arg));
  
    // Process the block based on its type (example: FORWARD, ROTATE, etc.)
    if (blockType === 'FORWARD') {
      for (let i = 0; i < numericArgs[0]; i++) 
        result.push({ command: 'moveForward', steps: 1 });
    } else if (blockType === 'ROTATE') {
      result.push({ command: 'rotate', times: numericArgs[0]|0 });
    } else if (blockType === 'BACKWARD') {
      result.push({ command: 'moveBackward', steps: numericArgs[0] });
    }else if (blockType === 'LOOP') {
      // Process loop block
      for (let i = 0; i < numericArgs[0]; i++) {
        if (Array.isArray(actions)) {
          actions.forEach(action => processBlock(action, result));
        }
      }
    } else if (blockType === 'DETECT') {
      // Process detect block
      if (Array.isArray(actions)) {
        const [thenActions, elseActions] = actions;
        if(args[0].toString().includes("COIN")){
          if (Array.isArray(thenActions)) {
            thenActions.forEach(action => processBlock(action, result));
          }
        }else{
          if (Array.isArray(elseActions)) {
            elseActions.forEach(action => processBlock(action, result));
          }
        }
        
        
      }
    }
  }

  export function generateCommands(blocks: Block[]) {
    const result: any[] = [];
    blocks.forEach(block => processBlock(block, result));
    return result;
  }
 
  

  export const sequenceGenerator = (code:string) => {
    // Split the generated code by the delimiter (|)
    const blocks = code.split('|').filter(Boolean); // Remove empty strings
    
    // Parse each block and store in an array
    const blockSequence = blocks.map(blockCode => {
        try {
            return JSON.parse(blockCode);
        } catch (error) {
            console.error('Error parsing block:', error);
            return null; // Handle invalid JSON gracefully
        }
    }).filter(Boolean); // Remove any nulls from the array

    return blockSequence;
};