import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";

const message = `Thank you for your sweet message… it really made me smile

I’m really happy that we could spend time together when you were here. Honestly, those moments felt very special to me

I felt a bit sad when you had to leave… I hope next time we can have more time together again 
I always feel very comfortable plus shy too talking with you heheS, it’s something I don’t find easily.

Take care there, Aaghaye Hosein
I hope everything goes well for you 🌿
`;

function App() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const audioRef = useRef(null);

  const handleClick = () => {
    setOpen(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // typing effect
  useEffect(() => {
    if (open) {
      let i = 0;
      const interval = setInterval(() => {
        setText(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <div className="container">
      {/* audio */}
      <audio ref={audioRef}>
        <source src="/open.mp3" type="audio/mpeg" />
      </audio>

      {/* sebelum dibuka */}
      {!open && (
        <div className="pre-open">
          <motion.div
            className="duck"
            initial={{ x: -150 }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
          >
            🦆💌
          </motion.div>

          <motion.div
            className="envelope"
            onClick={handleClick}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flap"></div>
            <div className="body"></div>
          </motion.div>
        </div>
      )}

      {/* setelah dibuka */}
      {open && (
        <>
          {/*bunga */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={"flower" + i}
              className="flower"
              initial={{ y: -100, x: Math.random() * 300 }}
              animate={{ y: "110vh" }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
              }}
            >
              🌸
            </motion.div>
          ))}

          {/* daun */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={"leaf" + i}
              className="leaf"
              initial={{ y: -100, x: Math.random() * 300 }}
              animate={{
                y: "110vh",
                x: [
                  Math.random() * 300,
                  Math.random() * 300 + 40,
                  Math.random() * 300 - 40,
                ],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
              }}
            >
              🍃
            </motion.div>
          ))}

          {/* love pink */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={"love" + i}
              className="love"
              initial={{ y: 200, opacity: 0, x: Math.random() * 200 }}
              animate={{ y: -200, opacity: 1 }}
              transition={{
                duration: 5,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              💗
            </motion.div>
          ))}

          {/* 💌 surat */}
          <motion.div
            className="letter"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>To Aaghaye Hosein 💗</h2>
            <p className="typing">{text}</p>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default App;