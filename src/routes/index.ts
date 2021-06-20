import { Router } from 'express';
import { AuthAPIs } from '@shared/auth';

// Account
import {
    AddOneAccount,
    GetListAccount,
    Login,
    Logout,
    CheckTokenUser
} from './account';



// Account-route
const accountRouter = Router();
accountRouter.post('/create', AddOneAccount)
accountRouter.get('/list', AuthAPIs, GetListAccount)
accountRouter.post('/login', Login)
accountRouter.get('/logout', AuthAPIs, Logout)
accountRouter.get('/check-token', AuthAPIs, CheckTokenUser)




// Export the base-router
const baseRouter = Router();
baseRouter.use('/account', accountRouter);




export default baseRouter;
