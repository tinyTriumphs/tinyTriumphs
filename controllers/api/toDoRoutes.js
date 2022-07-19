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
        },
      ],
    });

    const childs = childData.map((childs) => childs.get({ plain: true }));

    // console.log(childs);

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
                //     where: {
                //         devMilestone_complete: false
                //     }
                },
                {
                    model: medMilestones,
                    // where: {
                    //     medMilestone_complete: false
                    // }
                }
            ],
        }
        );console.log(toDoData);
        const childToDos = toDoData.get({ plain: true });

        console.log(childToDos);
        res.render("childidtodos", {
            ...childToDos,
            logged_in: req.session.logged_in
          });

    } catch (err) {
    res.status(500).json(err);
    }
});

 // update a category by its `id` value
 router.put('/:id', async (req, res) => {
  try {
    const toDoData = await Child.update(req.body, {
      where: { id: req.params.id },
    });

    if (!toDoData) {
      res.status(404).json({ message: 'No ToDo found with this id!'});
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    }

});






module.exports = router;
