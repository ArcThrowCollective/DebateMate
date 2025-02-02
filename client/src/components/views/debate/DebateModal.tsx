import { useDispatch } from 'react-redux';
import { navigateToDebateScreen } from '../../../state/navigation/navigationSlice';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const DebateModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    const user = 'Test';
    const roomId = Math.floor(Math.random() * 100000);
    //navigate(`/debate?username=${username + id}&id=${id}`);
    dispatch(navigateToDebateScreen({ user, roomId }));
  };
  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Join Debate</h2>
            <p className="mb-4">Are you sure you want to join the Debate</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebateModal;
