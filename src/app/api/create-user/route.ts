// essa é uma rota simples integrada ao nextjs

import { NextRequest, NextResponse } from "next/server";

let usersDb: { username: string; password: string }[] = [];

export async function POST(request: NextRequest) {
    try {
        const userData = await request.json();
        const { username, password } = userData;

        if (!username || !password) {
            return new NextResponse(JSON.stringify({ message: "Usuário ou senha vazios" }), { status: 400 });
        }

        const userExists = usersDb.some((user) => user.username === username);
        if (userExists) {
            return new NextResponse(JSON.stringify({ message: "Usuário já existe" }), { status: 409 });
        }

        usersDb.push({ username, password });

        // crie um cookie e o token jwt aqui...

        return new NextResponse(JSON.stringify({ message: "Usuário criado com sucesso" }), { status: 201 });

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Houve um erro interno do servidor" }), { status: 500 });
    }
}
