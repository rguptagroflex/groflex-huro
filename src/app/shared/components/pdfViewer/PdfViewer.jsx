// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";

// const PdfViewer = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//         ))}
//       </Document>
//     </div>
//   );
// };

// export default PdfViewer;

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import React from "react";

const PdfViewer = ({
  pdfUrl = "",
  loadingText = "Loading...",
  noDataText = "No file found",
}) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-viewer-main">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="pdf-viewer-loading-text">{loadingText}</div>}
        noData={<div className="pdf-viewer-no-data-text">{noDataText}</div>}
      >
        <Page
          pageNumber={pageNumber}
          loading={<div className="pdf-viewer-loading-text">{loadingText}</div>}
        />
      </Document>
    </div>
  );
};

export default PdfViewer;
