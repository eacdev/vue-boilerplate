import { Router } from 'express';
import * as serverController from './server.controller';
import * as messageController from '../message/message.controller';

const router = Router();

router.get('/', serverController.index);
router.post('/', serverController.create);
router.get('/:serverId/messages', messageController.index);

export default router;
