import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const CardComponent = (props) => {

    function setActiveChartData() {
        props.onSelect(props.cardData);
    }

    return (
        <Card className="card-comp" onClick={setActiveChartData}>
            <CardActionArea>
                <CardContent>
                    <Typography className="card-name" gutterBottom>
                        Temp:
                    </Typography>
                    <Typography className="card-value" gutterBottom>
                        {(props.temperatureType === 'celsius') ? props.cardData.tempC : props.cardData.tempF}
                    </Typography>
                    <Typography className="card-name" gutterBottom>
                        Date:
                    </Typography>
                    <Typography className="card-value" gutterBottom>
                        {props.cardData.displayDate}
                    </Typography>
                    <Typography className="card-name" gutterBottom>
                        Humidity:
                         </Typography>
                    <Typography className="card-value" gutterBottom>
                        {props.cardData.humidity}
                    </Typography>
                    <Typography className="card-name" gutterBottom>
                        Weather:
                    </Typography>
                    <Typography gutterBottom className="content-ellipsis card-value">
                        {props.cardData.weather}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

CardComponent.propTypes = {
    cardData: PropTypes.shape({
        chartDataC: PropTypes.array.isRequired,
        chartDataF: PropTypes.array.isRequired,
        date: PropTypes.string.isRequired,
        displayDate: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        tempC: PropTypes.string.isRequired,
        tempF: PropTypes.string.isRequired,
        weather: PropTypes.string.isRequired,
        weatherArr: PropTypes.array.isRequired,
        fragmentsC: PropTypes.array.isRequired,
        fragmentsF: PropTypes.array.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    temperatureType: PropTypes.string.isRequired,
}

export default React.memo(CardComponent);