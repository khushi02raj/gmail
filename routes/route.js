import express from 'express';
import { deleteEmails, getEmails, moveEmailsToBin, saveSentEmails, toggleStarredEmails } from '../controllers/email-controller.js';

const  routes=express.Router();
routes.post('/save',saveSentEmails)
routes.get('/emails/:type',getEmails);
routes.post('/save-draft',saveSentEmails);
routes.post('/bin',moveEmailsToBin);
routes.post('/starred',toggleStarredEmails);
routes.delete('/delete',deleteEmails);

export default routes;