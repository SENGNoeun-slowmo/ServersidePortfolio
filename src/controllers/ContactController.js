const { supabase } = require('../config/supabase');

// GET /projects
async function getAllContact(req, res) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /contacts/:id
async function getContactById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /contacts
async function createContact(req, res) {
  try {
    const {
    email,
    phone=null,
    linkedin =null,
    github=null
    } = req.body;

    //  validation
  

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
         email,
         phone,
         linkedin,
         github
          
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

// PATCH /contacts/:id
async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.id;

    if (updates.Contact_name && !updates.Contact_name.trim()) {
      return res.status(400).json({
        error: 'Contact_name cannot be empty'
      });
    }

    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE /contacts/:id
async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({
      message: 'Contact deleted successfully',
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
