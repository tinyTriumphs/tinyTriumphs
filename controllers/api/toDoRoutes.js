const router = require('express').Router();


//TODO - Render ALL upcoming milestones and appointments
router.get('/', async (req, res) => {
    try {

    } catch (err) {
    res.status(400).json(err);
    }
});

//TODO - UPDATE milestone by it's ID
//IF marked 'complete' then move to TaDas
router.post('/:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;