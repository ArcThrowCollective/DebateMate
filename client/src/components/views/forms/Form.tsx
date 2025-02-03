import './Form.css';
import { IoMdSend } from 'react-icons/io';
import { CreateChannel } from './channelForm/CreateChannel';
import { CreateTopic } from './topicForm/CreateTopic';
import { handleFormSubmit } from '../../../utils/handleFormSubmit';
import { useState } from 'react';
import { submitFormData } from '../../../services/API.Service';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'signup' | 'login' | 'channel' | 'topic';
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
  };

  const [minRating, setMinRating] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // clear errors

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extraData: Record<string, any> = { formType: type };
    if (type === 'topic') {
      extraData.minRating = minRating;
    }

    const formData = handleFormSubmit(e, extraData);

    try {
      const response = await submitFormData(type, formData);
      console.log('Submission successful:', response);
      onClose();
    } catch (error) {
      console.error('❌ Submission failed:', error);
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
<<<<<<< HEAD
                name="name"
                placeholder="Enter name"
=======
                name="username"
                placeholder="Enter a username"
>>>>>>> 41c665d404bb1604eb3d3142677e0e84265aec7b
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

      {type === 'channel' && <CreateChannel />}
      {type === 'topic' && <CreateTopic setMinRating={setMinRating} />}

      <div className="input-container">
        <button className="btn" type="submit">
          {type === 'topic' ? 'Start Topic' : 'Submit'}
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};
