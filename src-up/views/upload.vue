<template>
	<div >
		<div v-show="show">
		<el-upload style="position: absolute;top: 20%;left: 30%;" class="upload-demo" drag action="http://localhost:8001/upload/uploadFile" multiple name="fileUpload"
			:file-list="fileList" :http-request="uploadFile" :auto-upload="false" ref="upload">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			<div v-show="progressFlag" class="head-img">
				<el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" status="success">
				</el-progress>
				
			</div>
			<el-button size="small" type="success" @click="submitUpload">上传
			</el-button>
		</el-upload>
		</div>
		<div v-show="!show">
			<UPLOADDETAIL></UPLOADDETAIL>
		</div>
	</div>

</template>

<script>
	// http://localhost:8001/upload/uploadFile

	import axios from 'axios'
	import UPLOADDETAIL from './uploaddetail.vue'



	export default {
		components:{
			UPLOADDETAIL
		},
		data() {
			return {
				fileData: '', // 文件上传数据（多文件合一）
				fileList: [], // upload多文件数组
				progressFlag: false,
				progressPercent: 10,
				innerVisible: false,
				isViewDisabled: false,
				show: true


			}
		},
		methods: {
			uploadFile(file) {

				this.fileData.append('file', file.file); // append增加数据
			},
			submitUpload() {

				this.fileData = new FormData();
				this.$refs.upload.submit();

				let that = this
				that.progressFlag = true
				axios
					.post('http://localhost:8001/upload/uploadFile', this.fileData, {
						headers: {
							"Content-type": "multipart/form-data"
						},
						onUploadProgress: progressEvent => {
							// progressEvent.loaded:已上传文件大小
							// progressEvent.total:被上传文件的总大小
							// 进度条
							that.progressPercent = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(
								0) | 0
						}
					}).then(res => {


							if (res.data.code === 200 && that.progressPercent === 100) {
								setTimeout(function() {
									that.$message({
										message: '上传成功！',
										type: 'success',
										duration: '2000'
									})
									that.progressFlag = false
									that.progressPercent = 0
									that.$refs.upload.clearFiles()
								}, 1000)
								let result = res.data.message
								this.$router.push("/upload/uploaddetail")
							}
						}


					).catch();
			}
		},
		clearFiles() {
			this.fileList = []

			this.$refs.upload.clearFiles()
		},
	}
</script>







<!-- <template>
    <el-form ref="form" :model="formData" label-width="120px"   name="fileUpload">
      <el-row>
        <el-col :span="10">
          <el-form-item   prop="mediaFileUrl">
            <el-upload style="width: 100%;"
              class="upload-demo"
              ref="uploadMul"
              multiple
              action
              drag
              :limit="maxUploadSize"
              :on-exceed="uploadLimit"
              :http-request="submitUpload"
              :file-list="fileList"
              :auto-upload="true"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-change="uploadChange"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">支持上传jpg/png/gif文件，且不超过100M</div>
            </el-upload>
            <div v-show="progressFlag" class="head-img">
              <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent" status="success"></el-progress>
            </div>
            
            <el-button v-if="this.fileList.length > 0" size="mini" type="warning" @click="clearFiles">清空</el-button>
          </el-form-item>
        </el-col>
        <el-col :offset="4"></el-col>
      </el-row>
    </el-form>
</template>
<script>
	// http://localhost:8001/upload/uploadFile

	import axios from 'axios'
	export default {
	    
	  data () {
	    return {
	      maxUploadSize: 10,
	      progressFlag: false,
	      progressPercent: 10,
	      innerVisible: false,
	      fileList: [],
	      isViewDisabled: false,
	      formData: {},
	      param: {} // 上传文件主要参数
	    }
	  },
	  methods: {
	    submitUpload (file) {
			
			
		 
      if (this.param instanceof FormData) {
	        // 附加参数
	      
	        let that = this
	        that.progressFlag = true
	        axios({
	          url: 'http://localhost:8001/upload/uploadFile',
	          method: 'post',
	          data: that.param,
	          headers: { 'Content-Type': 'multipart/form-data' },
	          onUploadProgress: progressEvent => {
	            // progressEvent.loaded:已上传文件大小
	            // progressEvent.total:被上传文件的总大小
	            // 进度条
	            that.progressPercent = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0) | 0
	          }
	        }).then(res => {
	          this.param = {}
	          this.fileList = []
	          console.log(res)
	          if (res.data.code === 200 && that.progressPercent === 100) {
	            setTimeout(function () {
	              that.$message({
	                message: '上传成功！',
	                type: 'success',
	                duration: '2000'
	              })
	              that.progressFlag = false
	              that.progressPercent = 0
	              that.$refs.uploadMul.clearFiles()
	            }, 1000)
	            let result = res.data.message
				alert(result)
	            console.log(result)
	          } else {
	            setTimeout(function () {
	              that.$message({
	                message: res.data.message,
	                type: 'error',
	                duration: '2000'
	              })
	              that.progressFlag = false
	              that.progressPercent = 0
	              that.$refs.uploadMul.clearFiles()
	            }, 1000)
	          }
	        }).catch(() => {
	          that.progressFlag = false
	          that.progressPercent = 0
	          that.$refs.uploadMul.clearFiles()
	          that.$message({
	            message: '上传失败！',
	            type: 'error',
	            duration: '2000'
	          })
	        })
	      } else {
	        console.log(this.param instanceof FormData)
	      }
	    },
	    handleRemove (file, fileList) {
	      this.$message.warning(`已移除文件:  ${file.name}!`)
	      // 每移除一个文件,param重新赋值
	      this.param = new FormData()
	      this.fileList = [...fileList]
	      this.fileList.forEach((file, index) => {
	        this.param.append(`file`, file.raw) // 把单个文件重命名，存储起来（给后台）
	      })
	    },
	    uploadChange (file, fileList) {
	      const videoType = ['image/gif', 'image/png', 'image/jpeg', 'video/mp4', 'video/flv', 'video/avi', 'video/rmvb']
	      if (videoType.indexOf(file.raw.type) === -1) {
	        this.$message.error(`不支持此文件格式${file.raw.type}`)
	        this.$refs.uploadMul.clearFiles()
	        return false
	      }
	      this.param = new FormData()
	      this.fileList = [...fileList]
	      this.fileList.forEach((file, index) => {
	        this.param.append(`file`, file.raw) // 把单个文件重命名，存储起来（给后台）
	      })
	    },
	    // 超出上传个数时调用
	    uploadLimit (files, fileList) {
	      this.$message.error(`最多允许同时上传${this.maxUploadSize}个文件!`)
	      // files.forEach((file, index) => {
	      //   console.log(index)
	      // })
	    },
	    beforeUpload (file) {
	    },
	    uploadFile (file) {
	      // 该方法需存在,防止空action时element-ui报404异常
	    },
	    clearFiles () {
	      this.fileList = []
	      this.param = {}
	      this.$refs.uploadMul.clearFiles()
	    },
	    // 初始化表单数据
	    init () {
	    }
	  }
	}
	
</script>
 -->
