import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Mock API endpoint
app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the serverrr!' });
});

// Contact form submission
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  console.log('Received contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received!' });
});

// skills
app.get('/api/skills', (req: Request, res: Response) => {
  const skills = [
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Express.js', level: 'Intermediate' },
  ];
  res.json(skills);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});