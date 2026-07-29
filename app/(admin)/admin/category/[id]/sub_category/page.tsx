"use client"

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import RequestService from "@/app/services/RequestService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Trash2 } from "lucide-react";
import { SubCategoryInterface } from "@/app/interfaces/ICategory";
import Cookies from "universal-cookie";

const AdminHotPotatoPage = () => {

    const cookies = new Cookies(null, { path: '/' });

    const { id } = useParams();
    
    const colors = theme.colors;
    
    const [subCategories, setSubCategories] = useState<SubCategoryInterface[]>([]);

    const { register, handleSubmit, reset } = useForm<SubCategoryInterface>();

    useEffect(() => {

        const getSubCategories = async () => {
            const response = new RequestService('/api/v1/categories/' + id + '/sub-categories');
            const result = await response.get();

            setSubCategories(result);
        }

        getSubCategories();

    }, []);


    const onDeleteSubCategoryHandler = async (sub_category_id: string) => {
        const response = new RequestService('/api/v1/categories/' + id + '/sub-categories/' + sub_category_id);
        const result = await response.delete();
        setSubCategories(result);
    }
 
    const onSubmitHandler = async (data: SubCategoryInterface) => {

        const { name } = data;

        const payload = {
            category_id: id,
            translations: [
                {
                    locale: cookies.get('lang') || 'en',
                    name: name
                }
            ]
        }

        const response = new RequestService(`/api/v1/categories/${id}/sub-categories`);
        const result = await response.post(payload);

        setSubCategories(result);

        reset();
    }

    return (
        <div className={theme.canvas}>
            <div className={theme.ambientLights.topRed} />
            <div className={theme.ambientLights.bottomCyan} />

            <form onSubmit={handleSubmit(onSubmitHandler)} className={theme.form.wrapper}>
                <div>
                    <label className={theme.form.label}>Title</label>
                    <input
                        {...register('name')}
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
                            {subCategory.name}
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