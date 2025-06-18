import bcrypt from 'bcrypt';
import config from '../config/env.js';
import logger from '../logs/logger.js';

export const encriptar = async(text)=>{
    try {
        const salt = config.BCRYPT_SALT_ROUNDS; // Default to 10 if not set
        const hash = await bcrypt.hash(text, salt);
        return hash;
    } catch (error) {
        logger.error('Error al encriptar:', error);
        throw new Error('Error al encriptar');
    }
}

export const comparar = async(text, hash)=>{
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.error('Error al comparar:', error);
        throw new Error('Error al comparar');
    }
}