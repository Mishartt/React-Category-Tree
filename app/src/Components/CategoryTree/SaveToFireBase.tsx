import { FC, useState } from "react"
import { CategoryI } from "../../types"
import { saveCategoryTree } from "../../FireBase/firebaseService"

interface SaveToFireBaseProps {
    categories:CategoryI[]
}

const SaveToFireBase:FC<SaveToFireBaseProps> = ({categories}) => {
    const [isLoading,setIsLoading] = useState(false)
    const saveToDb = async() => {
        setIsLoading(true)
        if(await saveCategoryTree(categories)){
            setIsLoading(false)
        }
    }
    return(
        <div onClick={() => saveToDb()} className="category-tree-firebase">
        <img  src="https://img.icons8.com/color/48/firebase.png" alt=""/>
       {!isLoading ?  <p>Save to firebase</p>: <p>Loading</p>}
      </div>
    )
}

export default SaveToFireBase