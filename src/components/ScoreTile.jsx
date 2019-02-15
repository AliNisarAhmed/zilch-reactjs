import React from 'react'

export default function ScoreTile({ score }) {
  return (
    <>
     {
       score.map((pt, i) => (
         typeof pt === "number" ?
         <div key={i}>{pt}</div> :
         <div key={i}>ZILCH!</div>
       ))
     } 
    </>
  )
}
