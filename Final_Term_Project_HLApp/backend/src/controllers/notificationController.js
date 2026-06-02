const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const list = mockDb.findNotifications(req.user._id);
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50); // limit to recent 50

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch notifications: ${error.message}`,
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      const notif = mockDb.notifications.find(n => n._id === req.params.id);
      if (!notif) return res.status(404).json({ success: false, message: 'Notification not found.' });

      if (notif.recipient !== req.user._id) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }

      notif.status = 'Read';
      return res.status(200).json({ success: true, data: notif });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.',
      });
    }

    // Verify ownership
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    notification.status = 'Read';
    await notification.save();

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to mark notification: ${error.message}`,
    });
  }
};

// @desc    Mark all user notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllAsRead = async (req, res) => {
  if (global.useMockDb) {
    const mockDb = require('../config/mockDb');
    try {
      mockDb.notifications.forEach(n => {
        if (n.recipient === req.user._id) {
          n.status = 'Read';
        }
      });
      return res.status(200).json({ success: true, message: 'All notifications marked as read.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  try {
    await Notification.updateMany(
      { recipient: req.user._id, status: 'Unread' },
      { status: 'Read' }
    );

    return res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to mark notifications: ${error.message}`,
    });
  }
};
