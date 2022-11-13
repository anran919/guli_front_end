<template>
  <div class="app-container">
    <el-card>
      <el-form size="small" :model="form" label-width="120px">
        <el-form-item label="name">
          <el-input v-model="form.name" clearable placeholder="name" />
        </el-form-item>
        <el-form-item label="sort">
          <el-input-number v-model="form.sort" placeholder="sort" :min="0" />
        </el-form-item>
        <el-form-item label="level">
          <el-select v-model="form.level" clearable placeholder="level">
            <el-option :value="1" label="高级讲师" />
            <el-option :value="2" label="首席讲师" />
          </el-select>
        </el-form-item>
        <el-form-item label="career">
          <el-input v-model="form.career" placeholder="career" />
        </el-form-item>
        <el-form-item label="intro">
          <el-input v-model="form.intro" type="textarea" :rows="3" placeholder="intro" />
        </el-form-item>
        <el-form-item label="avatar">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="form.avatar" />
          <!-- 文件上传按钮 -->
          <el-button
            type="primary"
            icon="el-icon-upload"
            @click="avatarCropperVisible=true"
          >更换头像
          </el-button>
          <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
          <!-- :key="imageKey" -->
          <image-cropper
            v-show="avatarCropperVisible"
            :key="imageKey"
            :width="300"
            :height="300"
            field="file"
            :url="uploadAvatar"
            @close="close"
            @crop-upload-success="cropSuccess"
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="confirmLoading" type="primary" @click="confirm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addTeacher, getTeacherById, updateTeacher, uploadAvatar } from '@/api/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  name: 'AddTeacher',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      form: {
        avatar: process.env.VUE_APP_OSS_PATH + '/edu_upload/2022/11/09/2ad92547-b965-4086-a575-7cc6410590ad.png'
      },
      confirmLoading: false,
      avatarCropperVisible: false,
      imageKey: 1,
      uploadAvatar
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacherInfo(id)
    }
  },
  methods: {
    getTeacherInfo(id) {
      getTeacherById(id).then(res => {
        this.form = { ... res.data.data }
      })
    },
    confirm() {
      const data = Object.assign({}, this.form)
      this.confirmLoading = true
      if (data.id) {
        this.update(data)
      } else {
        this.add(data)
      }
    },
    add(data) {
      addTeacher(data).then(res => {
        return this.$message.success('保存成功!')
      }).then(_ => {
        this.$router.push({ path: '/teacher/list' })
      }).catch(_ => {
        this.$message.error('保存失败!')
      }).finally(_ => {
        this.confirmLoading = false
      })
    },
    update(from) {
      const { name, id, level, sort, career, avatar } = from
      const data = { name, level, sort, career, avatar }
      updateTeacher(id, data).then(res => {
        this.visible = false
        this.$router.push({ path: '/teacher/list' })
        return this.$message.success('更新成功!')
      }).catch(_ => {
        this.$message.error('更新失败!')
      }).finally(_ => {
        this.confirmLoading = false
      })
    },
    close() {
      this.avatarCropperVisible = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imageKey = this.imageKey + 1
    },
    cropSuccess(data) {
      this.avatarCropperVisible = false
      this.form.avatar = data.url
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imageKey = this.imageKey + 1
    }

  }
}
</script>

<style scoped>

</style>
