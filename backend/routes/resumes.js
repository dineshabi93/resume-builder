const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all resumes for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .select('title template createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific resume by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new resume
router.post('/', auth, async (req, res) => {
  try {
    const { title, template = 'basic' } = req.body;

    // Check if user can use premium templates
    if (['modern', 'creative', 'professional'].includes(template) && !req.user.isPremium) {
      return res.status(403).json({ message: 'Premium subscription required for this template' });
    }

    const resume = new Resume({
      userId: req.user._id,
      title,
      template
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check if user can use premium templates
    if (req.body.template && ['modern', 'creative', 'professional'].includes(req.body.template) && !req.user.isPremium) {
      return res.status(403).json({ message: 'Premium subscription required for this template' });
    }

    Object.assign(resume, req.body);
    await resume.save();

    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get public resume by slug
router.get('/public/:slug', async (req, res) => {
  try {
    const resume = await Resume.findOne({
      publicSlug: req.params.slug,
      isPublic: true
    }).populate('userId', 'name');

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get public resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle resume public status
router.patch('/:id/toggle-public', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.isPublic = !resume.isPublic;
    if (resume.isPublic && !resume.publicSlug) {
      resume.publicSlug = resume._id.toString();
    }

    await resume.save();
    res.json(resume);
  } catch (error) {
    console.error('Toggle public resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

