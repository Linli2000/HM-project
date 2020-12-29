import Vue from 'vue';
import { Button } from 'vant';
import { Toast } from 'vant'
import { Cell, CellGroup } from 'vant'
import { NavBar } from 'vant'
import { Uploader  } from 'vant'
import { Dialog } from 'vant'
import { Field } from 'vant'
import { ActionSheet } from 'vant'
import { Tab, Tabs } from 'vant'

Vue.use(Tabs)
Vue.use(Tab )
Vue.use( ActionSheet )
Vue.use( Field )
Vue.use( Dialog)
Vue.use(Uploader)
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button);
Vue.use(Toast);