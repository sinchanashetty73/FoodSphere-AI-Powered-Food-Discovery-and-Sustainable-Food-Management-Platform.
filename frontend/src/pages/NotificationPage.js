import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5194/api/Notification"
      );

      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const markRead = async (id) => {
    await axios.put(
      `http://localhost:5194/api/Notification/${id}/read`
    );

    loadNotifications();
  };

  const deleteNotification = async (id) => {
    await axios.delete(
      `http://localhost:5194/api/Notification/${id}`
    );

    loadNotifications();
  };

  return (
    <div className="notification-container">

      <h1 className="notification-title">
        🔔 Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="empty-box">
          No Notifications Yet
        </div>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`notification-card ${
              n.isRead ? "read" : "unread"
            }`}
          >
            <div className="notification-header">
              <h3>{n.title}</h3>

              {!n.isRead && (
                <span className="new-badge">
                  NEW
                </span>
              )}
            </div>

            <p>{n.message}</p>

            <small>
              {new Date(
                n.createdAt
              ).toLocaleString()}
            </small>

            <div className="notification-buttons">

              {!n.isRead && (
                <button
                  className="read-btn"
                  onClick={() => markRead(n.id)}
                >
                  Mark Read
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() =>
                  deleteNotification(n.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default NotificationPage;