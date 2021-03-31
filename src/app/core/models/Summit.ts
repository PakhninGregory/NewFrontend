import {SummitAlp} from './SummitAlp';
import {SummitName} from './SummitName';

export class Summit {
  public id = 0;
  public mainland: '';
  public latitude = 0;
  public longitude = 0;
  public height = 0;
  public names: SummitName[] = [];
  public alpinists: SummitAlp[] = [];
}
