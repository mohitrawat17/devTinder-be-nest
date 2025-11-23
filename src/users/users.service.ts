import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Mohit Rawat",
            role: "admin",
            email: "mohit@example.com"
        },
        {
            id: 2,
            name: "Aarav Sharma",
            role: "user",
            email: "aarav@example.com"
        },
        {
            id: 3,
            name: "Priya Verma",
            role: "user",
            email: "priya@example.com"
        },
        {
            id: 4,
            name: "Rohan Gupta",
            role: "admin",
            email: "rohan@example.com"
        },
        {
            id: 5,
            name: "Neha Singh",
            role: "user",
            email: "neha@example.com"
        }
    ];

    private findAll(page,limit) {
        
    }

}
