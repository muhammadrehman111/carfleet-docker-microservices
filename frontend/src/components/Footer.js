import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-4">
      <div className="container">
        <small>© {new Date().getFullYear()} CarFleet. Built with React & Bootstrap.</small>
      </div>
    </footer>
  );
}
