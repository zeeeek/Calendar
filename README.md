# my-project

由Vue 2.0编写的日历组件

父组件向子组件传递参数

      自定义时间范围（limit）
      自定义显示隐藏（show）
      自定义是否显示日历（showCalendar）
      props: {
        show: { //是否显示组件
          type: Boolean, 
          default: true
          },
          showCalendar: { //是否显示日历
            type: Boolean,
            default: true
          },
          limit: { //自定义范围
            type: Object,
            default () {
              return {
                minYear: 1900,
                minMonth: 1,
                minDay: 1,
                maxYear: 2030,
                maxMonth: 3,
                maxDay: 20
              }
          }
      }


父组件获得参数，通过事件getDay来获取

      watch: {
          selectDay (newDay) {
            this.$emit('getDay',newDay);
          }
        },
        mounted () {
          this.$nextTick(() => {
            this.$emit('getDay',this.selectDay);
          })
        }
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
