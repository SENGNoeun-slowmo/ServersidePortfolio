const ExperienceModel = require('../models/experience');

class ExperienceController {
  // GET /experiences
  static async getAll(req, res) {
    try {
      const experiences = await ExperienceModel.findAll();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /experiences/:id
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const experience = await ExperienceModel.findById(id);

      if (!experience) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.json(experience);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST /experiences
  static async create(req, res) {
    try {
      const {
        company_name,
        role = null,
        responsibilities = [],
        start_date,
        end_date,
      } = req.body;

      // Basic validation
      if (!company_name || !company_name.trim()) {
        return res.status(400).json({
          error: 'company_name is required and cannot be empty',
        });
      }

      const newExperience = await ExperienceModel.create({
        company_name,
        role,
        responsibilities,
        start_date,
        end_date,
      });

      res.status(201).json(newExperience);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PATCH /experiences/:id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      // Prevent updating id
      if (updates.id) delete updates.id;

      // Validate company_name if provided
      if (updates.company_name && !updates.company_name.trim()) {
        return res.status(400).json({
          error: 'company_name cannot be empty',
        });
      }

      const updatedExperience = await ExperienceModel.update(id, updates);

      if (!updatedExperience) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.json(updatedExperience);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /experiences/:id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ExperienceModel.delete(id);

      if (!deleted || deleted.length === 0) {
        return res.status(404).json({ error: 'Experience not found' });
      }

      res.status(200).json({
        message: 'Experience deleted successfully',
        deletedId: id,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ExperienceController;