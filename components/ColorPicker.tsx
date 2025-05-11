"use client";

import { ChromePicker, RGBColor } from "react-color";
import { useState } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

  
  const sendColor = async (rgb: RGBColor) => {
    try {
      await fetch(`http://192.168.1.7/setColor?r=${rgb.r}&g=${rgb.g}&b=${rgb.b}`);
    } catch (err) {
      console.error("Failed to send color:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ChromePicker
        color={color}
        onChangeComplete={(color) => {
          setColor(color.rgb);
          sendColor(color.rgb);
        }}
      />
      <div className="text-center">Selected: {color.r}, {color.g}, {color.b}</div>
    </div>
  );
}
