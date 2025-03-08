import React from 'react';
import "./TopPageInfoBar.css"
import { useTopPageContext } from '../../TopPageContext'; 

const TopPageInfoBar = () => {
  const { topPageContextMessage } = useTopPageContext();

  const getMessageClass = () => {
    switch (topPageContextMessage.type) {
      case 'error':
        return 'top-page-bar top-page-bar-error';
      case 'success':
        return 'top-page-bar top-page-bar-success';
      case 'info':
        return 'top-page-bar top-page-bar-info';
      // case 'warning':
      //   return 'top-page-bar top-page-bar-warning';
      default:
        return 'top-page-bar';
    }
  };

  return (
    topPageContextMessage.text && (
      <div className={getMessageClass()}>
        <h2>{topPageContextMessage.text}</h2>
      </div>
    )    
  );
};

export default TopPageInfoBar;
