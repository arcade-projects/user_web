"use client"

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import RequestService from "@/app/services/RequestService";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface Category {
    id: string,
    title: string,
    sub_category: SubCategory[]
}

interface SubCategory {
    id: string,
    title: string,
}

const AdminHotPotatoPage = () => {

    const colors = theme.colors;

    const [category, setCategory] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>();

    const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    useEffect(() => {

        const getCategories = async () => {
            const response = new RequestService('/category');
            const data = await response.get();

            setCategories(data);
        }

        getCategories();

    }, []);

    const onDeleteCategoryHandler = async (id: string) => {
        const response = new RequestService('/category/' + id);
        const data = await response.delete();
        setCategories(data);
    }

    const onCategorySubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            title: category
        }

        const response = new RequestService('/category');
        const data = await response.post(payload);
        setCategories(data);
        setCategory('');
    }

    return (
        <div className={theme.canvas}>

            <div className={theme.ambientLights.topRed} />

            <form onSubmit={onCategorySubmitHandler} className={theme.form.wrapper}>
                <div>
                    <label className={theme.form.label}>
                        Create New Category
                    </label>
                    <input 
                        type="text" 
                        name="category" 
                        placeholder="Enter category title..."
                        onChange={onChangeCategoryHandler} 
                        className={theme.form.input}
                        autoComplete="off"
                    />
                </div>
                
                <button type="submit" className={theme.form.submitBtn}>
                    Create Category
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full p-4">
                {categories && categories.map((category, index) => (
                    <div key={category.id || index} className="relative group">
                        <Link
                            href={`/admin/hotpotato/category/${category.id}/sub_category`}
                            className={`block p-4 border backdrop-blur-sm rounded-xl font-bold text-center transition-all duration-300 ${colors[index % colors.length]}`}
                        >
                            {category.title}
                        </Link>

                        <button
                            onClick={() => onDeleteCategoryHandler(category.id)}
                            className="absolute cursor-pointer top-2 left-2 p-1.5 text-red-500 bg-white/80 dark:bg-gray-800/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 hover:text-white"
                            title="حذف"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminHotPotatoPage;