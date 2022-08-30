"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.user = (req, res, next) => {
    res.status(200).json('Hey Go to the user api to access users');
};
exports.user_one = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user_profile.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!user) {
            res.status(200).send('Cant find user');
        }
        res.send(user);
    }
    catch (e) {
        console.error('>> ERROR OCCURED WHILE FETHCING USER', e);
        res.send('>> SOMETHING WENT WRONG! TRY AGAIN');
    }
});
exports.user_many = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = req.body;
        //console.log('>> SKIP AND LIMIT: ', skip , limit );
        const skipN = parseInt(skip);
        const limitN = parseInt(limit);
        //console.log('>> SKIPN AND LIMITN: ', skipN , limitN );
        const check = skipN >= 0 && limitN >= 0 && limitN <= 100 && limitN != NaN && skipN != NaN ?
            true : false;
        if (!check)
            return res.send('Please provide skip and limit');
        const users = yield prisma.$queryRaw `
            SELECT *
            FROM   user_profile
            ORDER  BY username
            OFFSET ${skipN}
            LIMIT  ${limitN}
        `;
        if (!users) {
            return res.status(200).send('Cant find users');
        }
        res.send(users);
    }
    catch (e) {
        console.error('>> ERROR OCCURED WHILE FETHCING USER', e);
        res.send('>> SOMETHING WENT WRONG! TRY AGAIN');
    }
});
