const router = require("express").Router();
const { User, Child, devMilestones, medMilestones } = require("../../models");

router.get("/", async (req, res) => {
  try {
    //Finds all children associated w/ logged in user id
    const childData = await Child.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
          where: {
            id: req.session.user_id,
          },
        }
        ],
      });
  
      const childs = childData.map((childs) => childs.get({ plain: true }));
  
      res.render("todos", {
        childs,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put("/dev", async (req, res) => {
    try {
      const { devMilestone_dateComplete, id } = req.body
      
      const dev = await devMilestones.update(
        {
          devMilestone_dateComplete,
          devMilestone_complete: true
        },
        {
          where: {
           id: id,
          }
        }
      );
      if(!dev) {
        res.status(404).json({ message: "Not updated" });
        return;
      }

      res.status(200).json(dev);

    } catch (err) {
      res.status(500).json(err);
    }
  } )

  router.put("/med", async (req, res) => {
    try {
      const { medMilestone_dateComplete, id } = req.body
      
      const dev = await medMilestones.update(
        {
          medMilestone_dateComplete,
          medMilestone_complete: true
        },
        {
          where: {
          id: id,
          }
        }
      );
      if(!dev) {
        res.status(404).json({ message: "Not updated" });
        return;
      }
      res.status(200).json(dev);

    } catch (err) {
      res.status(500).json(err);
    }
  } )

router.get('/:id', async (req, res) => {
    try {
        const toDoData = await Child.findByPk(req.params.id, {
            include: [
              {
                  model: devMilestones,
                  where: {
                      devMilestone_complete: false
                  }
              },
              {
                model: medMilestones,
                where: {
                  medMilestone_complete: false
                }
              },
            ]
        }
        );

        const childToDos = toDoData.get({ plain: true });

        res.render("childidtodos", {
            ...childToDos,
            logged_in: req.session.logged_in
          });

    } catch (err) {
    res.status(500).json(err);
    }
  });

module.exports = router;
