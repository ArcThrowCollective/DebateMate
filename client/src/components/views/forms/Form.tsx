import './Form.css';
import { IoMdSend } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { CreateChannel } from './channelForm/CreateChannel';
import { CreateTopic } from './topicForm/CreateTopic';
import { handleFormSubmit } from '../../../utils/handleFormSubmit';
import { useState } from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'signup' | 'login' | 'channel' | 'topic';
  title?: string;
}

export const Form: React.FC<FormProps> = ({ type, title, ...props }) => {
  const formTitles: Record<FormProps['type'], string> = {
    signup: 'Sign Up',
    login: 'Login',
    channel: 'Create a Channel',
    topic: 'Create a Topic',
  };

  const [minRating, setMinRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const extraData: Record<string, any> = { formType: type };
    if (type === 'topic') {
      extraData.minRating = minRating;
    }

    handleFormSubmit(e, extraData);
  };

  return (
    <form id="form__container" onSubmit={handleSubmit} {...props}>
      <IoCloseCircle id="closeForm" />
      <h1 id="formTitle">{title || formTitles[type]}</h1>

      {(type === 'signup' || type === 'login') && (
        <>
          {type === 'signup' && (
            <div className="input-container">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
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
