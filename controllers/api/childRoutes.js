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

router.post('/', withAuth, async (req, res) => {
try {
const newChild = await Child.create({
...req.body,
user_id: req.session.user_id
});

res.status(200).json(newChild);
} catch (err) {
res.status(400).json(err);
}
});

const childs = childData.map((childs) => childs.get({ plain: true }));

console.log('THESE ARE THE CHILDREN', childs);

//TODO change to render when handlebars is functional
res.render('children', {
    childs,
    logged_in: req.session.logged_in
});
} catch (err) {
res.status(400).json(err);
}
});

module.exports = router;