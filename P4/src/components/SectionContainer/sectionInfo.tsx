"use client";

import React from "react";
import "./sectionInfo.css";

type Params = {
  children: React.ReactNode;
}

export const SectionContainer = ({ children }: Params) => {
  return (
    <div className="sectionContainer">
      {children}
    </div>
  );
};