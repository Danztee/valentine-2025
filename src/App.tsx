import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: import.meta.env.LOGSNAG_TOKEN,
  project: "VALENTINE",
});

const track = async () => {
  await logsnag.track({
    channel: "valentine",
    event: "She Said Yes!",
    description: "A love story begins 💖",
    icon: "💍",
    notify: true,
  });
};

function App() {
  const steps = [
    { content: "Hey beautiful,", image: "/character/one.png" },
    { content: "From the moment we met...", image: "/character/two.png" },
    {
      content: "Something about you felt special.",
      image: "/character/three.png",
    },
    {
      content: "Your smile, your laugh, your heart...",
      image: "/character/four.png",
    },
    {
      content: "Every moment with you feels like magic.",
      image: "/character/five.png",
    },
    { content: "So I have a little question...", image: "/character/six.png" },
    { content: "Will you be my Valentine? 💖", image: "/character/seven.png" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [sheSaidYes, setSheSaidYes] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    steps.forEach((step) => {
      const img = new Image();
      img.src = step.image;
    });
  }, []);

  return (
    <>
      {sheSaidYes && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-pink-300">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-5xl font-extrabold"
            >
              Yayyyy! 💕
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt="Celebration"
              className="w-52 animate-bounce mt-4"
            />
          </div>
        </motion.div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-pink-300 p-5 max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt="Scene"
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-semibold text-white mt-5"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < steps.length - 1 && (
          <div className="mt-10 space-y-3 w-full">
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-pink-500 py-3 text-xl rounded-xl w-full font-semibold shadow-md transition hover:scale-105"
            >
              Next ➡️
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-pink-500 py-3 text-xl rounded-xl w-full font-semibold opacity-90 shadow-md transition hover:scale-105"
              >
                ⬅️ Back
              </button>
            )}
          </div>
        )}

        {currentStep === steps.length - 1 && (
          <div className="mt-10 space-y-3 w-full">
            <button
              onClick={async () => {
                setSheSaidYes(true);
                await track();
              }}
              className="bg-white text-pink-500 py-3 text-xl rounded-xl w-full font-semibold shadow-lg transition hover:scale-105"
            >
              Yes 💖
            </button>
            <button
              onClick={async () => {
                setSheSaidYes(true);
                await track();
              }}
              className="bg-white text-pink-500 py-3 text-xl rounded-xl w-full font-semibold shadow-lg transition hover:scale-105"
            >
              Absolutely Yes! 💍
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
