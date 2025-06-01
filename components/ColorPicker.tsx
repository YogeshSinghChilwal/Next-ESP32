"use client";

import { ChromePicker, RGBColor } from "react-color";
import { useState } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

  // const sendColor = async (rgb: RGBColor) => {
  //   try {
  //     await fetch(`http://192.168.1.7/setColor?r=${rgb.r}&g=${rgb.g}&b=${rgb.b}`);
  //   } catch (err) {
  //     console.error("Failed to send color:", err);
  //   }
  // };

  // Inside your color picker handler

  const firebaseDbUrl: string  = process.env.NEXT_PUBLIC_FIREBASE_REMOTE_DB_CONNECTION_URL! 



  //* Firebase remote db connention
  const sendColor = async (rgb: RGBColor) => {
    await fetch(firebaseDbUrl, {
      method: "PUT",
      body: JSON.stringify(rgb),
    });
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
      <div className="text-center">
        Selected: {color.r}, {color.g}, {color.b}
      </div>
    </div>
  );
}

/* 
{
  "rules": {
    ".read": "now < 1749493800000",  // 2025-6-10
    ".write": "now < 1749493800000",  // 2025-6-10
  }
}

{
  "rules": {
    ".read": false,
    ".write": false
  }
}

*/