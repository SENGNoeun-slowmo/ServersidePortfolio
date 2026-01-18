const { supabase } = require('../config/supabase');

// GET /projects
async function getAllExperience(req, res) {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /experiences/:id
async function getExperienceById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /experiences
async function createExperience(req, res) {
  try {
    const {
    company_name,
    role=null,
    responsibilities=[],
    start_date,
    end_date
    } = req.body;

    //  validation
    if (!company_name|| !company_name.trim()) {
      return res.status(400).json({
        error: 'Experience_name is required'
      });
    }

    const { data, error } = await supabase
      .from('experiences')
      .insert([
        {
          company_name:company_name.trim(),
          role,
          responsibilities,
          start_date,
          end_date
          
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PATCH /experiences/:id
async function updateExperience(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.id;

    if (updates.Experience_name && !updates.Experience_name.trim()) {
      return res.status(400).json({
        error: 'Experience_name cannot be empty'
      });
    }

    const { data, error } = await supabase
      .from('experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /experiences/:id
async function deleteExperience(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.status(200).json({
      message: 'Experience deleted successfully',
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};
