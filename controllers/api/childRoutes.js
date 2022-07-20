const router = require("express").Router();
const { User, Child, devMilestones, medMilestones } = require("../../models");
const withAuth = require('../../utils/auth');

//Get all associated children to user
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

    res.render("children", {
      childs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Route to create a new child
router.post("/", withAuth, async (req, res) => {
  try {
    const childs = await Child.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    if (!childs) {
      res.status(404).json({ message: "No child found with this id!" });
      return;
    }

    //all medical fields that will be pre-filled and attached to new child id
    const medical = await medMilestones.bulkCreate(
      [
        { medMilestone: 'I was born!', medMilestone_complete: true, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: 'birth', medMilestone_dateComplete: childs.dataValues.birthdate, child_id: childs.dataValues.id },
        { medMilestone: 'HepB (Hepatitis B)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: 'birth', child_id: childs.dataValues.id },
        { medMilestone: 'HepB (Hepatitis B), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '1-2 months', child_id: childs.dataValues.id },
        { medMilestone: 'RV (Rotavirus)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '2 months', child_id: childs.dataValues.id },
        { medMilestone: 'Dtap (Diphtheria, Tetanus, & Acellular Pertussis)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '2 months', child_id: childs.dataValues.id },
        { medMilestone: 'Hib (Haemophilus Influenzae Type B)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '2 months', child_id: childs.dataValues.id },
        { medMilestone: 'PCV13 (Pneumococcal Conjugate)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '2 months', child_id: childs.dataValues.id },
        { medMilestone: 'IPV (Inactivated Poliovirus)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '2 months', child_id: childs.dataValues.id },
        { medMilestone: 'RV (Rotavirus), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '4 months', child_id: childs.dataValues.id },
        { medMilestone: 'Dtap (Diphtheria, Tetanus, & Acellular Pertussis), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '4 months', child_id: childs.dataValues.id },
        { medMilestone: 'Hib (Haemophilus Influenzae Type B), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '4 months', child_id: childs.dataValues.id },
        { medMilestone: 'PCV13 (Pneumococcal Conjugate), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '4 months', child_id: childs.dataValues.id },
        { medMilestone: 'IPV (Inactivated Poliovirus), 2nd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '4 months', child_id: childs.dataValues.id },
        { medMilestone: 'Dtap (Diphtheria, Tetanus, & Acellular Pertussis), 3rd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '6 months', child_id: childs.dataValues.id },
        { medMilestone: 'PCV13 (Pneumococcal Conjugate), 3rd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '6 months', child_id: childs.dataValues.id },
        { medMilestone: 'HepB (Hepatitis B), 3rd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '6-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'IPV (Inactivated Poliovirus), 3rd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '6-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'Hib (Haemophilus Influenzae Type B), 3rd Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '12-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'Hib (Haemophilus Influenzae Type B), 4th Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '12-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'MMR (Measles, Mumps, Rubella)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '12-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'VAR (Varicella)', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '12-15 months', child_id: childs.dataValues.id },
        { medMilestone: 'Dtap (Diphtheria, Tetanus, & Acellular Pertussis), 4th Dose', medMilestone_complete: false, medMilestone_ToDoDate: '2022-01-10', medMilestone_expectedRange: '15 months', child_id: childs.dataValues.id }
      ]
    )

    //all developmental fields that will be pre-filled and attached to new child id
    const developmental = await devMilestones.bulkCreate(
      [
        { devMilestone: 'Took first breath', devMilestone_complete: true, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: 'birth', devMilestone_dateComplete: childs.dataValues.birthdate, child_id: childs.dataValues.id },
        { devMilestone: 'Calms down when spoken to or picked up', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'Looks at your face', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'Smiles when you talk to or smile at them', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'Reacts to loud sounds', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'Watches you as you move', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'Holds head up when on tummy', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '2-3 months', child_id: childs.dataValues.id },
        { devMilestone: 'First Tooth', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '3-6 months', child_id: childs.dataValues.id },
        { devMilestone: 'Smiles on their own to get your attention', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Chuckles (not yet a full laugh) when you try to make them laugh', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Makes sounds like “oooo”, “aahh” (cooing)', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'If hungry, opens mouth when they see breast or bottle', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Holds head steady without support when you are holding them', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Holds a toy when you put it in their hand', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Pushes up onto elbows/forearms when on tummy', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '4-5 months', child_id: childs.dataValues.id },
        { devMilestone: 'Knows familiar people', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Laughs', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Blows “raspberries” (sticks tongue out and blows)', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Rolls from tummy to back', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Pushes up with straight arms when on tummy', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Leans on hands to support themselves when sitting', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '6-8 months', child_id: childs.dataValues.id },
        { devMilestone: 'Shows several facial expressions, like happy, sad, angry, and surprised', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Reacts when you leave, i.e., looks, reaches for you, or cries', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Smiles or laughs when you play peek-a-boo', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Lifts arms up to be picked up', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Gets to a sitting position by themselves', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Sits without support', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '9-11 months', child_id: childs.dataValues.id },
        { devMilestone: 'Waves “bye-bye”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Calls a parent “mama” or “dada” or another special name', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Understands “no”, i.e., pauses briefly or stops when you say it', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Pulls up to stand', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Drinks from a cup without a lid, as you hold it', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Picks things up between thumb and pointer finger', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '12-14 months', child_id: childs.dataValues.id },
        { devMilestone: 'Copies other children while playing', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Claps when excited', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Shows you affection, i.e., hugs, cuddles, or kisses you', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Looks at a familiar object when you name it', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Tries to use things the right way, like a phone, cup, or book', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Stacks at least two small objects, like blocks', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Takes a few steps on their own', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '15-17 months', child_id: childs.dataValues.id },
        { devMilestone: 'Points to show you something interesting', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Tries to say three or more words besides “mama” or “dada”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Walks without holding on to anyone or anything', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Scribbles', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Drinks from a cup without a lid and may spill sometimes', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Feeds themselves using their fingers', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Tries to use a spoon', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Climbs on and off a couch or chair without help', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '18-23 months', child_id: childs.dataValues.id },
        { devMilestone: 'Notices when others are hurt or upset, i.e., like pausing or looking sad when someone is crying', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Looks at your face to see how to react in a new situation', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Points to at least two body parts when you ask them to show you', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Uses more gestures than just waving and pointing, i.e., like blowing a kiss or nodding yes', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Tries to use switches, knobs, or buttons on a toy', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Runs', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Eats with a spoon', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '24-29 months', child_id: childs.dataValues.id },
        { devMilestone: 'Follows simple routines when told, i.e., like helping to pick up toys when you say, “Time to clean-up.”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Says about 50 words', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Says words like “I,” “me,” or “we”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Uses things to pretend, i.e., like feeding a block to a doll as if it were food', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Shows simple problem-solving skills, i.e., like standing on a small stool to reach something', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Follows two-step instructions, i.e., like “Put the toy down and close the door.”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Jumps off the ground with both feet', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '30-35 months', child_id: childs.dataValues.id },
        { devMilestone: 'Notices other children and joins them to play', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Talks with you in conversation using at least two back-and-forth exchanges', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Asks “who,” “what,” “where,” or “why” questions, i.e., like “Where is mommy/daddy?”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Says first name, when asked', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Talks well enough for others to understand, most of the time', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Puts on some clothes by themselves, like loose pants or a jacket', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Uses a fork', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '36-47 months', child_id: childs.dataValues.id },
        { devMilestone: 'Comforts others who are hurt or sad, like hugging a crying friend', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Likes to be a “helper”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Says sentences with four or more words', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Talks about at least one thing that happened during their day, i.e., like “I played soccer.”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Answers simple questions, i.e., “What is a coat for?” or “What is a crayon for?”', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Tells what comes next in a well-known story', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Catches a large ball most of the time', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Serves themselves food or pours water, with adult supervision', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Unbuttons some buttons', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Holds crayon or pencil between fingers and thumb (not a fist)', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '48-59 months', child_id: childs.dataValues.id },
        { devMilestone: 'Follows rules or takes turns when playing games with other children', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Sings, dances, or acts for you', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Keeps a conversation going with more than three back-and-forth exchanges', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Uses or recognizes simple rhymes (bat-cat, ball-tall)', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Counts to 10', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Names some numbers between 1 and 5 when you point to them', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Writes some letters in their name', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Names some letters when you point to them', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
        { devMilestone: 'Hops on one foot', devMilestone_complete: false, devMilestone_expectedDate: '2022-01-10', devMilestone_expectedRange: '60+ months', child_id: childs.dataValues.id },
      ]
    )

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

    res.render("childid", {
      ...child,
      logged_in: true,
    });

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
