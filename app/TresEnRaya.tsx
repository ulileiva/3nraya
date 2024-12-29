'use client'

import { useState } from 'react'
import { Button } from './button'
import { cx, cva } from 'class-variance-authority'

type SquareValue = 'X' | 'O' | null
type WinLine = {
  start: [number, number]
  end: [number, number]
  color: string
} | null

const TresEnRaya = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winLine, setWinLine] = useState<WinLine>(null)
  const [scores, setScores] = useState({ X: 0, O: 0 })

  const handleClick = (i: number) => {
    if (calculateWinner(squares)[0] || squares[i]) {
      return
    }
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)

    const [winner, winningSquares] = calculateWinner(newSquares)
    if (winner && winningSquares) {
      setWinLine(getWinLineCoordinates(winningSquares, winner))
      setScores(prevScores => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1
      }))
    }
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setWinLine(null)
    setXIsNext(true)
  }

  const [winner] = calculateWinner(squares)

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="mb-4 text-2xl font-bold h-10">
        {winner ? (
          <>Ganador: <span className={cx('text-4xl relative top-1', colorVariant({ isX: winner === 'X'}))}>{winner}</span></>
        ) : squares.every(square => square !== null) ? (
          <>Empate<span className="text-4xl"></span></>
        ) : (
          <>Turno: <span className={cx('text-4xl relative top-1 w-5 inline-block', colorVariant({ isX: xIsNext}))}>{xIsNext ? 'X' : 'O'}</span></>
        )}
      </div>
      <div className="mb-4 text-2xl font-semibold">
        <span className="text-blue-600 text-4xl relative top-1 font-patrick">X</span> : {scores.X}<span className="mr-4">&nbsp;</span>
        <span className="text-red-600 text-4xl relative top-1 font-patrick">O</span> : {scores.O}
      </div>
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] select-none">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" strokeLinecap="round" strokeLinejoin="round">
          <path d="M33,5 L33,95" className="stroke-black stroke-[2] opacity-80" />
          <path d="M67,5 L67,95" className="stroke-black stroke-[2] opacity-80" />
          <path d="M5,33 L95,33" className="stroke-black stroke-[2] opacity-80" />
          <path d="M5,67 L95,67" className="stroke-black stroke-[2] opacity-80" />
          
          {/* Winning line */}
          {winLine && (
            <line
              x1={winLine.start[0]}
              y1={winLine.start[1]}
              x2={winLine.end[0]}
              y2={winLine.end[1]}
              className={`stroke-[2]`}
              stroke={winLine.color}
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{ animation: 'drawLine 0.5s forwards' }}
            />
          )}
        </svg>
        
        {/* Game squares */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {squares.map((square, i) => (
            <button
              key={i}
              className="relative flex items-center justify-center text-6xl md:text-8xl font-bold focus:outline-none"
              onClick={() => handleClick(i)}
              disabled={Boolean(winner) || square !== null}
              aria-label={`Casilla ${i + 1}`}
            >
              {square && (
                <span className={colorVariant({ isX: square === 'X' })}>
                  {square}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <Button className="mt-8 px-6 py-2 text-lg font-semibold" onClick={resetGame}>
        Reiniciar
      </Button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}

const calculateWinner = (squares: SquareValue[]): [SquareValue, number[]] | [null, null] => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]]
    }
  }
  return [null, null]
}

const getWinLineCoordinates = (winningSquares: number[], winner: SquareValue): WinLine => {
  const positions = [
    [16.5, 16.5], [50, 16.5], [83.5, 16.5],
    [16.5, 50], [50, 50], [83.5, 50],
    [16.5, 83.5], [50, 83.5], [83.5, 83.5]
  ]
  
  return {
    start: positions[winningSquares[0]] as [number, number],
    end: positions[winningSquares[2]] as [number, number],
    color: winner === 'X' ? '#2563eb' : '#dc2626'
  }
}

const colorVariant = cva('font-patrick', {variants: {
  isX: {
    true: 'text-blue-600',
    false: 'text-red-600'
  }
}})

export default TresEnRaya

