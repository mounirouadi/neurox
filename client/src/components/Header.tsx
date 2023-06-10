"use client";
import { FC, useState, useRef, useEffect } from "react";
import { contentPadding } from "@/styles";
import { headerItems } from "@/constants";
import logo from "../../public/logo512.png";
import Image from "next/image";

const Header: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const burgers = [1, 2, 3];

  const wrapperRef: any = useRef(null);
  const textGardient = {
    backgroundImage: 'linear-gradient(to bottom, #00ed66, #0576e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
}
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`bg-gray-1 top-0 h-14 w-full flex items-center justify-between fixed z-10 ${contentPadding}`}
    >
      <a href="#" className="flex items-center justify-center gap-2">
        <Image src={logo} className="w-[36px]" alt="sifedine | pengi dev" />
        <h2 className="hidden text-[27px] mb-1 text-center font-semibold ml-2 lg:block" style={textGardient}>neurox</h2>
      </a>
      <div ref={wrapperRef}>
        <ul
          className={`md:w-max w-full md:bg-transparent bg-gray-1 flex md:flex-row flex-col md:relative md:top-0 md:gap-8 gap-4 fixed duration-200 ${
            isOpened ? "bottom-[-0.5px]" : "-bottom-64"
          } left-0 md:rounded-none rounded-tl-lg rounded-tr-lg items-center py-3`}
        >
          {headerItems.map((item, index) => (
            <li key={index} onClick={() => setIsOpened(false)}>
              <a
                href={item.link}
                className="capitalize hover:text-primary duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="md:hidden block cursor-pointer"
          id="mobile-burger"
          onClick={() => setIsOpened(!isOpened)}
        >
          {burgers.map((burger, index: number) => (
            <span
              key={index}
              className={`w-[28px] h-[3px] bg-text-color block rounded-lg my-[4px] duration-300 ${
                isOpened ? "bg-primary" : ""
              }`}
            ></span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
