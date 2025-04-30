const db = require('../db');

// Create Booking
exports.createBooking = (req, res) => {
  const { user_id, crane_type, from_date, to_date } = req.body;
  const days = Math.ceil((new Date(to_date) - new Date(from_date)) / (1000 * 60 * 60 * 24)) + 1;
  const total_cost = days * 5000;

  const sql = `INSERT INTO bookings (user_id, crane_type, from_date, to_date, total_cost, status) 
               VALUES (?, ?, ?, ?, ?, 'pending')`;

  db.query(sql, [user_id, crane_type, from_date, to_date, total_cost], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Booking created, awaiting approval.' });
  });
};

// Admin Approve Booking
exports.approveBooking = (req, res) => {
  const bookingId = req.params.id;

  db.query(`SELECT * FROM bookings WHERE id = ?`, [bookingId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Booking not found' });

    const booking = results[0];
    const checkCrane = `SELECT * FROM cranes WHERE type = ? AND status = 'available' LIMIT 1`;

    db.query(checkCrane, [booking.crane_type], (err, cranes) => {
      if (cranes.length === 0) {
        db.query(`UPDATE bookings SET status = 'declined' WHERE id = ?`, [bookingId]);
        return res.status(200).json({ message: 'No crane available. Booking declined.' });
      }

      const crane = cranes[0];

      db.query(`UPDATE bookings SET status = 'approved', crane_id = ? WHERE id = ?`, [crane.id, bookingId], () => {
        db.query(`UPDATE cranes SET status = 'unavailable' WHERE id = ?`, [crane.id]);
        res.status(200).json({ message: 'Booking approved and crane assigned.' });
      });
    });
  });
};

// Get All Bookings (Admin)
exports.getAllBookings = (req, res) => {
  db.query(`SELECT * FROM bookings`, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Get Bookings by User
exports.getUserBookings = (req, res) => {
  const { user_id } = req.params;
  db.query(`SELECT * FROM bookings WHERE user_id = ?`, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};
