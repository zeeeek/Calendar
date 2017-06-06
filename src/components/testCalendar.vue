<template>
  <div class="testcalendar">
    <calendar :show="true" :showCalendar="true" @getDay="getDay"></calendar>
  </div>
</template>

<script>
import calendar from './calendar'
export default {
	components:{
		calendar
	},
	data () {
		return {
			nowDay: '',
			timeLimit: {
				minYear: 1945,
  				minMonth: 1,
  				minDay: 1,
  				maxYear: 2020,
  				maxMonth: 3,
  				maxDay: 20
			}
		}
	},
	methods: {
		getDay (selectDay) {
			this.nowDay = selectDay;
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>