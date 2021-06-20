<template>
<div>
	 <div class="header">
		 
		  <h1>数据采集</h1>
	 </div>
	<div >
	 <MENU ></MENU>
	 <WORKAREA ></WORKAREA>
	 
	 </div>
 </div>
</template>

<script>
import MENU from './components/menu.vue'
import WORKAREA from './components/workarea.vue'

export default {
  
  components: {
	  MENU,WORKAREA
  }
}
</script>

<style>
.header{
background-color: #00E0E0;
height:10vh;
width: 100vw;
margin-bottom: 0px;
padding: 0px;


}


</style>
