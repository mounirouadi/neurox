"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FileUpload from "./UploadFile";
import Compressed from "./Compressed";
import Options from "./Options";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLeftAndUpRightToCenter,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
const Main: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const Compress = () => {
    return (
      <div className='flex justify-center items-center flex-col py-5'>
        <div>
          <h1 className='text-3xl text-gray-700 font-semibold text-center mb-3'>Compress Your Model</h1>
          <p className='max-w-[550px] text-gray-800 text-center'>Upload your trained model file, select the options that suit you, and get the results right away!</p>
        </div>
        <Main />
      </div>
    )
  }
  
  const handleCompressFile = async () => {
    setLoading(true);
    try {
      if (loading)
        throw new Error(
          "please wait for the current compressing process to finish"
        );
      if (!file) throw new Error("Please upload a file first");

      const formData = new FormData();
      formData.append("model", file);

      const { data } = await axios.post(
        "http://34.125.121.29:3003/compress_model/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCompressed(data);
      console.log(data);
      toast.success("File compressed successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };
  
  const handleReset = () => {
    if (loading)
      return toast.error(
        "Please wait for the current compressing process to finish"
      );
    setCompressed(null);
    setFile(null);
  };

  return (

    <div
      className={`px-3 max-w-[845px] mx-auto mt-[120px] flex flex-col gap-10`}
    >
      <div className="files flex justify-center items-center flex-wrap gap-[50px] lg:gap-[100px] w-f">
        <FileUpload setFile={setFile} file={file} />
        <FontAwesomeIcon
          icon={faDownLeftAndUpRightToCenter}
          className="text-6xl text-gray-600 hidden lg:block"
        />
        <Compressed compressed={compressed} />
      </div>
      <div className="drop-shadow-lg bg-gray-100 px-4 py-7 rounded-md">
        
        <Options />
        <div className="flex mt-5 items-center gap-4">
          <button
            className={`flex items-center gap-3 px-5 py-2 rounded-md text-white bg-primary duration-300 ${
              loading || !file
                ? "cursor-not-allowed opacity-[0.6]"
                : "cursor-pointer active:scale-[.98] opacity-1 hover:opacity-90"
            }`}
            onClick={handleCompressFile}
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                <div>Compressing</div>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faDownLeftAndUpRightToCenter}
                  className=""
                />
                <p className="">Compress</p>
              </>
            )}
          </button>
          <button
            className={`flex items-center px-5 py-2 rounded-md bg-gray-400 ${
              loading
                ? "cursor-not-allowed"
                : "hover:opacity-90 active:scale-[.98]"
            }`}
            onClick={handleReset}
          >
            <p className="text-white">Reset</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
