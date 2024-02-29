import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Card, CardContent, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import React from "react";
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
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Container>
      <Card>
        <CardContent>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" accept="application/pdf" />
          </Button>
        </CardContent>
        {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
        </Worker> */}
      </Card>
    </Container>
  );
}
