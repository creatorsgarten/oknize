import { useState, useEffect } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      var today = new Date();
      var now = today.toLocaleTimeString("th-TH");
      setCurrentTime(now);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <span className="text-xl font-bold">{currentTime}</span>
    </div>
  );
};

export default CurrentTime;
