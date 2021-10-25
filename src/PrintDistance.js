import React from 'react';
import PropTypes from 'prop-types';

class PrintDistance extends React.Component {
    
    calculateDistance(){
        
        const nautR = 3963;

        let firstPoint = this.props.firstPoint   
        let secondPoint = this.props.secondPoint
        let dLat = (secondPoint.latitude - firstPoint.latitude) * (Math.PI/180);
        let dLon = (secondPoint.longitude - firstPoint.longitude) * (Math.PI/180);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(firstPoint.latitude * (Math.PI/180)) * Math.cos(secondPoint.latitude * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let result = nautR * b;
        return result.toFixed(2)
    }
    
    
    render() { 
        return <div>{this.props.firstPoint.name} to {this.props.secondPoint.name}: {this.calculateDistance()} NM</div>;
    }
}
 
PrintDistance.propTypes = {
    firstPoint:PropTypes.object.isRequired,
    secondPoint:PropTypes.object.isRequired
}

PrintDistance.defaultProps = {
    firstPoint: {latitude:0, longitude:0, name: ""},
    secondPoint:{latitude:0, longitude:0, name: ""}
}


export default PrintDistance;