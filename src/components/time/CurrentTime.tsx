import { useState, useEffect } from 'react';

const CurrentTime = ({ currentTime }: { currentTime: string }) => {
    return (
        <div>
            <span className="text-center text-4xl font-bold">
                {currentTime}
            </span>
        </div>
    );
};

export default CurrentTime;
