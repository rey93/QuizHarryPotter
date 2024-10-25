import React from 'react';

const Houses = () => {
    return (
        <div className="house">
                    <div className="gryffindor">
                        <img src={'src/assets/gryffindor.png'} />
                        <h3>Gryffindor (Frontend)</h3>
                    </div>
                    <div className="slytherin">
                        <img src={'src/assets/hufflepuff.png'} />
                        <h3>Slytherin (Backend)</h3>
                    </div>
                    <div className="ravenclaw">
                        <img src={'src/assets/ravenclaw.png'} />
                        <h3>Ravenclaw (Movile)</h3>
                    </div>
                    <div className="hufflepuff">
                        <img src={'src/assets/hufflepuff.png'} />
                        <h3>Hufflepuff (Data)</h3>
                    </div>
            </div>
    );
};

export default Houses;