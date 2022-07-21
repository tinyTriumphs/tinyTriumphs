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
  
      console.log(childs);
  
      //TODO change to render when handlebars is functional
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
      // const devMilestonesResult = req.body;
      // console.log(devMilestonesResult, `


      // THIS IS THE REQUEST BODY ON THE SERVER
      


      // `);
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
      console.log(dev, `
      
      HERE IS THE DEV MILESTONE
      
      `);
      
      res.status(200).json(dev);
      // res.redirect('/profile');

    } catch (err) {
      res.status(500).json(err);
    }
  } )

  router.put("/med", async (req, res) => {
    try {
      // const devMilestonesResult = req.body;
      // console.log(devMilestonesResult, `


      // THIS IS THE REQUEST BODY ON THE SERVER
      


      // `);
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
      console.log(dev, `
      
      HERE IS THE MED MILESTONE
      
      `);
      
      res.status(200).json(dev);

    } catch (err) {
      res.status(500).json(err);
    }
  } )
  
//   router.post("/", withAuth, async (req, res) => {
//     try {
//       console.log(
//         { ...req.body },
//         `Right Here is right

//           `
//       );
//       const childs = await Child.create({
//         ...req.body,
//         user_id: req.session.user_id,
//       });
//       if (!childs) {
//         res.status(404).json({ message: "No child found with this id!" });
//         return;
//       }
//       console.log(childs);
//       res.status(200).json(childs);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//TODO - Render ALL upcoming milestones and appointments
// router.get('/', async (req, res) => {
// try {
//     // res.send('<h1>Tiny Triumphs Landing Page</h1>');
//     const childData = await Child.findAll({
//         include:
//         [
//             //Includes linked parent name only
//             {
//                 model: User,
//                 // attributes: ['name'],
//             },
//         ],
//     });

//     const children = childData.map((children) => children.get({ plain: true }));

//     //TODO change to render when handlebars is functional
//     res.send(children);
// } catch (err) {
// res.status(400).json(err);
// }
// });

//TODO - UPDATE milestone by it's ID
//IF marked 'complete' then move to TaDas
// router.post('/:id', async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

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
        // console.log(toDoData);
        const childToDos = toDoData.get({ plain: true });

        // const sortReturn = json.sort(function (a, b) {
        //   return a.id - b.id
        // })
        // const sortedChildToDos = json.sort()

        // console.log(sortedChildToDos);
        // res.send(sortedChildToDos);

        //TODO - Medical is rendering in reverse order; would love to sort by id?
        // res.send(childToDos)
        res.render("childidtodos", {
            ...childToDos,
            logged_in: req.session.logged_in
          });

    } catch (err) {
    res.status(500).json(err);
    }
  });

// router.put('/:id', async (req, res) => {
//   try {
//     const childs = await  Child.update({
//       devMilestones_complete: true,
//       devMilestones_dateComplete: req.body
//     },
//     {
//       where: {
//       id: 118,
//       }
//     })
//     if (!childs) {
//       res.status(404).json({ message: 'No Tag with this id!' });
//       return;
//     }console.log(req.body)
//     res.status(200).json(childs);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
