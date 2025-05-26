import { Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";

const demoNotifications = [
  {
    id: "1",
    message: "Your profile has been updated successfully.",
    createdAt: "2025-05-20T10:30:00Z",
  },
  {
    id: "2",
    message: "New comment on your post.",
    createdAt: "2025-05-20T09:45:00Z",
  },
  {
    id: "3",
    message: "Password changed successfully.",
    createdAt: "2025-05-19T14:12:00Z",
  },
  {
    id: "4",
    message: "You have a new follower.",
    createdAt: "2025-05-18T16:00:00Z",
  },
  {
    id: "5",
    message: "Your subscription is about to expire.",
    createdAt: "2025-05-18T11:20:00Z",
  },
  {
    id: "6",
    message: "Welcome to our platform!",
    createdAt: "2025-05-17T08:00:00Z",
  },
  {
    id: "7",
    message: "New features have been added.",
    createdAt: "2025-05-16T13:30:00Z",
  },
  {
    id: "8",
    message: "System maintenance scheduled for tonight.",
    createdAt: "2025-05-15T19:45:00Z",
  },
  {
    id: "9",
    message: "Your account settings were updated.",
    createdAt: "2025-05-15T08:30:00Z",
  },
  {
    id: "10",
    message: "You received a new message.",
    createdAt: "2025-05-14T21:00:00Z",
  },
  {
    id: "11",
    message: "New login from an unrecognized device.",
    createdAt: "2025-05-14T07:15:00Z",
  },
  {
    id: "12",
    message: "Your post has been approved.",
    createdAt: "2025-05-13T12:00:00Z",
  },
];

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Use demo data instead of API data
  const allNotification = { notifications: demoNotifications };

  const pageSize = 10;

  // Pagination Logic
  const paginatedNotifications = allNotification.notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4">
        <FaAngleLeft /> Notification
      </Link>

      <div className="space-y-4">
        {paginatedNotifications.map((item) => (
          <div
            key={item.id}
            className="border border-[#00649ac7] hover:bg-[#00649a54] cursor-pointer rounded-md p-4 flex items-center space-x-4"
          >
            <div className="text-[#00659a] border border-[#00659a] rounded-full p-2 relative">
              <span className="bg-[#00659a] p-1.5 rounded-full absolute ml-4 z-20"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item.message}</p>
              <p className="text-gray-500">{moment(item.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={allNotification.notifications.length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
