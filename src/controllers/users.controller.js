import {User} from '../models/user.js';
import {Task} from '../models/task.js';
import {Status} from '../constants/index.js';
import logger from '../logs/logger.js';
import { encriptar } from '../common/bcrypt.js';
async function getUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password','status'],
            order: [['id', 'ASC']],
            where: {
                status:Status.ACTIVE
            },
        });
        res.json(users);
    } catch (error) {
        next(error);
    }
}
async function createUser(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res,next){
    const {id} = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username','password','status'],
            where: {
                id,
            }
        });
        if(!user) res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res,next) {
    const {id} = req.params;
    const { username, password } = req.body;
    try {
        if(!username && !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // const passwordEncriptado = await encriptar(password);
        const user = await User.update(
            { username, password },
            {
                where: { id },
                individualHooks: true
            },
        );
        res.json(user);
    } catch (error) {
        next(error);
    }   
}

async function deleteUser(req, res,next) {
    const {id} = req.params;
    try {
        const user = await User.destroy({
            where: { id }
        });
        if(!user) return res.status(404).json({message: 'User not found'});
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        next(error);
    }
}

async function activateInactive(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if(!status)res.status(400).json({ message: 'Status is required' });

        const user = await User.findByPk(id);

        if (!user) res.status(404).json({ message: 'User not found' });

        if (user.status === status) res.status(409).json({ message: 'Same status' });
        
        user.status = status;

        await user.save();      
        res.json(user);
    }
    catch (error) {
        next(error);
    }}
async function getTasks(req,res, next) {
    const {id} = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            include: [{
                model: Task,
                attributes: ['name', 'done'],
                where: {
                    done:false
                }
            }],
            where: {
                id,
            }
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
}
export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    activateInactive,
    getTasks
};