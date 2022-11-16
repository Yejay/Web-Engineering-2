const express = require('express');
const router = express.Router();
const userService = require('./UserService');

router.get('/', async (req, res) => {
    const users = await userService.getUsers(req, res);
    res.status(200).send(users);
});

router.get('/:userID', (req, res) => {
    const userId = req.params['userID'];
    userService.findUserBy(userId, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'User with specified user ID not found!' });
        }
    });
});

router.put('/:userID', async (req, res) => {
    const userId = req.params['userID'];
    const toBeUpdated = req.body;
    userService.updateFirstAndLastName(toBeUpdated, userId, (result, error) => {
        if (result) {
            res.status(200).json(result);
        } else {
            if (error) {
                res.status(404).json(error);
            }
        }
    });
});

router.post('/', (req, res) => {
    const user = req.body;

    userService.registerUser(user, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            if (error) {
                res.status(400).json(error);
            }
        }
    });
});

router.delete('/:userID', async (req, res) => {
    const userId = req.params['userID'];
    await userService.deleteUser(userId, (result, error) => {
        if (result) {
            res.status(204).json(`User with ID: (${userId}) was successfully deleted.`);
            console.log(`User with ID: (${userId}) was successfully deleted.`);
        } else {
            res.status(404).json(error);
        }
    });
});

module.exports = router;
