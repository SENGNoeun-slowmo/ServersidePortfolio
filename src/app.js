const express = require('express');
const ProjectRoutes = require('./routes/Project');
const ProfileRoutes = require('./routes/Profile');
const SkillRoutes = require('./routes/Skill');
const ExperienceRoutes = require('./routes/Experience');
const ContactRoutes = require('./routes/Contact');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173',          // ← ប្តូរទៅ port ពិតប្រាកដរបស់ Vite/React អ្នក
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Routes
app.use('/api/projects', ProjectRoutes);
app.use('/api/profiles',ProfileRoutes );
app.use('/api/skills',SkillRoutes );
app.use('/api/experiences',ExperienceRoutes  );
app.use('/api/contacts',ContactRoutes  );
// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});