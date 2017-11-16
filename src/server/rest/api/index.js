import cook from './cook';
import user from './user';
import dependent from './dependent';
import device from './device';

export default function (router) {
  cook(router);
//  user(router);
  dependent(router);
  device(router);
}
