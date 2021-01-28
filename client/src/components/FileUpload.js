import React, { Fragment, useState } from 'react'

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('Choose file name');

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }


  return (
    <Fragment>
      <form>
        <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={onChangeHandler} />
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
      </form>
    </Fragment>
  )
}

export default FileUpload;
