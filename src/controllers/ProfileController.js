const { supabase } = require('../config/supabase');

// GET /projects
async function getAllProfile(req, res) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /Profiles/:id
async function getProfileById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /Profiles
async function createProfile(req, res) {
  try {
    const {
      full_name,
      title= null,
      bio= null,
      profile_image = null
    } = req.body;

    //  validation
    if (!full_name || !full_name.trim()) {
      return res.status(400).json({
        error: 'Profile_name is required'
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          full_name:full_name.trim(),
          title,
          bio,
          profile_image
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

// PATCH /Profiles/:id
async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.id;

    if (updates.Profile_name && !updates.Profile_name.trim()) {
      return res.status(400).json({
        error: 'Profile_name cannot be empty'
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /Profiles/:id
async function deleteProfile(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Profile deleted successfully',
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProfile,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
};
