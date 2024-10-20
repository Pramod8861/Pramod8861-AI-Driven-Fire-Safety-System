import { useState, useEffect } from "react";
import {
  Settings,
  Power,
  Home,
  Menu,
  Music,
  RotateCcw,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your Firebase config (add your actual Firebase config here)
const firebaseConfig = {
  apiKey: "AIzaSyAP_woqgsF4RpHOl56pbczSVc6CVuP95rM",
  authDomain: "ai-vechile.firebaseapp.com",
  databaseURL: "https://ai-vechile-default-rtdb.firebaseio.com",
  projectId: "ai-vechile",
  storageBucket: "ai-vechile.appspot.com",
  messagingSenderId: "486008885410",
  appId: "1:486008885410:web:2799b4957bafcffb27c7fb",
  measurementId: "G-WQC5VEM4FK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function GameController() {
  const [valueX, setX] = useState(0);
  const [valueY, setY] = useState(0);

  // Update Firebase whenever valueX or valueY changes
  useEffect(
    () => {
      set(ref(database, "commands/"), {
        dirX: valueX,
        dirY: valueY
      });
    },
    [valueX, valueY]
  );

  const handleIncreaseX = () => {
    setX(prevX => Math.min(prevX + 10, 180));
  };

  const handleDecreaseX = () => {
    setX(prevX => Math.max(prevX - 10, 0));
  };

  const handleIncreaseY = () => {
    setY(prevY => Math.min(prevY + 10, 90));
  };

  const handleDecreaseY = () => {
    setY(prevY => Math.max(prevY - 10, 0));
  };

  return (
    <div className="bg-gray-900 text-white p-8 flex flex-col justify-between rounded-3xl max-w-[35rem] h-[45rem] relative top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-between mb-6">
        <button className="bg-gray-800 p-3 rounded-full">
          <Settings size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-1">Control</h2>
          <p className="text-xs text-gray-400">Setup</p>
        </div>
        <button className="bg-gray-700 p-3 rounded-full">
          <Power size={24} />
        </button>
      </div>

      <div className="relative w-[20rem] h-[20rem] mx-auto mb-6">
        <div className="absolute inset-0 bg-gray-800 rounded-full" />
        <div className="absolute inset-2 bg-gray-700 rounded-full flex items-center justify-center">
          <button className="bg-gray-900 w-24 h-24 rounded-full flex items-center justify-center text-lg font-semibold">
            OK
          </button>
        </div>

        {/* Arrow controls */}
        <button
          onClick={handleIncreaseY}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 cursor-pointer bg-white rounded-full"
          disabled={valueY === 90}
        >
          <ArrowUp className="w-full h-full p-2 text-black" />
        </button>
        <button
          onClick={handleDecreaseY}
          className="absolute bottom-0 left-1/2 disabled:opacity-50 -translate-x-1/2 w-16 h-16 cursor-pointer bg-white rounded-full"
          disabled={valueY === 0}
        >
          <ArrowDown className="w-full h-full p-2 text-black" />
        </button>
        <button
          onClick={handleDecreaseX}
          disabled={valueX === 0}
          className="absolute left-0 top-1/2 disabled:opacity-50 -translate-y-1/2 w-16 h-16 cursor-pointer bg-white rounded-full"
        >
          <ArrowLeft className="w-full h-full p-2 text-black" />
        </button>
        <button
          onClick={handleIncreaseX}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer bg-white rounded-full"
          disabled={valueX === 180}
        >
          <ArrowRight className="w-full h-full p-2 text-black" />
        </button>
      </div>

      <div className="flex justify-center space-valueX-4 mb-6">
        {["R", "G", "B", "valueY"].map((letter, index) =>
          <button
            key={letter}
            className={`w-16 h-16 rounded-full text-xs font-semibold ${index ===
            0
              ? "bg-red-500"
              : index === 1
                ? "bg-green-500"
                : index === 2 ? "bg-blue-500" : "bg-yellow-500"}`}
          >
            {letter}
          </button>
        )}
      </div>

      <div className="flex justify-between">
        {[
          { icon: Home, label: "Home" },
          { icon: Menu, label: "Menu" },
          { icon: Music, label: "Audio" },
          { icon: RotateCcw, label: "Return" }
        ].map(({ icon: Icon, label }) =>
          <button key={label} className="flex flex-col items-center">
            <div className="bg-gray-800 p-3 rounded-full mb-1">
              <Icon size={20} />
            </div>
            <span className="text-xs"
              {label}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
