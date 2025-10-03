import React from 'react';
import './PointSystem.css';
import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useTranslation } from 'react-i18next';

const PointSystem = () => {

  const {pointsData, fetchPointsData, token} = useContext(StoreContext);
  const { t } = useTranslation();
  const { points, history } = pointsData || { points: 0, history: [] };
  const TARGET_POINTS = 1000;
  const progressPercentage = Math.min((points / TARGET_POINTS) * 100, 100);
  const remainingPoints = Math.max(TARGET_POINTS - points, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="points-system-container">
      {/* Header Section */}
      <div className="points-header">
      <div className="point-available-notice"> <p> {t("pointsSystemUnavailable")} </p></div>
        <div className="points-badge">
          <div className="badge-icon">🎁</div>
          <div className="badge-content">
            <h2 className="current-points">{points}</h2>
            <p className="points-label">{t("rewardPoints")}</p>
           
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-info">
          <h3 className="progress-title">{t("discountProgress")}</h3>
          <p className="progress-subtitle">
            {remainingPoints > 0 
              ? `${remainingPoints} ${t("pointsUntilReward")}` 
              : `🎉 ${t('discountUnlocked')}`}
          </p>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            >
              <span className="progress-text">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <div className="progress-markers">
            <span className="marker-start">0</span>
            <span className="marker-end">1000</span>
          </div>
        </div>

        {progressPercentage === 100 && (
          <div className="unlock-message">
            <span className="unlock-icon">✨</span>
           {t("discountUnlockedMessage")}
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="history-section">
        <h3 className="history-title">{t("pointsHistory")}</h3>
        <div className="history-list">
          {history && history.length > 0 ? (
            history.map((item) => (
              <div 
                key={item._id} 
                className={`history-item ${item.pointsChanged > 0 ? 'positive' : 'negative'}`}
              >
                <div className="history-icon">
                  {item.pointsChanged > 0 ? (
                    <span className="icon-plus">+</span>
                  ) : (
                    <span className="icon-minus">−</span>
                  )}
                </div>
                <div className="history-details">
                  <p className="history-reason">{item.reason}</p>
                  <p className="history-date">{formatDate(item.date)}</p>
                </div>
                <div className="history-points">
                  <span className={item.pointsChanged > 0 ? t("pointsEarned") : t("pointsSpent")}>
                    {item.pointsChanged > 0 ? '+' : ''}{item.pointsChanged}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-history">
              <p>{t("noTransactionHistory")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointSystem;