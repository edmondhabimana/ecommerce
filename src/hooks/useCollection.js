import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"


export const useCollection = (_collection) => {
  //Here we get all the documents
  const [ collection, setCollection ] = useState([])

  useEffect(() => {
    projectFirestore.collection(_collection).onSnapshot((querySnapshot) => {
      let results = []
      querySnapshot.forEach((doc) => {
          results.push({...doc.data(), id: doc.id})
      })
      setCollection(results)
    })
  }, [_collection])

  return {collection}
}