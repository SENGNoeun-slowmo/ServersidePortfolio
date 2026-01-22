const { supabase } = require('../config/supabase');

class ExperienceModel {
  // Get all experiences
  static async findAll() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get experience by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data; // will be null if not found
  }

  // Create new experience
  static async create({
    company_name,
    role = null,
    responsibilities = [],
    start_date,
    end_date,
  }) {
    const { data, error } = await supabase
      .from('experiences')
      .insert([
        {
          company_name: company_name.trim(),
          role,
          responsibilities,
          start_date,
          end_date,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update experience
  static async update(id, updates) {
    // Prevent updating id
    delete updates.id;

    // Clean up company_name if provided
    if (updates.company_name) {
      updates.company_name = updates.company_name.trim();
    }

    const { data, error } = await supabase
      .from('experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data; // will be null if not found
  }

  // Delete experience
  static async delete(id) {
    const { data, error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    return data; // array of deleted rows (empty if not found)
  }
}

module.exports = ExperienceModel;