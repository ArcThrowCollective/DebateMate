import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import 'ldrs/ring';

export const Loader = () => {
  const load = useSelector((state: RootState) => state.loader.value);

  return (
    <>
      {load && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <l-ring size="60" color="coral"></l-ring>
        </div>
      )}
    </>
  );
};
