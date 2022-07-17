const router = require("express").Router();
const { User, Child, devMilestones, medMilestones } = require("../../models");

//Get all associated children to user
//TODO currently gets all children in the database; want to get all children associated w/ User ID
router.get("/", async (req, res) => {
  try {
    //Finds all children associated w/ logged in user id
    const childData = await Child.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
          where: {
            //NOTE should be req.session.user_id but testing with hard coded ID for now
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

router.post("/", async (req, res) => {
  try {
    console.log(
      { ...req.body },
      `Right Here is right 
        
        
        
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
    console.log(childs);
    res.status(200).json(childs);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const childData = await Child.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

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
