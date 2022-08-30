import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

exports.user = (req, res, next) => {
    res.status(200).json('Hey Go to the user api to access users');
}

exports.user_one = async (req, res, next) => {
try{
    const user = await prisma.user_profile.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
    if(!user){
        res.status(200).send('Cant find user');
    }
    res.send(user);
} catch (e) {
    console.error('>> ERROR OCCURED WHILE FETHCING USER', e);
    res.send('>> SOMETHING WENT WRONG! TRY AGAIN');
}
}



exports.user_many = async (req, res, next) => {
    try{
        const {skip, limit} = req.body;
        //console.log('>> SKIP AND LIMIT: ', skip , limit );
        const skipN = parseInt(skip);
        const limitN = parseInt(limit);
        //console.log('>> SKIPN AND LIMITN: ', skipN , limitN );
        const check = 
            skipN>=0 && limitN >= 0 && limitN <= 100 && limitN != NaN && skipN != NaN?
            true : false;
        if(!check) return res.send('Please provide skip and limit');
        const users = await prisma.$queryRaw`
            SELECT *
            FROM   user_profile
            ORDER  BY username
            OFFSET ${skipN}
            LIMIT  ${limitN}
        `;
        if(!users){
            return res.status(200).send('Cant find users');
        }
        res.send(users);
    } catch (e) {
        console.error('>> ERROR OCCURED WHILE FETHCING USER', e);
        res.send('>> SOMETHING WENT WRONG! TRY AGAIN');
    }
}