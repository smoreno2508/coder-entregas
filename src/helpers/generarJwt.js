import jwt from "jsonwebtoken";

const generateJWT = async (user) => {
    const expiresIn = 60 * 60;
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });

    return {
        token: signedToken,
        expires: expiresIn
    };
}

export {
    generateJWT,
}