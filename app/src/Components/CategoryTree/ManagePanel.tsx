import { FC } from "react"

interface ManagePanelProps{
    addSubcategory: () => void 
    setRenameMode: (status:boolean) => void 
    deleteCategory: (id:number) => void
    setShowManageOptions:(status:boolean) => void
    setIsOpen : (status:boolean) => void
    id:number
}

const ManagePanel:FC<ManagePanelProps> = ({addSubcategory,deleteCategory,setRenameMode,id,setShowManageOptions,setIsOpen}) => {
    return(
        <div onMouseLeave={() => setShowManageOptions(false)} onClick={() =>setShowManageOptions(false)} className="category-tree__manage-container">
            <div onClick={() => setShowManageOptions(false)} className="category-tree__manage-close-btn">x</div>
            <div onClick={() => {addSubcategory();setIsOpen(true)}} className="category-tree__manage-option">Add subtask</div>
            <div onClick={() => setRenameMode(true)} className="category-tree__manage-option">Rename category</div>
            <div onClick={() => deleteCategory(id)} className="category-tree__manage-option">Delete category</div>
        </div>
    )
}

    

export default ManagePanel