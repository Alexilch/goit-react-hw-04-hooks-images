import PropTypes from 'prop-types';
import s from './NotFound.module.css';

export default function NotFound({ onError }) {
  return (
    <div className={s.notfoundwrapper}>
      <h1>{onError}</h1>
    </div>
  );
}
NotFound.propTypes = {
  errorMessage: PropTypes.string,
};
