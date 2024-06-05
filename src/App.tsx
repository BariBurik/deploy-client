import React, { FC, useEffect, useState } from 'react';
import Form from './components/Form';
import Modal from './components/Modal';
import { linkToFile } from './http/linkAPI';
import { fileToHtml, loadFile } from './http/fileAPI';

const App: FC = () => {
  const [modalVisibale, setModalVisibale] = useState(false)
  const [linkToSheet, setLinkToSheet] = useState<URL | null>(null)
  const [linkToTemplate, setLinkToTemplate] = useState<URL | null>(null)
  const [finallyHtml, setFinallyHtml] = useState<null | string>(null)
  const [finallyFile, setFinallyFile] = useState<null | Blob>(null)
  const [sheetName, setSheetName] = useState<string | null>(null)
  const [temaplateName, setTemplateName] = useState<string | null>(null)

  const sheetUrlToFile = async () => {
    try {
        if (linkToSheet instanceof URL) {
          const {fileName} = await linkToFile(linkToSheet, '.xlsx')
          if (fileName) {
            setSheetName(fileName)
          }
        }
    } catch (e) {
        console.log(e)
    }
  };

  const templateUrlToFile = async () => {
    try {
        if (linkToTemplate instanceof URL) {
          const {fileName} = await linkToFile(linkToTemplate, '.docx')
          if (fileName) {
            setTemplateName(fileName)
          }
        }
    } catch (e) {
        console.log(e)
    }
  };

  useEffect(() => {
    const loadingFile = async () => {
      if (sheetName && temaplateName) {
        try {
          const response = await loadFile(sheetName, temaplateName);
          const buffer = response.fileBuffer.data;
  
          if (buffer) {
              console.log('Buffer length:', buffer.length);
              const uint8Array = new Uint8Array(buffer);
              const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
              console.log('Blob size:', blob.size);
              setFinallyFile(blob);
          } else {
              console.error('Received an empty buffer.');
          }
        } catch (error) {
          console.error('Error loading file:', error);
        }
      }
    }

    loadingFile()
  }, [sheetName, temaplateName])

  const openModal = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (finallyFile && temaplateName) {
      const finallyHtmlString = (await fileToHtml(temaplateName)).htmlFinally
      if (finallyHtmlString) {
        setFinallyHtml(finallyHtmlString)
        setModalVisibale(true)
      }
    }
    e.preventDefault()
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSheetName(null)
    setTemplateName(null)
    setLinkToSheet(null)
    setLinkToTemplate(null)
    setModalVisibale(false)
    e.preventDefault()
  }

  const downloadFile = () => {
    if (finallyFile instanceof Blob) {
      const url = window.URL.createObjectURL(finallyFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sample.docx'; // Измените имя файла на актуальное
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert('Подтвердите действие')
    }
  }
 
  return (
    <div className="App">
      <Form download={downloadFile} sheetUrlToFile={sheetUrlToFile} templateUrlToFile={templateUrlToFile} linkToSheet={linkToSheet} linkToTemplate={linkToTemplate} setLinkToSheet={setLinkToSheet} setLinkToTemplate={setLinkToTemplate} openModal={openModal}/>
      {modalVisibale && finallyHtml ? <Modal finallyHtml={finallyHtml} closeModal={closeModal}/> : null}
    </div>
  );

}

export default App;


