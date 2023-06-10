"use client";
import { compressionOptions, libraryOptions } from "@/constants";
import { FC } from "react";
import Select from "react-select";

interface OptionsProps {
  // Add your prop types here
}

const Options: FC<OptionsProps> = () => {
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      cursor: "pointer",
      borderRadius: "5px",
      margin: "5px 8px",
      maxWidth: "calc(100% - 16px)",
    }),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <div className="mc-select flex-1">
          <label
            htmlFor="mc"
            className="uppercase ml-1 font-semibold text-gray-500"
          >
            library
          </label>
          <Select
            styles={customStyles}
            className="library w-full mt-1"
            id="mc"
            isClearable={true}
            isSearchable={true}
            name="mc"
            options={libraryOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Options;
