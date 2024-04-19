const crypto = require('crypto');

export const random =()=>crypto.randomBytes(128).toString('base64');//gener random byte dlinni 128 pereobrazyem v raydok kodirovkoy 'base64'
export const authentication = (salt:string, password:string)=>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(process.env.SECRET).digest('hex')
};//sozdaem hesh authentification sozdaem obektHmac s algoritmom sha256 obedenyaem parolb i solb i obrabativem kobinatsiy s secret key i polychaem konec4niy hex 