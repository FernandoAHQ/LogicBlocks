import React, { useReducer, useRef, useState } from 'react'
import Canvas from '../components/Canvas'
import BlocksComponent from '../components/Blockly/Blocks'
import { generateCommands, sequenceGenerator } from '../utils/blocklyCommands';
import styles from './singlePlayer.module.css'

function SinglePlayer() {

  const canvasRef = useRef<any>(null); // Create a ref for the Canvas


  const handleSequence=(sequence:any)=>{
    // To move forward 2 steps:
    //dispatch({ type: 2 }); // Moves the state by +2

    console.log('HANDLE Sequence');
    
    const generatedSequence = generateCommands(sequenceGenerator(sequence));
    console.log("PARSED");
    console.log(generatedSequence);
    
    if (canvasRef.current) {
      canvasRef.current.moveSequence(generatedSequence); // Call the child's function
    }
  }



  return (
    <div className={styles.container}>
       
        <Canvas height={600} width={800} ref={canvasRef}/>
        <div className={styles.blocksWrapper}>
          <BlocksComponent handleSequence={handleSequence}/>
        </div>
    </div>
  )
}

export default SinglePlayer