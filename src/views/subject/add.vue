<template>
  <div class="main-content">
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="信息描述">
          <!-- <el-tag type="info">excel模板说明</el-tag> -->
          <el-tag>
            <i class="el-icon-download" />
            <a href="/excel/课程数据.xlsx">点击下载模版</a>
          </el-tag>
        </el-form-item>
        <!-- :action="BASE_API+'/service_edu/edu-subject/uploadFile'" -->
        <el-form-item label="选择Excel">
          <el-upload
            ref="upload"
            :auto-upload="false"
            class="upload"
            :action="uploadAction"
            :on-success="onFileUploadSuccess"
            :on-error="onFileUploadError"
            accept=".xlsx,xls"
            name="file"
            :limit="1"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button :loading="uploadLoading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadFile } from '@/api/subject'
export default {

  data() {
    return {
      fileList: [],
      uploadAction: uploadFile,
      BASE_API: process.env.VUE_APP_BASE_API,
      uploadLoading: false
    }
  },
  methods: {
    submitUpload() {
      this.uploadLoading = true
      this.$refs.upload.submit()
    },
    onFileUploadSuccess(response, file, fileList) {
      this.uploadLoading = false
      this.$message.success('上传成功!')
      this.$router.push({ path: '/subject/list' })
    },
    onFileUploadError(err) {
      this.uploadLoading = false
      this.$message.error('导入失败!', err)
    }
  }
}
</script>

<style>
.main-content{
  padding: 20px;
}
</style>
