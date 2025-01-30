/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const URL = 'http://127.0.0.1:3000';

// function to submit any form data to the API
export const submitFormData = async (
  formType: string,
  formData: Record<string, any>
) => {
  try {
    const response = await axios.post(`${URL}/form/${formType}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`Form submited successfully:`, response.data);
    return response.data; // Return API response
  } catch (error) {
    console.error(`Error submitting ${formType} form:`, error);
    throw error;
  }
};
