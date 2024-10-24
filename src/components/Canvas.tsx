import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useReducer } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import directionReducer from '../reducers/canvas.reducer';

interface CanvasProps {
    width: number;
    height: number;
    ref: any;
  }

interface PositionType {
    x: number;
    y: number;
} 

const Canvas = forwardRef<unknown, CanvasProps>(({ width, height }, ref) => {

  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const cols = 12;
  const rows = 8;

  
  //1878x1252
  const canvasWidth = width//1878*.5;
  const canvasHeight = height//1252*.5;
  
  const cellWidth = canvasWidth / cols;
  const cellHeight = canvasHeight / rows;

  const characterX = 1;
  const characterY = 0;

  let cs = [    { "x": 1, "y": 1, "type": "coin" },
    { "x": 8, "y": 7, "type": "coin" }]

  
  const [rockImg] = useImage('https://static.vecteezy.com/system/resources/previews/026/547/570/non_2x/an-8-bit-retro-styled-pixel-art-illustration-of-a-dark-stone-rock-formation-free-png.png');
  const [coinImg] = useImage('/coin.png');
  const [trapImg] = useImage('/fire.png');
  const [image] = useImage('/ash.png');

  const [bgGridImage] = useImage('/stone-bg.png')
  const [position, setPosition] = useState({ x: cellWidth * characterX, y: cellHeight * characterY });
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameId = useRef<number | null>(null); // Allowing null as a valid type
  const [form, setForm] = useState('SSSSSSSDDDDDDD');

  const [direction, dispatch] = useReducer(directionReducer, 1);



  const [coins, setCoins] = useState(0)
  const [objects, setObjects] = useState([
    { "x": 3, "y": 5, "type": "trap" },
    { "x": 10, "y": 1, "type": "rock" },
    { "x": 6, "y": 7, "type": "coin" },
    { "x": 2, "y": 4, "type": "coin" },
    { "x": 9, "y": 0, "type": "rock" },
    { "x": 1, "y": 1, "type": "coin" },
    { "x": 8, "y": 7, "type": "coin" },
   { "x": 4, "y": 2, "type": "rock" }
  ]
  );




  useEffect(() => {
   


    
    function handleKeyDown(e: KeyboardEvent) {
      if (isAnimating) return;
     // handleMoveSequence([e.key.substr(5)])      

    }
    document.addEventListener('keydown', handleKeyDown);


    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }



  }, [isAnimating]);

  interface Move {
    command: string,
    steps?: number,
    times?: number
  }

  function  moveSmoothly (newPos:PositionType, nextMoves:Move[], callback:Function) {
//LOOK HERE IF SOMETHING BREAKS!!! WARD!! 
    cancelAnimationFrame(animationFrameId.current!);

    const step = 15;
    
    function animate() {        
      let dx = newPos.x - position.x;
      let dy = newPos.y - position.y;
      
      if (dx !== 0) 
        position.x += dx > 0 ? Math.min(step, dx) : Math.max(-step, dx);
      if (dy !== 0) {
        position.y += dy > 0 ? Math.min(step, dy) : Math.max(-step, dy);
      }

      setPosition({...position});

      if (dx !== 0 || dy !== 0) {
        if(!isAnimating) setIsAnimating(true);
        
        animationFrameId.current = requestAnimationFrame(animate);
      }else{         
        setIsAnimating(false);
        if(callback) callback();
        if (nextMoves.length > 0 && nextMoves) handleMoveSequence(nextMoves);
      }
    }
   
    // Start the animation
    animationFrameId.current = requestAnimationFrame(animate);
  }

  function handleMoveSequence(moveSequence: Move[]) {
    if (moveSequence.length === 0) return;
  
    const [currentMove, ...trimmedSequence] = moveSequence;
  
    let updatedDirection = direction; // Copy of the current direction
  
    // Handle rotation immediately by manually updating direction
    if (currentMove.command === 'rotate') {
      updatedDirection = (direction + currentMove.times! + 4) % 4 || 4; // Calculate new direction
      console.log(`rotating from ${direction} to ${updatedDirection}`);
      
      dispatch({ type: currentMove.times! }); // Dispatch to update the actual state asynchronously
    }
  
    // Now calculate the new position based on the updated direction
    const newPosition = calculatePosition(currentMove, updatedDirection);
  
    // Detect if any objects are present at the new position
    const [objectDetected, objectPosition] = detectObject(newPosition);
  
    // Handle different objects
    switch (objectDetected) {
      case 'rock':
        return; // Do nothing if it's a rock
  
      case 'trap':
        return moveSmoothly(newPosition, trimmedSequence, () => alert('TRAP'));
  
      case 'coin':
        return moveSmoothly(newPosition, trimmedSequence, () => {
          setObjects(prevObjects =>
            prevObjects.filter(object => !(object.x === objectPosition!.x && object.y === objectPosition!.y))
          );
          setCoins(prevCoins => prevCoins + 1);
        });
  
      default:
        moveSmoothly(newPosition, trimmedSequence, () => null);
    }
  }
  
  function calculatePosition(move: Move, currentDirection: number) {
    let newPos = { ...position };
    const { command, steps } = move;
  
    switch (command) {
      case 'moveForward':
        // Use the current direction to calculate the new position
        console.log(`MOVE FORWARD INTO ${currentDirection}`);
        
        switch (currentDirection) {
          case 4: // Moving up
            if (newPos.y > 0) newPos = { y: newPos.y - cellHeight, x: newPos.x };
            break;
          case 2: // Moving down
            for (let i = 0; i < steps!; i++) {
              if (newPos.y < canvasHeight - cellHeight) newPos = { y: newPos.y + cellHeight, x: newPos.x };
            }
            break;
          case 3: // Moving left
            if (newPos.x > 0) newPos = { y: newPos.y, x: newPos.x - cellWidth };
            break;
          case 1: // Moving right
            if (newPos.x < canvasWidth - cellWidth - 1) newPos = { y: newPos.y, x: newPos.x + cellWidth };
            break;
        }
        break;
  
      case 'Left': // Move left manually
        if (newPos.x > 0) newPos = { y: newPos.y, x: newPos.x - cellWidth };
        break;
  
      case 'Right': // Move right manually
        if (newPos.x < canvasWidth - cellWidth - 1) newPos = { y: newPos.y, x: newPos.x + cellWidth };
        break;
  
      // Add other movement cases as needed (like 'Up', 'Down')
    }
  
    return { x: Math.round(newPos.x), y: Math.round(newPos.y) };
  }
  

  function detectObject(newPosition: PositionType): [string | null, PositionType]{
    let objectDetected = null;
    const x = Math.round(newPosition.x / cellWidth);
    const y = Math.round(newPosition.y / cellHeight);

    objects.some(obj => {
      if (x == obj.x && y == obj.y) {
          objectDetected = obj.type;
          return true; // Breaks the loop
        
      }
      return false; // Continue looping
    });
  
    return [objectDetected, {x,y}];
  }

  function selectImage(type: string){
    switch (type) {
      case 'rock':
        return rockImg;
      case 'trap':
        return trapImg;
      case 'coin':
        return coinImg;
          }
  }

  function handleSubmit(e:any){
    e.preventDefault();
    console.log(form);
    const moves = form.split('');
    const sequence = moves.map((m)=>{
      switch (m) {
        case 'A':
          return 'Left';
        case 'D':
          return 'Right';
        case 'W':
          return 'Up';
        case 'S':
          return 'Down';
      
        default:
          return '';
      }
    })
    setForm('')
    //handleMoveSequence(sequence);
  }

  useImperativeHandle(ref, () => ({
    getPosition: () => position,
    moveSequence: (sequence: any) => handleMoveSequence(sequence),
  }));


  return (<>
    <h3>COINS: {coins}</h3>
    <h3>Direction: {direction}</h3>
    <Stage width={canvasWidth} height={canvasHeight} draggable>
      <Layer>
        <KonvaImage
        image={bgGridImage}
        width={canvasWidth} 
        height={canvasHeight}/>

      </Layer>

      <Layer>
        {objects.map(obj=>          
          <KonvaImage
            key={`${obj.x}-${obj.y}`}
            image={selectImage(obj.type)}
            x={obj.x*cellWidth}
            y={obj.y*cellHeight}
            width={cellWidth}
            height={cellHeight}
          />)}
      </Layer>
      <Layer>
        {image && (
          <KonvaImage
            image={image}
            x={position.x}
            y={position.y}
            width={cellWidth}
            height={cellHeight}
          />
        )}
      </Layer>
    </Stage>
    {/* <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
        <input
          type="text"
          id="textInput"
          value={form}
          onChange={(e) => setForm(e.target.value)} // Update state on input change
          required
        />
      </div>
      <button type="submit">Run</button>
    </form> */}
    </>
  );
});

export default Canvas;

