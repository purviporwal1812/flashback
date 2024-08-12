import express from 'express';
import cors from 'cors';
import pool from './db.js'; // Import the database connection
import dotenv from 'dotenv'
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM flashcards');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Add a new flashcard
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error('Error adding flashcard:', err);
    res.status(500).json({ error: 'Failed to add flashcard' });
  }
});

// Edit an existing flashcard
app.put('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    await pool.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating flashcard:', err);
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM flashcards WHERE id = ?', [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
