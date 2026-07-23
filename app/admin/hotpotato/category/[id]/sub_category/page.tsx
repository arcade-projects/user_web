"use client"

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import RequestService from "@/app/services/RequestService";
import React, { useEffect, useState } from "react";

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

    const [category, setCategory] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [subCategory, setSubCategory] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>();

    const addCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    }

    const addSubCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubCategory(e.target.value);
    }

    useEffect(() => {

        const getCategories = async () => {
            const response = new RequestService('/category');
            const data = await response.get();

            setCategories(data);
        }

        getCategories();

    }, []);

    const onCategorySubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            title: category
        }

        const response = new RequestService('/category');
        response.post(payload);
    }

    const onSubCategorySubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            category_id: selectedCategoryId,
            title: subCategory
        }

        const response = new RequestService('/sub-category');
        response.post(payload);
    }

    return (
        <div className={theme.canvas}>
            {/* نورهای محیطی نئونی پس‌زمینه */}
            <div className={theme.ambientLights.topRed} />
            <div className={theme.ambientLights.bottomCyan} />

            {/* هدر بخش فرم‌ها (اختیاری - در صورت نیاز می‌توانید عنوان را تغییر دهید) */}
            <div className="text-center mb-10 z-10">
                <h2 className={theme.header.title}>Manage Categories</h2>
                <div className={theme.header.divider}></div>
                <p className={theme.header.subtitle}>Create and organize your categories and subcategories</p>
            </div>

            {/* کانتینر فرم‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
                
                {/* فرم اول: دسته بندی اصلی */}
                <div className={`${theme.card.wrapper} border-red-500/20 hover:border-red-500/40 shadow-lg shadow-red-950/20`}>
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={theme.card.icon}>📁</span>
                            <div>
                                <h3 className={theme.card.enTitle}>Main Category</h3>
                                <p className={theme.card.faTitle}>دسته بندی اصلی</p>
                            </div>
                        </div>
                        
                        <p className={theme.card.description}>Add a new primary category to your system.</p>

                        <form onSubmit={onCategorySubmitHandler} className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category Title</label>
                                <input 
                                    type="text" 
                                    onChange={addCategoryHandler} 
                                    placeholder="e.g. Technology"
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60 transition-all text-sm"
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-950/40 active:scale-[0.98]"
                            >
                                Submit Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* فرم دوم: زیر دسته بندی */}
                <div className={`${theme.card.wrapper} border-cyan-500/20 hover:border-cyan-500/40 shadow-lg shadow-cyan-950/20`}>
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={theme.card.icon}>🌿</span>
                            <div>
                                <h3 className={theme.card.enTitle}>Sub Category</h3>
                                <p className={theme.card.faTitle}>زیر دسته بندی</p>
                            </div>
                        </div>
                        
                        <p className={theme.card.description}>Create a subcategory and assign it to a parent.</p>

                        <form onSubmit={onSubCategorySubmitHandler} className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subcategory Title</label>
                                <input 
                                    type="text" 
                                    onChange={addSubCategoryHandler} 
                                    placeholder="e.g. Smartphones"
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parent Category</label>
                                <select 
                                    value={selectedCategoryId} 
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="bg-slate-950 text-slate-500">Select a category...</option>
                                    {categories && categories.map((category) => (
                                        <option key={category.id} value={category.id} className="bg-slate-900 text-slate-100">
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-950/40 active:scale-[0.98]"
                            >
                                Submit Subcategory
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminHotPotatoPage;