import './loading.scss';

const Loading = () => {
  return (
    <div className='loading'>
      <span className="spinner spinner-border border-3 spinner-border-lg" role="status" aria-hidden="true"></span>
      <span>Loading...</span>
    </div>
  );
}

export default Loading;