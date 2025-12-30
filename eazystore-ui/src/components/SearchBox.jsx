import React from 'react'

export default function SearchBox({label,placeholder,value,handleSearch}) {
  
  return (
    <div className="d-fle align-items-center gap-3 ps-4 flex-fill font-primary">
        <label className="fs-5 fw-semibold text-primary">{label}</label>
        <input  style={{ transition: "all 0.15s ease-in-out" }} type='text' placeholder={placeholder} value={value} className="px-4 py-2 fs-6 border rounded border-primary focus-ring focus-ring-dark text-dark" onChange={(event)=>{handleSearch(event.target.value)}}></input>
    </div>
  )
}
