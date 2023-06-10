"use client";
import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFile } from "@fortawesome/free-solid-svg-icons";

interface FileUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const [isDragged, setIsDragged] = useState(false);

  const backgroundGradient = {
    backgroundImage:
      "linear-gradient(to right, #00ed66, #0576e5)",
  };

  const fileInput = useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    setFile!(files[0]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile!(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragged(true);
    event.preventDefault();
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragged(false);
    event.preventDefault();
  };

  const SelectedFile: React.FC = () => {
    return (
      <>
        <FontAwesomeIcon icon={faFile} className="text-[150px] text-gray-500" />
        <p className="w-[275px] text-center truncate">{file?.name}</p>
      </>
    );
  };

  const UploadFile: React.FC = () => {
    return (
      <>
        <div className="drag-drop flex items-center flex-col gap-2">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={`text-5xl duration-300 ${
              isDragged ? "text-green-500" : "text-gray-500"
            }`}
          />
          <p
            className={`text-gray-500 duration-300 ${
              isDragged ? "text-green-500" : "text-gray-500"
            }`}
          >
            Drag and drop files here
          </p>
        </div>
        <div className="border-t border-b w-20 text-center">or</div>
        <div>
          <button
            className="py-2 px-5 rounded text-white"
            style={{
              backgroundColor: "var(--primary)",
              ...backgroundGradient,
            }}
          >
            Browse files
          </button>
        </div>
        <p className="text-gray-500 mt-4">maximum file size is 20MB</p>
      </>
    );
  };

  return (
    <div
      className={`cursor-pointer drag-drop flex items-center justify-center duration-300 flex-col gap-4 border-dashed ${
        isDragged ? "border-green-500" : "border-slate-400"
      } border-slate-400 border-2 rounded-lg w-[100%] h-[325px] md:w-[280px]`}
      onClick={handleFileClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
    >
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />

      {file ? <SelectedFile /> : <UploadFile />}
    </div>
  );
};

export default FileUpload;
