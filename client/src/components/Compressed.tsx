import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faFile } from "@fortawesome/free-solid-svg-icons";

interface Props {
  compressed: { name: string; file: string };
}

const Compressed: FC<Props> = ({ compressed }) => {
  const base64toBlob = (base64Data: string) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "" });
  };
  const handleDownload = () => {
    const base64Data = compressed.file;
    const blob = base64toBlob(base64Data);
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = compressed.name;
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(blobUrl);
  };
  return (
    <div
      className={`drag-drop flex items-center justify-center duration-300 flex-col gap-4 border-dashed border-slate-400 border-2 rounded-lg w-[100%] h-[325px] md:w-[280px]`}
    >
      {compressed ? (
        <>
          <FontAwesomeIcon
            icon={faFile}
            className="text-[150px] text-gray-500"
          />
          <p className="w-[275px] text-center truncate">{compressed.name}</p>
          <button
            className={`flex items-center gap-3 px-5 py-2 rounded-md text-white bg-primary duration-300`}
            onClick={handleDownload}
          >
            Download
          </button>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-[150px] text-gray-500"
          />
          <p className="w-[275px] text-center text-gray-500 truncate">
            No file selected
          </p>
        </>
      )}
    </div>
  );
};

export default Compressed;
