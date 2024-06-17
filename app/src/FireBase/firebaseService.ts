import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc,} from "firebase/firestore"; 
import { CategoryI } from './../types';

export const saveCategoryTree = async (categories: CategoryI[]): Promise<boolean> => {
    console.log('saveCategoryTree');
    try {
      const categoryCollection = collection(db, "categories");
      const promises = categories.map(async (category) => {
        console.log('start');
        const resp = await addDoc(categoryCollection, category);
        console.log(resp.id);
        return resp.id ? false : true;
      });
      const results = await Promise.all(promises);
      return results.every(result => result === false);
    } catch (error) {
      console.error("Error adding categories: ", error);
      return false;
    }
  };
  

export const loadCategoryTree = async (): Promise<CategoryI[]> => {
  try {
    const categoryCollection = collection(db, "categories");
    const categorySnapshot = await getDocs(categoryCollection);
    const categoryList: CategoryI[] = categorySnapshot.docs.map(doc => doc.data() as CategoryI);
    return categoryList;
  } catch (error) {
    console.error("Error loading categories: ", error);
    return [];
  }
};


