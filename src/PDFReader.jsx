import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Card, CardContent, Container, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import React from "react";
// import file from './drylab.pdf'
import { AuthHeaders, authHeaders, baseUrl } from "./contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PDFReader() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [file, setFile] = React.useState('');
  const [values, setValues] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const navigate = useNavigate();


  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const handleUploadFile = (e) => {
    if (e.target.files.length) {
      const form_data = new FormData();
      form_data.append("file", e.target.files[0]);
      form_data.append("folder", "Pdf");
      axios
        .post(`${baseUrl}/account/uploadfile/`, form_data, AuthHeaders)
        .then((res) => {
          setFile(res.data)
        })
        .catch(() => {
        });
    }
  };
  const handleSubmit = () => {
    const data = {
      name: values.name,
      convertfile: file.path
    };
    setProcessing(true);
    axios.post(`${baseUrl}/pdfeditor/pdf-file/`, data, authHeaders).then((res) => {
      Swal.fire({ icon: "success", html: "Successfully submitted" }).then(() => {
        navigate(`/table`)
      });
      console.log("res", res)
      setProcessing(false);
    }).catch((e) => {
      setProcessing(false);
      if (e.response && e.response.status === 400) {
        Swal.fire({ icon: "error", html: e.response.data.error });
      }
    })
  };
  return (
    <Container>
      <Card>
        <CardContent>
          <Button
            margin="normal"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput onChange={(e) => handleUploadFile(e)} type="file" accept="application/pdf" />
          </Button>
        </CardContent>
        {file &&
          <div>


            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div style={{ height: "80vh" }}>

                <Viewer
                  fileUrl={file.full_url}
                  plugins={[defaultLayoutPluginInstance]} />
              </div>
            </Worker>
            <br />
            <CardContent>
              <div style={{ justifyContent: "space-between", display: "flex", width: "100%" }}>
                <div>
                  <TextField margin="normal" fullWidth size="small" label="File name" onChange={handleChange("name")}
                    values={values.name}
                  />
                </div>
                <div>
                  <Button
                    margin="normal"
                    onClick={() => handleSubmit()}
                    variant="contained"
                    size="small"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        }
      </Card>
    </Container>
  );
}
