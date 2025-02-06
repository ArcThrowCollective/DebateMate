/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { createChannel } from '../utils/graphqlclient';

const URL = 'http://127.0.0.1:3000';

type ChannelType = {
  // Remove any Type from Record<string, any>
  channelName: string;
  description: string;
  formType: string;
};

// function to submit any form data to the API
export const submitFormData = async (
  formType: string,
  formData: Record<string, any>
) => {
  try {
    if (formType === 'channel') {
      console.log('this is API.Service', formData);
      const newChannel: ChannelType = {
        channelName: formData.channelName as string,
        description: formData.description as string,
        formType: formData.formType as string,
      };
      const newChannelCreated = await createNewChannel(newChannel);
      console.log('this is new Channel created', newChannelCreated);
      return;
    }
    const response = await axios.post(`${URL}/${formType}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // store the cookie information for authentication
    });
    console.log(`Form submited successfully:`, response.data);
    return response.data; // Return API response
  } catch (error) {
    console.error(`Error submitting ${formType} form:`, error);
    throw error;
  }
};

// Create a new Channel
const createNewChannel = async (formData: ChannelType) => {
  const authStatus = await axios.get('http://127.0.0.1:3000/auth/status', {
    withCredentials: true,
  });
  console.log(authStatus);
  if (authStatus.data.isAuthenticated) {
    try {
      const data = {
        name: formData.channelName,
        description: formData.description,
        isPublic: false,
        userId: authStatus.data.user?.id || '',
      };
      const channelCreated = await createChannel(
        data.name,
        data.description,
        data.isPublic,
        data.userId
      );

      console.log('adfafddfa:', channelCreated);

      if (!channelCreated) {
        throw new Error('Couldnt create new Channel!');
      }
      return channelCreated;
    } catch (error) {
      console.error('Couldnt create new Channel!');
      return null;
    }
  } else {
    alert('Please LogIn first!');
    return null;
  }
};
