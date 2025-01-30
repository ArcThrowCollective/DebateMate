import { StarRating } from '../../../UI/starRating/StarRating';

interface CreateTopicProps {
  setMinRating: (rating: number) => void;
}

export const CreateTopic: React.FC<CreateTopicProps> = ({ setMinRating }) => {
  return (
    <>
      <div className="input-container">
        <input
          type="text"
          name="topicTitle"
          placeholder="Enter topic title (max 10 words)"
          maxLength={80}
          required
        />
      </div>

      <div className="input-container">
        <textarea
          name="topicDescription"
          placeholder="Enter a short description (max 25 words)"
          maxLength={150}
          required
        />
      </div>

      <div id="speaker__rating">
        <label>Minimum speaker rating:</label>
        <StarRating onChange={(rating) => setMinRating(rating)} />
      </div>

      <div className="input-container">
        <input
          type="text"
          name="moderator"
          placeholder="Enter a moderator (@user345)"
        />
      </div>

      <label>
        <input type="checkbox" name="confirmTopic" required /> I confirm the
        topic creation
      </label>
    </>
  );
};
