import {updateTheme, setShowSplash} from './app';
import {setMember} from './member';

class AllReducer {
  updateTheme = updateTheme;
  setShowSplash = setShowSplash;
  setMember = setMember;
}
const Reducers = new AllReducer();
export default Reducers;
