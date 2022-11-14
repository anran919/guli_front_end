
<template>
  <div class="app-container">
    <el-card>
      <el-form size="small" :model="form" label-width="120px">
        <el-form-item label="title">
          <el-input v-model="form.title" clearable placeholder="title" />
        </el-form-item>
        <el-form-item label="imageUrl">
          <el-input v-model="form.imageUrl" clearable placeholder="imageUrl" />
        </el-form-item>
        <el-form-item label="linkUrl">
          <el-input v-model="form.linkUrl" clearable placeholder="linkUrl" />
        </el-form-item>
        <el-form-item label="sort">
          <el-input-number v-model="form.sort" placeholder="sort" :min="0" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="confirmLoading" type="primary" @click="confirm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { addBanner, updateBanner, getBannerById } from '@/api/banner'
export default {
  name: 'AddBanner',
  data() {
    return {
      form: {},
      confirmLoading: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getBannerInfo(id)
    }
  },
  methods: {
    getBannerInfo(id) {
      getBannerById(id).then(res => {
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
      addBanner(data).then(res => {
        return this.$message.success('保存成功!')
      }).then(_ => {
        this.$router.push({ path: '/banner/list' })
      }).catch(_ => {
        this.$message.error('保存失败!')
      }).finally(_ => {
        this.confirmLoading = false
      })
    },
    update(data) {
      updateBanner(data).then(res => {
        this.visible = false
        this.$router.push({ path: '/banner/list' })
        return this.$message.success('更新成功!')
      }).catch(_ => {
        this.$message.error('更新失败!')
      }).finally(_ => {
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>

