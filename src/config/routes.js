/**
 * Created by zjl on 2017/6/7.
 */

import carousel from '../page/carousel.vue'
import channelList from '../page/channelList.vue'
import channelDetail from '../page/channelDetail.vue'
import searchResult from '../page/searchResult.vue'
import billboard from '../page/billboard.vue'

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
    path: '/detail/:channelType',
    name: 'detail',
    components:{
      first: carousel,
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
