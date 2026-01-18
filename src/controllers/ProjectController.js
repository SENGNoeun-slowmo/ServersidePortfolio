const { supabase } = require('../config/supabase');

// GET /projects
async function getAllProject(req, res) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /projects/:id
async function getProjectById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /projects
async function createProject(req, res) {
  try {
    const {
      project_name,
      description = null,
      tech_stack = [],
      github_url = null,
      demo_url = null,
      image = null
    } = req.body;

    //  validation
    if (!project_name || !project_name.trim()) {
      return res.status(400).json({
        error: 'project_name is required'
      });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          project_name: project_name.trim(),
          description,
          tech_stack,
          github_url,
          demo_url,
          image
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

// PATCH /projects/:id
async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.id;

    if (updates.project_name && !updates.project_name.trim()) {
      return res.status(400).json({
        error: 'project_name cannot be empty'
      });
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /projects/:id
async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project deleted successfully',
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
