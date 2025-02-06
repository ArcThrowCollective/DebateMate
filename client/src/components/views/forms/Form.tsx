import './Form.css';
import { IoMdSend } from 'react-icons/io';
import { CreateChannel } from './channelForm/CreateChannel';
import { CreateTopic } from './topicForm/CreateTopic';
import { handleFormSubmit } from '../../../utils/handleFormSubmit';
import { useState } from 'react';
import { submitFormData } from '../../../services/API.Service';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'signup' | 'login' | 'channel' | 'topic' | 'vote';
  title?: string;
  onClose: () => void;
}

export const Form: React.FC<FormProps> = ({
  type,
  title,
  onClose,
  ...props
}) => {
  const formTitles: Record<FormProps['type'], string> = {
    signup: 'Sign Up',
    login: 'Login',
    channel: 'Create a Channel',
    topic: 'Create a Topic',
    vote: 'vote',
  };

  const [minRating, setMinRating] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<{ channelURL?: string }>({});
  const [topicData, setTopicData] = useState<{ imageUrl?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // clear errors

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extraData: Record<string, any> = { formType: type };
    if (type === 'topic') {
      extraData.minRating = minRating;
      extraData.imageUrl = topicData.imageUrl;
    }
    if (type === 'channel' && channelData.channelURL) {
      extraData.channelURL = channelData.channelURL; // Use uploaded image URL instead of file
    }

    const formData = await handleFormSubmit(e, extraData);

    delete formData.topicImage;
    delete formData.channelBanner;

    try {
      const response = await submitFormData(type, formData);
      console.log('Submission successful:', response);
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <form id="form__container" onSubmit={handleSubmit} {...props}>
      <h1 id="formTitle">{title || formTitles[type]}</h1>
      {error && <p className="error-message">{error}</p>}
      {(type === 'signup' || type === 'login') && (
        <>
          {type === 'signup' && (
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                required
              />
            </div>
          )}
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
        </>
      )}

      {type === 'channel' && <CreateChannel setChannelData={setChannelData} />}
      {type === 'topic' && (
        <CreateTopic setMinRating={setMinRating} setTopicData={setTopicData} />
      )}

      <div className="input-container">
        <button className="btn" type="submit">
          {type === 'topic' ? 'Start Topic' : 'Submit'}
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};
