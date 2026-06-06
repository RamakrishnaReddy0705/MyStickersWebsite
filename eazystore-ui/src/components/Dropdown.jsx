import React from 'react'

export default function Dropdown({label,options,selectedValue,handleSort}) {
  return (
    <div className="d-flex align-items-center gap-2 justify-content-end pe-5 flex-grow-1">
        <label className="fs-5 fw-semibold text-primary">{label}</label>
        <select style={{
    transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out"
  }} value={selectedValue} className="px-3 py-2 fs-6 border rounded border-primary focus-ring focus-ring-dark text-dark" onChange={(event)=>{handleSort(event.target.value)}}>
            {options.map((optionVal,index)=>(
                <option key={index} value={optionVal}>{optionVal}</option>
            ))}
            
        </select>
    </div>
  )
}
