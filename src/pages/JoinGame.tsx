import React from 'react'
import styles from './joinGame.module.css'

function JoinGame() {
    return (
        <div className={styles.background}>
            <h1>LogicBlocks</h1>
            <div className="card">

            <input type="text" className="styled-input" placeholder="Tu nombre aquí"/>

            <input type="text" className="styled-input" placeholder="Código de la partida"/>

                <button className='btn-primary' onClick={() => {}}>
                    Join
                </button>
            </div>
        </div>
    )
}

export default JoinGame