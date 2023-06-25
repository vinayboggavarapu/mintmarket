import React, { useState } from "react";

const Notification = () => {
  const [notify, setnotify] = useState(false);
  return (
    <div>
      <p
        className="text-white cursor-pointer"
        onClick={() => setnotify(!notify)}
      >
        Notifications
      </p>
      {notify && (
        <div className="absolute top-10 rounded-md p-3 flex flex-col gap-3 bg-white w-48 z-20">
          <p className="">One msg from the buyer</p>
          <p className="bg-gray-50">3 min ago</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
