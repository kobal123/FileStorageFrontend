'use client'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import "../style.css"


export default function MyDropzone() {
  // const onDrop = useCallback(acceptedFiles => {
  //   //get current path.
  //   const path = "/some/path";
  //   acceptedFiles.array.forEach(file => {
  //     uploadFile(path, file)
  //   });

  // }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
     maxFiles:30,
    multiple:true
    })

  return (
    <div className='file-dropzone'  style={{backgroundColor:"red"}} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>
  )
}