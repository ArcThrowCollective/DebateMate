import { useState } from 'react';
import { StarRating } from '../../../UI/starRating/StarRating';

interface CreateTopicProps {
  setMinRating: (rating: number) => void;
  setTopicData: (data: { imageUrl?: string }) => void;
}

export const CreateTopic: React.FC<CreateTopicProps> = ({
  setMinRating,
  setTopicData,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', '55debate');
    data.append('cloud_name', 'dgk8lodnt');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dgk8lodnt/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const uploadImageURL = await res.json();
      const uploadedURL = uploadImageURL.secure_url;
      setImageUrl(uploadedURL);

      // Send the uploaded image URL to the parent form component
      setTopicData({ imageUrl: uploadedURL });
    } catch (error) {
      console.error('❌ Image upload failed:', error);
    }
  };

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

      {/* Upload topic image */}
      <div>
        <p className="file-info">Upload an image for the topic</p>
        <div className="input-container">
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
        {imageUrl && <p>✅ Image uploaded successfully!</p>}
      </div>

      <label>
        <input type="checkbox" name="confirmTopic" required /> I confirm the
        topic creation
      </label>
    </>
  );
};
