import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generate } from 'otp-generator';
import {NodemailerService, MailSender} from './mailService';
import { SENDER_MAIL, RESET_PASSWORD_TOKEN_SECRET, MAX_DURATION_BORROW_DAYS } from './config';
import { IUser } from '@/contracts/user';
import * as sms from './sms';

export const usernameFromEmail = (email : string) => {
    if(!email.includes('@')) throw new Error('Invalid email');
    return email.split('@')[0];
}

export const comparePassword = async (password :string, hashedPassword :string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateAuthToken = async (user : IUser, secret :string, expiresIn :string) => {
    const token = jwt.sign({ id : user.id }, secret, { expiresIn: expiresIn });
    return token;
}


export const generateResetPasswordToken = async (user : IUser) => {
    const resetPasswordToken = await jwt.sign({ id : user.id }, RESET_PASSWORD_TOKEN_SECRET, { expiresIn: '1h' });
    return resetPasswordToken;
}

export const decodeResetPasswordToken = async (token : string) => {
    const decoded = await jwt.verify(token, RESET_PASSWORD_TOKEN_SECRET);
    const { _id } = decoded as { _id : string };
    return _id;
}


//OTP Methods
export const generateOTP = () : string => {
    return generate(6, { digits:true, upperCaseAlphabets: false, specialChars: false});
}

export const sendVerificationEmail = async (email : string, otp : string) : Promise<Object> => {
    const nodeMailerService = new NodemailerService();
    const mailSender = new MailSender(nodeMailerService);
    const subject = "OTP for email verification";
    const text = `<h1>Verification OTP</h1><p>Your OTP for email verification is :</p> <h4>${otp}</h4>`;
    const from = SENDER_MAIL;
    try{
        return await mailSender.sendMail(from, email, subject, text);
    }
    catch(err){
        throw new Error('Error while sending email');
    }
}

export const sendGenericEmail = async (email : string, subject : string, text : string) : Promise<Object> => {
    const nodeMailerService = new NodemailerService();
    const mailSender = new MailSender(nodeMailerService);
    const from = SENDER_MAIL;
    try{
        return await mailSender.sendMail(from, email, subject, text);
    }
    catch(err){
        throw new Error('Error while sending email');
    }
}


export const sendToMobile = async (phone : string, otp : string) => {
    const finalMessage :string = `Hello, valued customer, Here's you private OTP: \n\t ${otp}`;
    return await sms.sendSMS(sms.defaultClient, phone, finalMessage);
}


export const getParameterClause = (query : {}, defaultOperator : string = 'AND') : {parameterClause: string, valuesArr: never[]} => {
    const keys = Object.keys(query);
    const parameterClause = keys.map((key, index) => {
        return `${key} = $${index + 1}`;
    }).join(` ${defaultOperator} `);
    return {parameterClause: parameterClause, valuesArr: Object.values(query)};
}

export const getInsertStr = (data : {}) : {insertStr: string, valuesArr: never[]} => {
    const keys = Object.keys(data);
    const insertStr = `(${keys.join(', ')}) VALUES (${keys.map((key, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
    return {insertStr: insertStr, valuesArr: Object.values(data)};
}

export const isValidDueDate = (dueDate : string) => {
    // example dueDate format: '2021-12-31'
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= MAX_DURATION_BORROW_DAYS;
}