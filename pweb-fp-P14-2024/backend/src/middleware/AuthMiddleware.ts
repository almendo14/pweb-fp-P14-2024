import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Ekstensi tipe Request untuk menambahkan properti user
interface CustomRequest extends Request {
    user?: any; // Anda bisa mengganti 'any' dengan tipe yang lebih spesifik jika diperlukan
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });

        req.user = decoded; // Simpan informasi pengguna di req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};