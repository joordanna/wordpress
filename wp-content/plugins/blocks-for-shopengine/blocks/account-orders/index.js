const json = require('./controls.json')
const { blockManager } = gutenova

import {Style} from './style'

new blockManager('gutenova/account-orders')
    .controls(json)
    .css(Style)
    .register()