import { useState, useEffect } from "react";

export function LiveTime() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date());

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentDateTime) {
    return null;
  }

  return (
    <div>
      <div>
        {currentDateTime.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div>
        {currentDateTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
}