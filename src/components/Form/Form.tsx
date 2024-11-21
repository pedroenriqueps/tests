"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormDataRegister {
    username: string;
    password: string;
}

const schema = z.object({
    username: z.string().min(3, { message: "O número mínimo para usuário é 3" }).nonempty({ message: "O nome de usuário é obrigatório" }),
    password: z.string().min(6, { message: "O número mínimo para senha é 6" }).nonempty({ message: "A senha é obrigatória" }),
});

export function RegisterUserForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormDataRegister) => {
        const response = await fetch("/api/create-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Usuário criado com sucesso!", result);
        } else {
            console.error("Erro ao criar usuário", result.message);
        }
    };

    return (
        <div className="w-full max-w-[40%] mx-auto mt-10">
            <h1 className="title1">Zod form</h1>
            <form className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    {Object.keys(errors).length > 0 && (
                        <div className="border-l-4 bg-red-100 border-red-500 text-red-700 p-3 mb-4">
                            <ul className="font-mono text-sm font-semibold">
                                {errors.username && <li>{errors.username.message}</li>}
                                {errors.password && <li>{errors.password.message}</li>}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-500 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 leading-tight focus:border-2 focus:border-white outline-none bg-transparent focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-500 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 mb-3 placeholder:text-gray-600 bg-transparent leading-tight focus:border-2 focus:border-white outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                        type="password"
                        placeholder="***************"
                        {...register('password')}
                    />
                </div>

                <div className="flex flex-col items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Entrar
                    </button>
                    <div className="mt-4">
                        <span className="text-gray-500 text-base">não tem conta?</span> <Link href="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Clique aqui</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
