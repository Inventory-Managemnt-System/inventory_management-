import { React, createContext, useState } from "react";
import axios from "axios";

const ItemRequestContext = createContext();
export default ItemRequestContext;

export const ItemRequestProvider = ({ children }) => {
    const [addItemRequestError, setAddItemRequestError] = useState(null);
    const [addItemRequestIsLoading, setAddItemRequestIsLoading] = useState(true);
    const [addItemRequestResponse, setAddItemRequestResponse] = useState(null);
    const [formData, setFormData] = useState(
        {
            school_name: '',
            head_teacher_name: '',
            item_name: '',
            quantity: '',
            comment: '',
        }
      );

    const handleAddItemRequest = async (e) => {
        e.preventDefault();
        setAddItemRequestIsLoading(true);
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
      
        const RequestData = {
            school_name: formData.school_name,
            head_teacher_name: formData.head_teacher_name,
            item_name: formData.item_name,
            quantity: formData.quantity,
            comment: formData.comment,
        };
        try {
          const result = await axios.post(`${baseUrl}/api/item-request`, RequestData);
          console.log(result.data)
          setAddItemRequestResponse(result.data);
        } catch (error) {
          console.log(error)
            setAddItemRequestError(error.response.data.message);
        } finally {
            setAddItemRequestIsLoading(false);
        }
      };


  let contextData = {
    handleAddItemRequest: handleAddItemRequest,
    setAddItemRequestResponse: setAddItemRequestResponse,
    setAddItemRequestError: setAddItemRequestError,
    setFormData: setFormData,

    addItemRequestResponse: addItemRequestResponse,
    addItemRequestError: addItemRequestError,
    addItemRequestIsLoading: addItemRequestIsLoading,
    formData: formData,
  };
  return (
    <ItemRequestContext.Provider value={contextData}>
      {children}
    </ItemRequestContext.Provider>
  );
};
