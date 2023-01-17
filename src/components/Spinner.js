import React from 'react';
// import spinner from './spinner.gif';

function Spinner() {
    return (
        <div>
            <img
                src={"assets/myspinner.gif"}
                style={{ width: '100px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    );
}

export default Spinner;