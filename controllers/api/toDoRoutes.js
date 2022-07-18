const router = require('express').Router();
const { User, Child, devMilestones, medMilestones } = require('../../models')


//TODO - Render ALL upcoming milestones and appointments
router.get('/', async (req, res) => {
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
});

//TODO - UPDATE milestone by it's ID
//IF marked 'complete' then move to TaDas
// router.post('/:id', async (req, res) => {
//     try {

//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// TODO null conditional (if one field is null the entire return is null?)
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
                }
            ],
        }
        );
        res.status(200).json(toDoData);
    } catch (err) {
    res.status(500).json(err);
    }
});

module.exports = router;