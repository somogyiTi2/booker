import React from 'react';
import style from '../style/NumberOfDays.module.css';
import { NumberOfDaysProps } from '../type/NumberOfDaysPropsType';

const NumberOfDays: React.FC<NumberOfDaysProps> = ({ setNumberOfDay, numberOfDays }) => {
    return (
        <div className={style.inputDiv}>
            <input
                className={style.input}
                type='number'
                min={1}
                max={7}
                onChange={(event) => setNumberOfDay(+event.target.value)}
                defaultValue={numberOfDays}
            />
        </div>
    );
};

export default NumberOfDays;
