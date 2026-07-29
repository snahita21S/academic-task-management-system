import React, { useEffect, useState } from "react";
import api from "../api.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend URL

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch notifications when component loads
  useEffect(() => {
    api.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  // ✅ Listen for real-time notifications
  useEffect(() => {
    socket.on("newNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  // ✅ Mark notification as read
  const markAsRead = (id) => {
    api.put(`/notifications/${id}/read`)
      .then((res) => {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      })
      .catch((err) => console.error("Error marking notification as read:", err));
  };

  return (
    <div
      style={{
        marginTop: "20px",
        background: "#fff",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <h3>🔔 Notifications</h3>
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <div
            key={n._id || Math.random()}
            style={{
              padding: "8px",
              borderBottom: "1px solid #eee",
              backgroundColor: n.read ? "#f9f9f9" : "#e3f2fd",
              marginBottom: "8px",
              borderRadius: "6px"
            }}
          >
            <strong>{n.type}</strong>: {n.message}
            {!n.read && (
              <button
                onClick={() => markAsRead(n._id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Mark Read
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
}

export default NotificationPanel;
