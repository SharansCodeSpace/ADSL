import express from "express";
import cors from "cors";
import cassandra from "cassandra-driver";

const app = express();
app.use(express.json());
app.use(cors());

// Cassandra connection
const client = new cassandra.Client({
  contactPoints: ["localhost"],
  localDataCenter: "datacenter1",
  keyspace: "weather_data",
});

// Connect to Cassandra
client.connect()
    .then(() => console.log('Connected to Cassandra'))
    .catch(err => console.error('Cassandra connection error', err));

// Insert data endpoint
app.post("/insert", async (req, res) => {
  const { weather_station_id, reading_time, temperature } = req.body;
  const query =
    "INSERT INTO temperature_by_station (weather_station_id, reading_time, temperature) VALUES (?, ?, ?)";
  const params = [weather_station_id, reading_time, temperature];

  try {
    await client.execute(query, params, { prepare: true });
    res.json({ status: "inserted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all readings (regardless of station)
app.get("/readings", async (req, res) => {
  const query = "SELECT * FROM temperature_by_station";
  try {
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read data endpoint
app.get("/readings/:station_id", async (req, res) => {
  const query =
    "SELECT * FROM temperature_by_station WHERE weather_station_id = ? LIMIT 10";
  const params = [req.params.station_id];

  try {
    const result = await client.execute(query, params, { prepare: true });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
