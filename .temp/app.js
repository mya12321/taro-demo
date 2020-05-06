import Taro, { Component } from "@tarojs/taro-h5";


import './app.scss';

import Nerv from 'nervjs';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
class App extends Component {
  config = {
    pages: ["/pages/index/index", "/pages/basic/index", "/pages/view/index", "/pages/view/article/index", "/pages/feedback/index", "/pages/data-entry/index", "/pages/layout/index", "/pages/navigation/index", "/pages/navigation/indexes/index", "/pages/advanced/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Router mode={"hash"} history={_taroHistory} routes={[{
      path: '/pages/index/index',
      componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
      isIndex: true
    }, {
      path: '/pages/basic/index',
      componentLoader: () => import( /* webpackChunkName: "basic_index" */'./pages/basic/index'),
      isIndex: false
    }, {
      path: '/pages/view/index',
      componentLoader: () => import( /* webpackChunkName: "view_index" */'./pages/view/index'),
      isIndex: false
    }, {
      path: '/pages/view/article/index',
      componentLoader: () => import( /* webpackChunkName: "view_article_index" */'./pages/view/article/index'),
      isIndex: false
    }, {
      path: '/pages/feedback/index',
      componentLoader: () => import( /* webpackChunkName: "feedback_index" */'./pages/feedback/index'),
      isIndex: false
    }, {
      path: '/pages/data-entry/index',
      componentLoader: () => import( /* webpackChunkName: "data-entry_index" */'./pages/data-entry/index'),
      isIndex: false
    }, {
      path: '/pages/layout/index',
      componentLoader: () => import( /* webpackChunkName: "layout_index" */'./pages/layout/index'),
      isIndex: false
    }, {
      path: '/pages/navigation/index',
      componentLoader: () => import( /* webpackChunkName: "navigation_index" */'./pages/navigation/index'),
      isIndex: false
    }, {
      path: '/pages/navigation/indexes/index',
      componentLoader: () => import( /* webpackChunkName: "navigation_indexes_index" */'./pages/navigation/indexes/index'),
      isIndex: false
    }, {
      path: '/pages/advanced/index',
      componentLoader: () => import( /* webpackChunkName: "advanced_index" */'./pages/advanced/index'),
      isIndex: false
    }]} customRoutes={{}} />;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

}

Nerv.render(<App />, document.getElementById('app'));