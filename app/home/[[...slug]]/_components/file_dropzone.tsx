'use client'
import Box from 'next-auth/providers/box'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import "../style.css"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { uploadFile } from '@/service/filemetadata/fileservice-interface'


export default function MyDropzone() {
  const session = useSession();
  const onDrop = useCallback(acceptedFiles => {
    //get current path.
    const path = "/some/path";
    acceptedFiles.array.forEach(file => {
      uploadFile(path, file)
    });

  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
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