
export interface CategoryInterface {
    id: string,
    name: string
    activate: boolean
}

export interface SubCategoryInterface {
    id: string,
    name: string,
    category_id: string
}