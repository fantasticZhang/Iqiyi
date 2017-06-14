/**
 * Created by zjl on 2017/6/7.
 */

import carousel from '../page/carousel.vue'
import channelList from '../page/channelList.vue'
import channelDetail from '../page/channelDetail.vue'
import searchResult from '../page/searchResult.vue'
import billboard from '../page/billboard.vue'
import filter from '../page/filter.vue'

export default [
  {
    path: '/',
    components: {
      first: carousel,
      second: channelList,
      third:billboard
    }
  },
  {
    path: '/detail/:channelType/:isPurchase/:mode',
    name: 'detail',
    components:{
      first: filter,
      second: channelDetail
    }
  },
  {
    path: '/search/:keyword',
    name:'search',
    components:{
      first: searchResult
    }
  }
]
