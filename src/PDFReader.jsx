import { Card, Container } from "@mui/material";
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import file from "./drylab.pdf";
import PDFViewer from "pdf-viewer-reactjs";
export default function PDFReader() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Container>
      <Card>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </Card>
    </Container>
  );
}
