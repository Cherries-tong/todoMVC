(function (window,Vue) {

	var arr =[
		{
			id:1,
			content:'abc',
			isFinish:true
		},
		{
			id:2,
			content:'abc',
			isFinish:false
		},
		{
			id:3,
			content:'abc',
			isFinish:true
		}
	]

	new Vue({
		el:'#app',
		data:{
			dataList:JSON.parse(window.localStorage.getItem('dataList')) || [],
			newTodo:''
		},
		directives:{
			//获取光标
			focus:{
				inserted(el){
					el.focus();
				}
			}
		},
		methods:{
			//添加
			addTodo(){
				if(!this.newTodo.trim()) return;
				this.dataList.unshift({
					id:this.dataList.length?this.dataList.sort((a,b)=>(a.id-b.id))[this.dataList.length - 1]['id']+1 : 1,
					content:this.newTodo.trim(),
					isFinish:false
				})
				this.newTodo = ''
			},
			//删除单个
			delTodo(i){
				this.dataList.splice(i,1)
			},
			//删除所有
			delAll(){
				this.dataList = this.dataList.filter(item=>!item.isFinish)
			}
		},
		//isFinish
		watch:{
			dataList:{
				handler(newArr){
					window.localStorage.setItem('dataList',JSON.stringify(newArr))
				},
				deep:true
			}
		},
		computed:{
			todoCount(){
				return this.dataList.filter(item =>!item.isFinish).length;
			},
			//全选反选
			toggleAll:{
				get(){
					return this.dataList.every(item=>item.isFinish)
				},
				set(val){
					this.dataList.forEach(item=>item.isFinish=val)
				}
			}
		}
	})

})(window,Vue);
