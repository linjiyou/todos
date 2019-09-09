(function () {
	let items=[
		{
			id:1,
			content:'vue',
			completed:false
		}
	];
	//进行本地存储数据
	const STORAGE_KEY='ITEMS-VUEJS';
	const itemStorage={
		fetch:function(){
        return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');  
		},
		save:function(items){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(items));
		}
	}
	Vue.directive('app-focus',{
	    	inserted(el,binding){
				el.focus();
			},
			update(el,binding){
				if(binding.value){
					el.focus();
				}
				
			}
	})
var app=new Vue({
		el:'#todoapp',
		data:{
			// items,
			items:itemStorage.fetch(),
			currentItem:null,
			filterStatus:'all'
		},
		watch:{
			items:{
				deep:true,
				handler:function(newItem,oldItems){
					//保存存储
					console.log(newItem);
					
					itemStorage.save(newItem) 
				}
			}
		},
		computed:{
			filterItem(){
			
            switch(this.filterStatus){
                case 'active':
		          return this.items.filter(item=>!item.completed);
				break;
				case 'completed':
			      return this.items.filter(item=>item.completed);
				break;
				default:
                return this.items;
				 break;
			};
			
			},
			toggleAll:{
              get(){
				
              return this.remaining===0;
			  },
			  set(newStatus){
                this.items.forEach(item=>{
                    item.completed=newStatus;
				})
			  }
			},
		remaining(){
      const unItems=this.items.filter(item=>{
		  return !item.completed
		 });
		 return unItems.length
		 }
		},
		methods:{
			finishEdit(item,index,e){
		
			  const content= e.target.value.trim();
			 if(!content){
				this.removeItem(index)
			 }
			  item.content=content;
			  this.currentItem=null;
			},
			cancelEdit(){
              this.currentItem=null;
			},
			toEdit(edit){	
			this.currentItem=edit;
				
			},
			removeCompleted(){
		  this.itmes=this.items.filter(item=>!item.completed)
			 
			},
			removeItem(index){
            this.items.splice(index,1);
			},
			additem(e){
			const id =this.items.length+1,
				  content=e.target.value.trim();
				  e.target.value='';
				  if(!content.length)return;
				  this.items.push({
					  id,
					  content,
					  completed:false
				  })
		        

		   
			}
		}
	});
	window.onhashchange=function(){
	const hash=	window.location.hash.substr(2)||'all';
	 app.filterStatus=hash;
	};
	window.onhashchange();

})(window);
