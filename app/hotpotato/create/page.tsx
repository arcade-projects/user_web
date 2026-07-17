"use client";

import RequestService from "@/app/services/RequestService";
import Link from "next/link";
import { useEffect, useState } from "react";

const HotPotatoCreatePage = () => {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(String);
    const [minutes, setMinutes] = useState(Number);
    const [room, setRoom] = useState<{id: String, pincode: number}>({ id: '', pincode: 0 });

    useEffect(() => {

        const getCategories = async () => {
            const response = new RequestService('/category');
            const data = await response.get();

            setCategories(data);
        }

        getCategories();

    }, []);

    const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    }
    
    const onChangeTimerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(Number(e.target.value));
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const payload = {
            category_id: categoryId,
            minutes: minutes
        };

        const response = new RequestService('/room');
        const data = await response.post(payload);
        setRoom(data);
    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <select
                    value={categoryId}
                    onChange={onChangeCategoryHandler}
                >
                    {categories && categories.map((category: {id: string, title: string}) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.title}
                        </option>
                    ))}
                </select>

                <input 
                    type="number" 
                    min='1' 
                    placeholder="minute" 
                    name="timer"
                    onChange={onChangeTimerHandler}
                />

                <button type="submit">Submit</button>
            </form>

            <Link href='/hotpotato/join'>Join</Link>
        </>
    );
}

export default HotPotatoCreatePage;