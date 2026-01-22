"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const experience_1 = __importDefault(require("../models/experience"));
class ExperienceController {
    static async getAll(req, res) {
        try {
            const experiences = await experience_1.default.findAll();
            res.status(200).json(experiences);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const experience = await experience_1.default.findById(id);
            if (!experience) {
                res.status(404).json({ error: 'Experience not found' });
                return;
            }
            res.status(200).json(experience);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const { company_name, role = null, responsibilities = [], start_date = null, end_date = null, } = req.body;
            // Basic validation
            if (!company_name || typeof company_name !== 'string' || !company_name.trim()) {
                res.status(400).json({
                    error: 'company_name is required and cannot be empty',
                });
                return;
            }
            const newExperience = await experience_1.default.create({
                company_name,
                role,
                responsibilities,
                start_date,
                end_date,
            });
            res.status(201).json(newExperience);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const updates = { ...req.body };
            // Prevent updating id
            if ('id' in updates)
                delete updates.id;
            // Validate company_name if provided
            if (updates.company_name && !updates.company_name.trim()) {
                res.status(400).json({
                    error: 'company_name cannot be empty',
                });
                return;
            }
            const updatedExperience = await experience_1.default.update(id, updates);
            if (!updatedExperience) {
                res.status(404).json({ error: 'Experience not found' });
                return;
            }
            res.status(200).json(updatedExperience);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await experience_1.default.delete(id);
            if (deleted.length === 0) {
                res.status(404).json({ error: 'Experience not found' });
                return;
            }
            res.status(200).json({
                message: 'Experience deleted successfully',
                deletedId: id,
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = ExperienceController;
