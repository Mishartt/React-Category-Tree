import './CategoryTree.scss'
import { useState } from 'react'
import CategoryItem from './CategoryItem'
import { CategoryI } from '../../types'



const CategoryTree = () => {
    const [categories,setCategories] = useState<CategoryI[]>([
        {
          "id": 1,
          "name": "Electronics",
          "subcategories": [
            {
              "id": 2,
              "name": "Mobile Phones",
              "subcategories": [
                {
                  "id": 3,
                  "name": "Smartphones",
                },
                {
                  "id": 4,
                  "name": "Feature Phones",
                }
              ]
            },
            {
              "id": 5,
              "name": "Laptops",
              "subcategories": [
                {
                  "id": 6,
                  "name": "Gaming Laptops",
                },
                {
                  "id": 7,
                  "name": "Ultrabooks",
                }
              ]
            }
            ],
          },
          {"id": 11,
          "name": "Food",
          "subcategories": [
            {
              "id": 12,
              "name": "Meat",
              "subcategories": [
                {
                  "id": 23,
                  "name": "Beef",
                },
                {
                  "id": 24,
                  "name": "Chicken",
                }
              ]},
           ]
          }
        ]
      
      )


      const deleteCategory = (id:number) => {
        const deleteCategoryRecursive = (categories: CategoryI[]): CategoryI[] => {
             return categories ? categories.filter(categoy => categoy.id !== id).map(item => 
               ({...item, subcategories: deleteCategoryRecursive(item.subcategories as any)})
             ):[]
            }
            setCategories(deleteCategoryRecursive(categories))
      }

      const renameCategory = (id: number, newName: string) => {
        const renameCategoryRecursive = (categories: CategoryI[]): CategoryI[] => {
          return categories ? categories.map(item => {
            if (item.id === id) {
              console.log('same')
              return { ...item, name: newName };
            }
            return { ...item, subcategories: renameCategoryRecursive(item.subcategories as any) };
          }):[]
        };
    
        setCategories(prevCategories => renameCategoryRecursive(prevCategories));
      };

    return(
        <div onClick={() => console.log(categories)} className="category-tree">
            <div className="category-tree__container">
                <h1>Category List</h1>
                    {categories.map((item ) => 
                    <>
                      <CategoryItem key={item.id} category={item} deleteCategory={deleteCategory} renameCategory={renameCategory}/>
                      <br />
                    </>
                    )}
            </div>
        </div>
    )
}

export default CategoryTree