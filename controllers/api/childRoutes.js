const router = require("express").Router();
const { User, Child, devMilestones, medMilestones } = require("../../models");
const withAuth = require('../../utils/auth');
const medMilestoneSeeds = require("../../milestones/medMilestoneDefaults.json")

//Get all associated children to user
//TODO currently gets all children in the database; want to get all children associated w/ User ID
router.get("/", withAuth, async (req, res) => {
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

    console.log(
      `
        
        THESE ARE THE CHILDREN
        
        `,
      childs
    );

    //TODO change to render when handlebars is functional
    res.render("children", {
      childs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    console.log(
      { ...req.body },
      `HERE IS THE REQ BODY
        
        
        
        `
    );
    const childs = await Child.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    if (!childs) {
      res.status(404).json({ message: "No child found with this id!" });
      return;
    }
    console.log(childs, `
    
    
    HERE ARE THE CHILD DATA
    
    `);
    console.log(childs.dataValues.id);

    console.log(medMilestoneSeeds, `
    
    med milestone seeds
    
    `)

    const medical = await medMilestones.bulk({
      medMilestone: 'Sample Milestone',
      medMilestone_complete: false,
      medMilestone_ToDoDate: '2022-01-10',
      child_id: childs.dataValues.id
    })

    const developmental = await devMilestones.create({
      devMilestone: 'Sample Dev Milestone',
      devMilestone_complete: false,
      devMilestone_expectedDate: '2022-01-10',
      devMilestone_expectedRange: '4-6 months'
    })

    console.log(medical, `
    
    THIS IS THE MEDICAL DATA
    
    `);

    res.status(200).json(childs);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    //Finds all children associated w/ logged in user id
    const childData = await Child.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: devMilestones,
          attributes: [
            "id",
            "devMilestone",
            "devMilestone_complete",
            "devMilestone_expectedDate",
            "devMilestone_expectedRange",
            "devMilestone_dateComplete",
            "child_id",
          ],
        },
      ],
    });

    const child = childData.get({ plain: true });

    console.log(child);

    res.render("childid", {
      ...child,
      logged_in: true,
    });

    // res.send(childData)

    // const childs = childData.map((childs) => childs.get({ plain: true }));

    // console.log(`

    // THESE ARE THE CHILDREN

    // `, childs);

    // //TODO change to render when handlebars is functional
    // res.render('childid', {
    //     childs,
    //     logged_in: req.session.logged_in,
    //     user_id: req.session.user_id
    // });
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: KALUKI delete child

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const childData = await Child.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
console.log(childData);
    if (!childData) {
      res.status(404).json({ message: "No child found with this id!" });
      return;
    }

    res.status(200).json(childData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
