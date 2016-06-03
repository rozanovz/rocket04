import routing  from './scripts/config/config';
import running  from './scripts/config/run';
import animate  from './scripts/config/animation';

import loader   from './scripts/loader/loader';
import api      from './scripts/api/api';

import AboutCtrl from './scripts/about/about';
import cartCtrl from './scripts/cart/cart';
import ContactsCtrl from './scripts/contacts/contacts';
import ContractCtrl from './scripts/contract/contract';
import FulldescCtrl from './scripts/fulldesc/fulldesc';
import GiftsCtrl from './scripts/gifts/gifts';
import GmapCtrl from './scripts/gmap/gmap';
import HowCtrl from './scripts/how/how';
import MainCtrl from './scripts/main/main';
import storeCtrl from './scripts/store/store';

angular.module('ocean04App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    // 'ngCart.fulfilment', 
    // 'ui.bootstrap',
    'GoogleMapsNative',
    // 'google.places'
])
.config(routing)
.run(running)
// .animation('.rocket-view', animate)
.service('loader', loader)
.service('api', api)
.controller('AboutCtrl', AboutCtrl)
.controller('cartCtrl', cartCtrl)
.controller('ContactsCtrl', ContactsCtrl)
.controller('ContractCtrl', ContractCtrl)
.controller('FulldescCtrl', FulldescCtrl)
.controller('GiftsCtrl', GiftsCtrl)
.controller('GmapCtrl', GmapCtrl)
.controller('HowCtrl', HowCtrl)
.controller('MainCtrl', MainCtrl)
.controller('storeCtrl', storeCtrl);