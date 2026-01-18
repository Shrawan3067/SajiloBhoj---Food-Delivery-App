import React from 'react';
import nepalFlag from '../assets/nepal-flag.png'; // Add the Nepal flag image in your assets

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full text-gray-700" style={{ backgroundColor: "rgb(240, 240, 245)" }}>
      <div className="container mx-auto px-4 py-6 text-center flex justify-center items-center gap-2">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} BiteXpress | Made with <span className="text-red-500">❤️</span> in Nepal <img src={nepalFlag} alt="Nepal Flag" className="h-4 w-auto" />
        </p>
      </div>
    </footer>
  );
}
