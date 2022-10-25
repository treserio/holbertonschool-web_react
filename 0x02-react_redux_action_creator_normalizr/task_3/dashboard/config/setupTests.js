import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// global.console = {
//     log: jest.fn(),
//     debug: console.debug,
//     trace: console.trace,
//     // map other methods that you want to use like console.table
// }