const router = require('express').Router();
const { User, Child, devMilestones, medMilestones } = require('../../models');

//Get all associated children to user
//TODO currently gets all children in the database; want to get all children associated w/ User ID
router.get('/', async (req, res) => {
    try {
        //Finds all children associated w/ logged in user id
        const childData = await Child.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id'],
                    where: {
                        //NOTE should be req.session.user_id but testing with hard coded ID for now
                        id: 1
                    }
                }
            ]
        });

        const childs = childData.map((childs) => childs.get({ plain: true }));

        console.log(`
        
        THESE ARE THE CHILDREN
        
        `, childs);

        //TODO change to render when handlebars is functional
        res.render('children', {
            childs,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
    res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        //Finds all children associated w/ logged in user id
        const childData = await Child.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        res.send(childData)

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

module.exports = router;