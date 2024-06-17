import { FC, useEffect, useState } from "react"
import ManagePanel from "./ManagePanel";
import { CategoryI } from "../../types";

interface CategoryItemProps {
    category: CategoryI;
    deleteCategory:(id:number) => void
    renameCategory:(id:number,newName:string) => void
}  

const CategoryItem:FC<CategoryItemProps> = ({category,deleteCategory,renameCategory}) => {
    const [isOpen,setIsOpen] = useState<boolean>(true)
    const [renameMode,setRenameMode] = useState<boolean>(false)
    const [showManageOptions, setShowManageOptions] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState(category.name);
    
    const addSubcategory = () => {
        if (subcategoryName.trim() === '') return;
    
        const newSubcategory: CategoryI = {
          id: Date.now(),
          name: '',
        };
        if(category.subcategories){
            category.subcategories.push(newSubcategory);
        }else{
            category.subcategories = [newSubcategory];
        }        
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            /////RenameFn 
            renameCategory(category.id,subcategoryName)
            setRenameMode(false); 
        }
    };

      useEffect(() => {
        if(subcategoryName == ''){
            setRenameMode(true)
        }
      },[])
      

    return(
        <div key={category.id} className="category-tree__item">
            <div className="category-tree__content">
                {category.subcategories && category.subcategories?.length > 0 && <div onClick={() => setIsOpen(!isOpen)} className={'category-tree__toggle-button'} id={isOpen ?'toggle-button_open':'toggle-button_close'}> <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/forward.png" alt="" /></div>}
               <div className="category-tree__item-title">
                    {showManageOptions &&  <ManagePanel setShowManageOptions={setShowManageOptions} addSubcategory={addSubcategory} deleteCategory={deleteCategory} id={category.id} setRenameMode={setRenameMode} setIsOpen={setIsOpen}/>}  
                    {renameMode ? <input onKeyDown={handleKeyDown}  autoFocus={true} value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} type="text" className="category-tree__item-title-input"/> :  <span onClick={() => setRenameMode(true)}> {category.name} </span> }
               </div>
                <div onClick={() => setShowManageOptions(true)} className="category-tree__manage-btn"> <img src="https://img.icons8.com/ios/FFFFFF/more.png" alt="" /></div>
            </div>
            
            {category.subcategories && isOpen && category.subcategories.map(item =>
                <CategoryItem key={item.id} category={item} deleteCategory={deleteCategory} renameCategory={renameCategory}/>
            )} 
        </div>
    )
}

export default CategoryItem