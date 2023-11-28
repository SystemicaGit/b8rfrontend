import React, { Component, useState, useCallback, useMemo, useEffect } from "react";

import { Link } from "react-router-dom";
import UploadPhotoscss from "./UploadPhotos.css";
import axios from "axios";
import vector from "../Assets/Images/FieldAgent/vector.png";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import uploadImg from "../Assets/Images/FieldAgent/uploadImg.png";
import ExtraCommonButton from "../ExtraCommonButton";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { useDropzone } from "react-dropzone";
import Footer from "../Footer";

function UploadPhotos() {

  //Token
  const token = localStorage.getItem("token");
  // console.log(token);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.2/umd/react-dom.production.min.js";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.2/prop-types.min.js";
    script.src = "https://unpkg.com/react-dropzone-uploader@VERSION/dist/react-dropzone-uploader.umd.js";
    script.src = "https://unpkg.com/react-dropzone-uploader@VERSION/dist/styles.css";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  let axiosConfig = {
    headers: {
      // "Content-Type": "application/json;charset=UTF-8",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
      // "Connection": "keep-alive"
    },
  };

  const [selectedImages, setSelectedImages] = useState([]);
  // Add this
  const [uploadStatus, setUploadStatus] = useState("");

  // const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     setSelectedImages((prevState) => [...prevState, file]);
  //   });
  // }, []);

  const getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post'
    return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }
    
  // const onDrop = useCallback((acceptedFiles) => {
  //   setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  // }, []);

  // const {
  //   getRootProps,
  //   getInputProps,
  //   isDragActive,
  //   isDragAccept,
  //   isDragReject,
  // } = useDropzone({ onDrop });

  // Submit
  const onUpload = async () => {
    setUploadStatus("Uploading....");
    console.log(uploadStatus);
    console.log(selectedImages);
    const formData = new FormData();

    selectedImages.forEach((image) => {
      console.log("Image:", image); // Log image data
      formData.append("images", image);
      formData.append("propertyId", "64ccb0f8373022e054041c07");
    });

    console.log("FormData:", formData); // Log formData after appending

    axios
      .post(
        "https://b8rliving.com/property/upload",
        formData,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);

        setUploadStatus("upload successful");
        alert("Images upload successful");

        // console.log(uploadStatus);
      })
      .catch((error) => {
        console.log(error);
        setUploadStatus("Upload failed..");
      });

  };

  // Add this
  // const styles = useMemo(
  //   () => ({
  //     ...(isDragAccept ? { borderColor: "#00e676" } : {}),
  //     ...(isDragReject ? { borderColor: "#ff1744" } : {}),
  //   }),
  //   [isDragAccept, isDragReject]
  // );



  return (
    <>
    
      <div className="login-page">
        <div className="button-container form">
          
          {/* <h2 style={{color:" #52796F"}}>Upload Photos</h2> */}
          <CommonHeader title="Upload Photos" color="#52796F" />


          <div
            style={{
              borderRadius: "5px",
              border: "1px solid #DAF0EE",
              width: "344px",
              height: "711px",
              background:
                "linear-gradient(180deg, #DAF0EE 0%, rgba(245, 245, 245, 0) 100%)",
              borderRadius: "30px",
            }}
          >
            <h4
              style={{
                color: "#52796F",
                textAlign: "left",
                marginLeft: "10px",
              }}
            >
              Upload from Gallery*
            </h4>

            <div
              style={{
                height: "292px",
                width: "301px",
                border: "1px dashed #000000",
                borderRadius: "30px",
                background: "rgba(217, 217, 217, 0.47)",
                marginLeft: "22px",
                marginTop: "50px",
              }}
            >
             

              {/* <div style={{height:"292px",width:"301px",border:"1px dashed #000000",borderRadius:"30px",background:"rgba(217, 217, 217, 0.47)", marginLeft:"22px",marginTop:"50px"}}> */}
              <img
                src={uploadImg}
                alt="Icon description"
                style={{
                  width: "40px",
                  height: "40px",
                  marginTop: "50px",
                  marginLeft: "10px",
                }}
              />
              <br />
              <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag or Browse Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
              {/* <label>Drop files here</label><br/> */}
              {/* <Dropzone
      // getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    /> */}

              {/* <div className={styles.container}>
                <div className={styles.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop file(s) here ...</p>
                  ) : (
                    <p>Drag and drop file(s) here, or click to select files</p>
                  )}
                   </div>
              </div> */}

                  {/* <div className={styles.images}>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div> */}
                  {/* Add this */}
               

              <div>
                {/* {selectedImages.length > 0 && (
                  <div>
                    <button onClick={onUpload}>Upload The Images</button>
                    <p>{uploadStatus}</p>
                  </div>
                )} */}
              </div>

              {/* <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag and drop a photo here, or click to select a file</p>
          </div>
        )}
      </Dropzone> */}
              <div>
                {/* <h2>Uploaded Photos:</h2> */}
                <ul>
                  {/* {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))} */}
                </ul>
              </div>
            </div>

            <label>or</label>
            <br />
            <label>Click below</label>
            {/* <Stack direction="row" alignItems="center">
            {selectedImages.length > 0 && (
              <>
              <p onClick={onUpload}>
                <CommonBtn title="Upload Photos" margin="40px" />
              </p>
              <p>{uploadStatus}</p>
              </>
              )} 

              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Stack> */}
          </div>
          <h5 style={{ marginLeft: "19px", marginBottom: "60px" }}>
            Note: Only JPG, JPEG, and PNG. The larger image will be cropped.
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CommonBtn title="Save & Upload" />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default UploadPhotos;
