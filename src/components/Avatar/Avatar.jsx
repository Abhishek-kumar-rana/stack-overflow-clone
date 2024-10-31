import React from 'react'

function Avatar({
    children,
    backgroundColor,
    px,
    py,
    borderRadius,fontSize,cursor
}) {
    const style ={
        backgroundColor,
        padding:`${py} ${px}`,
        borderRadius,
        fontSize,
        textalign:"centre",
        cursor:"cursor" || "null",
        textDecuration: "none"
    };
  return (
    <div style={style}>{children}</div>
  )
}

export default Avatar