import React from 'react';

const ProgressBar = ({ currentValue, maxValue }) => {
    const percentage = (currentValue / maxValue) * 100;

    return (
        <div className="progress-bar-container" style={{width: '100%', backgroundColor: '#DAF7A6', borderRadius: '8px', overflow: 'hidden', border: '2px solid #497E24', marginRight:'10px' }}>
            <div className="progress-bar" style={{ width: `${percentage}%`, backgroundColor: '#458319', height: '11px', borderRadius: '8px' }}>
            </div>
        </div>
    );
};

export default ProgressBar;
