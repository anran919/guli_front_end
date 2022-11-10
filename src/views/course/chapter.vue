<template>
  <div class="app-container">
    <el-card>
      <h3 slot="header">创建课程大纲</h3>
      <div>
        <el-steps simple :active="active" align-center style="margin-bottom: 40px;">
          <el-step title="填写基本课程信息" icon="el-icon-edit" />
          <el-step title="创建课程大纲" icon="el-icon-data-line" />
          <el-step title="发布课程" icon="el-icon-s-opportunity" />
        </el-steps>
      </div>
      <el-form inline label-width="120">
        <el-form-item>
          <el-button size="small" plain type="primary" @click="provious">返回上一步</el-button>
          <el-button size="small" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
      this.$router.push({ path: '/course/publish' })
    },
    provious() {
      if (this.active-- > 2) this.active = 0
      this.$router.push({ path: '/course/add' })
    }
  }

}
</script>

<style>

</style>
