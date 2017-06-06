<template>
  <div class="calendar-wrapper">
	<label for="calendar-input">
		<input type="text" class="calendar-input" readonly="readonly" 
		v-model="selectDay"
		:class="{focus: isfocus}"
		@click="focus">
	</label>

	<transition name="fade">
		<div class="calendar" v-show="changeShowCalendar">
			<div class="header">
				<span class="arrow arrow-prev" @click="subMonth">&lt;</span>
				<span class="datebox">{{selectDay}}</span>
				<span class="arrow arrow-next" @click="addMonth">&gt;</span>
			</div>
			<div class="week">
				<span v-for="(item,index) in week" :class="{weekend: index % 7 === 0 || index % 7 === 6}">{{item}}</span>
			</div>
			<div class="days">
				<span v-for="(item,index) in renderData" 
				:class="{unselect: unselectArr.includes(index),
						weekend: index % 7 === 0 || index % 7 === 6,
						select: index === firstDayInWeek + trueDay - 1}"
						@click="changeSelectDay(index)">
					{{item}}
				</span>
			</div>
		</div>
	</transition>
  </div>
</template>

<script>
export default {
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
  },
  data () {
  	return {
  		isfocus: true,
  		changeShowCalendar: this.showCalendar,
  		week: ["日", "一", "二", "三", "四", "五", "六"],
  		date: new Date(),
  		Year: new Date().getFullYear(),
  		Month: new Date().getMonth() + 1,
  		Day: new Date().getDate()
  	}
  },
  computed: {
  	trueYear () { 
  		if(this.Year < this.limit.minYear) return this.limit.minYear;
  		if(this.Year > this.limit.maxYear) return this.limit.maxYear;
  		return this.Year;
  	},
  	trueMonth () {
  		if(this.Year === this.limit.minYear && this.Month < this.limit.minMonth) return this.limit.minMonth;
  		if(this.Year === this.limit.maxYear && this.Month > this.limit.maxMonth)
  			return this.limit.maxMonth;
  		return this.Month;
  	},
  	trueDay () {
  		if(this.Year === this.limit.minYear && this.Month < this.limit.minMonth && this.Day < this.limit.minDay) return this.limit.minDay;
  		 if(this.Year === this.limit.maxYear && this.Month > this.limit.maxMonth && this.Day < this.limit.maxDay) return this.limit.maxDay;
  		return this.Day;
  	},
  	selectDay () {
  		return `${this.trueYear}-${this.trueMonth}-${this.trueDay}`
  	},
  	firstDayInWeek () {  //获得当前月份的第一天是周几 0123456
  		return new Date(this.trueYear,this.trueMonth-1,1).getDay();
  	},
  	MonthDay () { //当前月份的最后一天
  		return new Date(this.trueYear,this.trueMonth,0).getDate();
  	},
  	lastMonthDay () { //获得上一个月后几天（由这个月的第一天为周几决定）的一个数组
  		let lastNum = this.firstDayInWeek;
  		let lastDays = [];
  		if(lastNum === 0) return lastDays;

  		let lastDayNum = new Date(this.trueYear,this.trueMonth-1,0).getDate();
  		for(let i = 0; i < lastNum; i++) {
  			lastDays.unshift(lastDayNum);
  			lastDayNum--;
  		}
  		return lastDays;
  	},
  	nextMonthDay () { //剩下的由下一个月的成员的数组填充
  		let nextNum = 42 - this.firstDayInWeek - this.MonthDay;
  		let nextDays = [];
  		if(nextNum === 0) return nextDays;

  		for(let i = 1; i <= nextNum; i++){
  			nextDays.push(i);
  		}
  		return nextDays;
  	},
  	renderData () { //拼接数组
  		let nowDays = [];
  		let i = 1;
  		for(;i <= this.MonthDay; i++) {
  			nowDays.push(i);
  		}
  		return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];

  	},
  	unselectArr () {  //筛选出当前月份以外的成员
  		let arr = [];
  		let index = 0;
  		if(this.trueYear === this.limit.minYear && this.trueMonth === this.limit.minMonth) {
  			for(;index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
  				arr.push(index);
  			}
  		}else{
  			for(; index < this.firstDayInWeek; index++) {
  				arr.push(index);
  			}
  		}

  		if(this.trueYear === this.limit.maxYear && this.trueMonth === this.limit.maxMonth) {
  			index = this.firstDayInWeek + this.limit.maxDay;
  			for(; index < 42; index++){
  				arr.push(index);
  			}
  		}else{
  			index = this.firstDayInWeek + this.MonthDay;
  			for(; index < 42; index++) {
  				arr.push(index);
  			} 
  		}
  		return arr;
  	}
  },
  methods: {
  	focus () {
  		this.isfocus = !this.isfocus;
  		this.changeShowCalendar = !this.changeShowCalendar;
  	},
  	subMonth () {
  		if(this.Month === 1) {
  			this.Month = 12;
  			this.Year -= 1;
  		}else{
  			this.Month -= 1;
  		}
  		if(this.Year < this.limit.minYear) this.Year = this.limit.minYear;
  		if(this.Year === this.limit.minYear){
  			if(this.Month < this.limit.minMonth){
  				this.Month = this.limit.minMonth;
  			}
  		}
  	},
  	addMonth () {
  		if(this.Month === 12){
  			this.Year += 1;
  			this.Month  = 1;
  		}else{
  			this.Month++
  		}
  		if(this.Year > this.limit.maxYear) this.Year = this.limit.maxYear;
  		if(this.Year === this.limit.maxYear){
  			if(this.Month > this.limit.maxMonth){
  				this.Month = this.limit.maxMonth;
  			}
  		}
  	},
  	changeSelectDay (index) {
  		if(this.unselectArr.includes(index)) return;
  		this.Day = index - this.firstDayInWeek + 1;
  		this.changeShowCalendar = false;
  	}
  },
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
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
.calendar-wrapper
	font-family: SimHei;
	.calendar-input
		width: 237px
		height: 30px
		&.focus
			border-color: #9ecaed
			border-shadow: 0 0 5px #9ecaed
	.calendar
		width: 240px
		font-size: 16px
		color: #666
		box-shadow: 2px 2px 8px 2px rgba(128,128,128,0.3)
		&.fade-enter-active,&.fade-leave-active
			transition: opacity .3s
		&.fade-enter,&.fade-leave-active
			opacity: 0
		div,span
			display:flex
			flex-flow: row wrap
			justify-content: center
			line-item: center
		div
			height: 12.5%
			width: 100%
		span
			height: 100%
			width: 14.2857%
		.header
			display: flex
			flex-flow: row nowrap
			justify-content: space-between
			align-items: center	
			text-align: center
			background-color: #f0f0f0
			border-bottom: 1px solid #ccc
			font-weight: bold
			span
				display:flex
				align-items: center
			.datebox
				flex-grow: 2
			.arrow
				width: 20px
				height: 50px
				line-height: 50px
				color: #1abc9c
				font-family: serif
				text-align: center
				cursor: pointer
		.week
			box-sizing: border-box
			padding: 5px
			font-size: 16px
			span
				height: 100%	
				&.weekend
					color: #1abc9c
		.days
			box-sizing: border-box
			padding: 5px
			height: 75%
			font-size: 14px
			span
				height: 16.666667%
				cursor: pointer
				padding: 4px 0  4px 0
				&:hover
					background-color: #1abc9c
				&.weekend
					color: #1abc9c
				&.unselect
					color: #ccc
					cursor: default
					&:hover
						background-color: #fff
				&.select
						background-color: #1abc9c

</style>
