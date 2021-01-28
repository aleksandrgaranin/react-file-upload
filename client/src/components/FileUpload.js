import React, { Fragment, useState } from 'react'
import axios from 'axios';
import Message from './Message';

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('')

  const changeHandler = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage('file Uploaded')
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(error.response.data.msg);
      }
    }
  }


  return (
    <Fragment>
      {message ? <Message msg={message}/> : null}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={changeHandler} />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
      {
        uploadedFile ? (<div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt=""></img>
          </div>
        </div>) : null
      }
    </Fragment>
  )
}

export default FileUpload;
