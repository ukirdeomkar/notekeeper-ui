// LoadingIndicator.js
import React,{useContext} from 'react';
import loadingContext from '../context/loadingContext';

const Loading = (props) => {
//   const { loading } = useLoading();
  const logincontext  = useContext(loadingContext);
  const{loading} = logincontext;
  const {propsLoading} = props;

  if(propsLoading){
    return <>
    <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
</div>
</>
 }

  return loading ?
    <>
    <div className="loading-indicator">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div> 
    </>
    : null;
    
};

export default Loading;
