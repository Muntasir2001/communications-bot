import { SelectMenu } from './SelectMenu';
import offDuty from './selectMenuFunctions/offDuty/offDuty';
import onDuty from './selectMenuFunctions/onDuty/onDuty';
import requestDispatcher from './selectMenuFunctions/requestDispatcher/requestDispatcher';

const selectMenuList: SelectMenu[] = [onDuty, offDuty, requestDispatcher];

export default selectMenuList;
