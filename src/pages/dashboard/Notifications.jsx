import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const response = await api.get("notifications/");

      const data = response.data.results || response.data;

      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`notifications/${id}/`);

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                is_read: true,
              }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification:", error);
    }
  };

  return (
    <div className="notifications-page">
      <Navbar />

      <main className="notifications-container">
        <div className="notifications-header">
          <span>UPDATES</span>

          <h1>Notifications</h1>

          <p>Stay updated with the latest opportunities added to Opportuna.</p>
        </div>

        {loading && (
          <div className="notification-message">Loading notifications...</div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="notification-message">
            You don't have any notifications yet.
          </div>
        )}

        {!loading && notifications.length > 0 && (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  notification.is_read ? "read" : "unread"
                }`}
              >
                <div className="notification-content">
                  <div className="notification-top">
                    <h2>{notification.title}</h2>

                    {!notification.is_read && (
                      <span className="unread-dot">New</span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </div>

                {!notification.is_read && (
                  <button onClick={() => markAsRead(notification.id)}>
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
