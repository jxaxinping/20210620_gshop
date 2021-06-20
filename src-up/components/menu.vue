<template>
	<el-row class="tac">

		<el-col :span="4">
			
			<el-menu :uniqueOpened="true" default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
				@close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1" disabled route="/upload">
					<i class="el-icon-document"></i>
					<template #title>数据采集</template>
				</el-menu-item>
				<el-menu-item index="2" route="/upload/uploaddetail">
					<i class="el-icon-setting"></i>
					<template #title>导航四</template>
				</el-menu-item>
				
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>


<style>
	.left {

		height: 90vh;
	
	}
</style>
