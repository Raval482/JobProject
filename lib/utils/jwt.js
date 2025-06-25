

import { SignJWT, jwtVerify } from 'jose'


const secrateKey = new TextEncoder().encode("raval") 

export async function generateToken(payload){
    console.log("--------------", payload)
    return await new SignJWT(payload)
    .setProtectedHeader({alg : 'HS256'})
    .setIssuedAt() 
    .setExpirationTime('2h')
    .sign(secrateKey)
}


export async function verifyToken(token){
        try{
            const {payload} = await jwtVerify(token,secrateKey)
            return payload

        }catch(error){
            console.log(error.message)
        }
}