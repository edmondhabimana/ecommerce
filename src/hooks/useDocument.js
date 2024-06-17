import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, document) => {
  //here we getting the document/product detail as an individual
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => { 
    projectFirestore.collection(collection).doc(document).get().then((doc) => {
      if(doc.exists) {
        // console.log('Document data:', doc.data());
        setData({...doc.data(), id: doc.id})
      }else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setError('No such document!')
      }

    })

  }, [document, collection])
  
  return { data, error}
}

