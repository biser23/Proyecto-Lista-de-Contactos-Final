const Contact = require('../models/Contact.js');

const ContactController = {
    async getAllContacts(req,res) {
        try {
            const contacts = await Contact.find();
            res.json(contacts);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "There was a problem trying to find contacts" });
        }
    },

    async getContactById(req,res) {
        try {
            const contact = await Contact.findById(req.params._id)
            res.status(201).json(contact);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "There was a problem with the contact with _id number: " +
                    req.params._id,
            });
        }
    },

    async createContact(req,res) {
        try {
            const contact = await Contact.create({...req.body, completed: false});
            res.status(201).send({ message: "Contact successfully created", contact });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "There was a problem trying to create a contact" });
        }
    },

    async updateContact(req,res){
        try {
            const contact = await Contact.findByIdAndUpdate(
              req.params._id,
              { $set: req.body },
              { new: true, runValidators: true }
            );
            if (contact) {
              res.send({ message: "Contact successfully updated", contact });
          } else {
              res.status(404).send({ message: "Contact not found" });
          }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "There was a problem trying to update the contact with _id: " +
                    req.params._id,
            });
        }
    },

    async deleteContact(req,res) {
        try {
            const id = req.params._id;
            const contact = await Contact.findByIdAndDelete(id);
            res.send({ message: "contact deleted", contact });
        } catch (error) {
            console.log(error);
            res
            .status(500)
            .send({ message: "There was a problem trying to delete a contact" });
        }
    }
}

module.exports = ContactController;

/*const Task = require('../models/Task')

const TaskController = {
  async create (req, res) {
    try {
        const task = await Task.create({...req.body, completed: false})
        res.status(201).send(task)
    } catch (error) {
      console.log(error)
    }
  },
  async getAll (req, res) {
    try {
        const task = await Task.find();
        res.json(task);
    } catch (error) {
        console.log(error)
    }
  },
  async getAllSSR (req, res) {
    try {
        const task = await Task.find();
        res.send(`<h1>Tareas</h1>
          ${task.map(task => {
            return (
              `<div>
                <h2>Nombre de la tarea: ${task.title}</h2>
                <p>Task completed: ${task.completed}</p>
              </div>`
            )
          } ).join('')}
        </div>`);
    } catch (error) {
        console.log(error)
    }
  },
  async getByID (req, res) {
    try {
      const id = req.params._id;
      const task = await Task.findById(id);
      res.json(task)
    } catch (error) {
        console.log(error)
    }
  },
  async updateCompleted(req, res) {
    try {
      const id = req.params._id;
      const udpatedTask = await Task.findByIdAndUpdate(
        id, {
          completed: true
        }, {new: true}
      )
      if(!udpatedTask) {
        return res.status(404).json({mensaje: 'Task id not found'})
      } 
      res.json(udpatedTask)
    } catch (error) {
      console.log(error)
    }
  },
  async updateByName(req, res) {
    try {
      const id = req.params._id
      const title = req.body.title
      const updateTitleTask = await Task.findByIdAndUpdate(
        id, {
          title
        }, {new: true}
      )
      res.json(updateTitleTask)
    } catch (error) {
      console.log(error)
    }
  },
  async deleteTask (req, res) {
    try {
      const id = req.params._id
      const deletedTask = await Task.findByIdAndDelete(id)
      if (!deletedTask) {
        return res.status(404).json({message: "Task with that id not found"})
      }  
      res.json({message: "Task deleted successfully", deletedTask})
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = TaskController*/