import { FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";
import React from "react";

function Footer() {
  return (
    <footer className="px-6 py-10 bg-black text-center text-gray-400 text-sm">
      <p>© {new Date().getFullYear()} Manime. Built with ❤️ by Md Jubayer.</p>
      <div className="mt-3 flex justify-center gap-4 text-white">
        <a
          href="https://github.com/jubayershuvo"
          target="_blank"
          className="hover:text-red-500 flex items-center"
        >
          <FaGithub size={25} className="mr-1" />
        </a>
        <a
          href="https://facebook.com/jubayershuvo.fb"
          target="_blank"
          className="hover:text-blue-500 flex items-center"
        >
          <FaFacebook size={25} className="mr-1" />
        </a>
        <a
          href="https://twitter.com/jubayer_shuvo"
          target="_blank"
          className="hover:text-blue-400 flex items-center"
        >
          <FaTwitter size={25} className="mr-1" />
        </a>
        <p className="hover:text-red-500 text-xl">
          Privacy
        </p>
      </div>
    </footer>
  );
}

export default Footer;
