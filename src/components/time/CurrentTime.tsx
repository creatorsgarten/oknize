import { useState, useEffect } from "react";

const CurrentTime = ({ currentTime }: { currentTime: string }) => {
  return (
    <div>
      <span className="text-4xl text-center font-bold">{currentTime}</span>
    </div>
  );
};

export default CurrentTime;
