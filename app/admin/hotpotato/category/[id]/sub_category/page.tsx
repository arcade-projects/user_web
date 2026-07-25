"use client"

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import RequestService from "@/app/services/RequestService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Trash2 } from "lucide-react";

interface SubCategory {
    id: string,
    title: string,
    category_id: string
}

const AdminHotPotatoPage = () => {

    const { id } = useParams();
    
    const colors = theme.colors;
    
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const { register, handleSubmit, reset } = useForm<SubCategory>();

    useEffect(() => {

        const getSubCategories = async () => {
            const response = new RequestService('/api/v1/category/' + id + '/sub-category');
            const result = await response.get();

            setSubCategories(result);
        }

        getSubCategories();

    }, []);


    const onDeleteSubCategoryHandler = async (sub_category_id: string) => {
        const response = new RequestService('/api/v1/category/' + id + '/sub-category/' + sub_category_id);
        const result = await response.delete();
        setSubCategories(result);
    }
 
    const onSubmitHandler = async (data: SubCategory) => {

        const { title } = data;

        const payload = {
            title: title,
            category_id: id
        }

        const response = new RequestService(`/api/v1/category/${id}/sub-category`);
        const result = await response.post(payload);

        setSubCategories(result);

        reset();
    }

    return (
        <div className={theme.canvas}>
            {/* نورهای پس‌زمینه */}
            <div className={theme.ambientLights.topRed} />
            <div className={theme.ambientLights.bottomCyan} />

            <form onSubmit={handleSubmit(onSubmitHandler)} className={theme.form.wrapper}>
                <div>
                    <label className={theme.form.label}>Title</label>
                    <input
                        {...register('title')}
                        placeholder="Enter title..."
                        className={theme.form.input}
                        autoComplete="off"
                    />
                </div>

                <button type="submit" className={theme.form.submitBtn}>
                    Submit
                </button>
            </form>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full p-4">
                {subCategories && subCategories.map((subCategory, index) => (
                    <div key={subCategory.id || index} className="relative group">
                        <span
                            className={`block p-4 border backdrop-blur-sm rounded-xl font-bold text-center transition-all duration-300 ${colors[index % colors.length]}`}
                        >
                            {subCategory.title}
                        </span>

                        <button
                            onClick={() => onDeleteSubCategoryHandler(subCategory.id)}
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