const Task = require('./../models/taskModel');

const filter = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) =>
    allowedFields.includes(prop) ? (newObj[prop] = obj[prop]) : undefined
  );

  return newObj;
};

exports.createTask = async (req, res) => {
  try {
    req.body.owner = req.user.id;

    const allowedFields = ['title', 'body', 'owner'];
    const filteredBody = filter(req.body, allowedFields);

    const task = new Task(filteredBody);
    await task.save();

    res.status(201).json({ task });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const owner = req.user.id;
    const tasks = await Task.find({ owner });

    res.status(200).json({ results: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ error: 'Can not get tasks!' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const task = await Task.findOne({ _id, owner });
    if (!task) return res.status(404).json({ error: 'Task not found!' });

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ error: 'Can not get task!' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const allowedFields = ['title', 'body', 'completed'];
    const filteredBody = filter(req.body, allowedFields);

    const task = await Task.findOneAndUpdate({ _id, owner }, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: 'Task not found!' });

    res.status(200).json({ task });
  } catch (err) {
    res.status(400).json({ error: 'Can not update task!' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const _id = req.params.id;
    const owner = req.user.id;

    const task = await Task.findOneAndDelete({ _id, owner });
    if (!task) return res.status(404).json({ error: 'Task not found!' });

    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Can not delete task!' });
  }
};
