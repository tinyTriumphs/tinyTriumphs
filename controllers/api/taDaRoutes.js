const router = require('express').Router();
const { User, Child, devMilestones, medMilestones } = require('../../models');

// the '/api/tada' endpoint
router.get("/", async (req, res) => {
    try {
      //Finds all children associated w/ logged in user id
      const childData = await Child.findAll(
        {
        include: [
          {
            model: User,
            attributes: ["id"],
            where: {
              id: req.session.user_id,
            },
          },
        ],
      }
      );
  
      const childs = childData.map((childs) => childs.get({ plain: true }));

      res.render("tadas", {
        childs,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


//TODO - Render ALL COMPLETED milestones and appointments
// router.get('/', async (req, res) => {
//     try {
//         const taDaData = await Child.findAll({
//             include: [
//                 {
//                     model: devMilestones,
//                     attributes: ['id', 'devMilestone', 'devMilestone_complete', 'devMilestone_expectedDate', 'devMilestone_expectedRange', 'devMilestone_dateComplete', 'child_id'],
//                     where: {
//                         devMilestone_complete: true
//                     }
//                 }
//             ]
//         });
//         res.status(200).json(taDaData);

//         const childTaDas = taDaData.get({ plain: true });

//         res.render("childidtadas", {
//             ...childTaDas,
//             logged_in: true,
//           });

//     } catch (err) {
//     res.status(500).json(err);
//     }
// });

router.get('/:id', async (req, res) => {
    try {
        const taDaData = await Child.findByPk(req.params.id, {
            include: [
                {
                    model: devMilestones,
                    where: {
                        devMilestone_complete: true
                    }
                },
                {
                    model: medMilestones,
                    where: {
                        medMilestone_complete: true
                    }
                }
            ]
        });

        const childTaDas = taDaData.get({ plain: true });

        console.log(childTaDas);

        res.render("childidtadas", {
            ...childTaDas,
            logged_in: true,
          });
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;