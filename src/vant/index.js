import Vue from 'vue';
import { Button } from 'vant';
import { Toast } from 'vant'
import { Cell, CellGroup } from 'vant'
import { NavBar } from 'vant'
import { Uploader  } from 'vant'
import { Dialog } from 'vant'
import { Field } from 'vant'

Vue.use( Field )
Vue.use( Dialog)
Vue.use(Uploader)
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button);
Vue.use(Toast);