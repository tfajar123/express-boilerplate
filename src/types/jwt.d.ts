import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    id: number;
    email: string;
    role: string;
}