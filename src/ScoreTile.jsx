import React from 'react'

export default function ScoreTile({ score }) {
  return (
    <>
     {
       score.map((pt, i) => (
         typeof pt === "number" ?
         <div key={i}>Turn {i + 1}: {pt}</div> :
         <div key={i}>ZILCH!</div>
       ))
     } 
    </>
  )
}
