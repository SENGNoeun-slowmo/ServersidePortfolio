const { supabase } = require('../config/supabase');

// GET /projects
async function getAllSkill(req, res) {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /skills/:id
async function getSkillById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /skills
async function createSkill(req, res) {
  try {
    const {
      name,
     level=null
    } = req.body;

    //  validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        error: 'Skill_name is required'
      });
    }

    const { data, error } = await supabase
      .from('skills')
      .insert([
        {
          name:name.trim(),
          level,
        
          
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

// PATCH /skills/:id
async function updateSkill(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.id;

    if (updates.Skill_name && !updates.Skill_name.trim()) {
      return res.status(400).json({
        error: 'Skill_name cannot be empty'
      });
    }

    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /skills/:id
async function deleteSkill(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json({
      message: 'Skill deleted successfully',
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllSkill,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};
