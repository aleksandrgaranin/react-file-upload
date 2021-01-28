import React, { Fragment, useState } from 'react'
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentege, setUploadPercentege] = useState(0)

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
        },
        onUploadProgress: progressEvent => {
          setUploadPercentege(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
          //Clear percentage
          setTimeout(() => setUploadPercentege(0), 10000)
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
      {message ? <Message msg={message} /> : null}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={changeHandler} />
        </div>
        <Progress percentage={uploadPercentege}></Progress>
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
