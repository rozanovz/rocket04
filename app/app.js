import { routing }  from './scripts/config/config';
import { running }  from './scripts/config/run';
import { animate }  from './scripts/config/animation';

import { loader }   from './scripts/loader/loader';
import { api }      from './scripts/api/api';

import { AboutCtrl } from './scripts/about/about';
import { ContactsCtrl } from './scripts/contacts/contacts';
import { ContractCtrl } from './scripts/contract/contract';
import { GmapCtrl } from './scripts/gmap/gmap';
import { HowCtrl } from './scripts/how/how';
import { MainCtrl } from './scripts/main/main';

import GiftsCtrl from './scripts/gifts/gifts';
import storeCtrl from './scripts/store/store';
import cartCtrl from './scripts/cart/cart';
import FulldescCtrl from './scripts/fulldesc/fulldesc';

// import uiBootstrap from 'angular-ui-bootstrap';


angular.module('ocean04App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    // 'ngCart.fulfilment', 
    // uiBootstrap,
    'GoogleMapsNative',
    // 'google.places',
])
.config(routing)
.run(running)
// .animation('.rocket-view', animate)
.service('loader', loader)
.service('api', api)

.controller('AboutCtrl', AboutCtrl)
.controller('ContactsCtrl', ContactsCtrl)
.controller('ContractCtrl', ContractCtrl)
.controller('GmapCtrl', GmapCtrl)
.controller('HowCtrl', HowCtrl)
.controller('MainCtrl', MainCtrl)

.controller('cartCtrl', cartCtrl)
.controller('FulldescCtrl', FulldescCtrl)
.controller('GiftsCtrl', GiftsCtrl)
.controller('storeCtrl', storeCtrl);