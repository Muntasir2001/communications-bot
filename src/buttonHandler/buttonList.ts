import { Button } from './Button';
import disregard from './buttonFunctions/disregard';
import onDuty from './buttonFunctions/onDuty';
import offDuty from './buttonFunctions/offDuty';
import requestDispatcher from './buttonFunctions/requestDispatcher';

const buttonList: Button[] = [onDuty, disregard, offDuty, requestDispatcher];

export default buttonList;
