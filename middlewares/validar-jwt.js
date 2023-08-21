const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJwt = ( req, res = response, netx ) => {


    const token = req.header("x-token");

    if( !token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid, name} =  jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }


    netx();



}

module.exports = {
    validarJwt
}