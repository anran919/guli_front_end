<template>
  <div class="app-container">
    <el-card>
      <h3 slot="header">发布课程</h3>
      <div>
        <el-steps simple :active="3" align-center style="margin-bottom: 40px;">
          <el-step title="填写基本课程信息" icon="el-icon-edit" />
          <el-step title="创建课程大纲" icon="el-icon-data-line" />
          <el-step title="发布课程" icon="el-icon-s-opportunity" />
        </el-steps>
      </div>
      <div style="display: flex;">
        <div>
          <el-image fit="cover" style="width:300px;height:200px;border-radius: 10px" :src="publish.cover" />
        </div>
        <el-descriptions :title="publish.title" :column="1" style="margin-left: 40px">
          <el-descriptions-item label="课时数">{{ publish.lessonNum }}</el-descriptions-item>
          <el-descriptions-item label="所属分类">{{ publish.subjectL1Title }}/{{ publish.subjectL2Title }}</el-descriptions-item>
          <el-descriptions-item label="课程讲师">{{ publish.teacherName }}</el-descriptions-item>
          <el-descriptions-item label="价格">
            <el-tag size="small">¥{{ publish.price }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="课程描述">
            <span v-html="publish.description" />
          </el-descriptions-item>
        </el-descriptions>
        <!-- <div>
          <h3>{{ publish.title }}</h3>
          <div>共{{ publish.lessonNum }}课时</div>
          <div>所属分类:{{ publish.subjectL1Title }}/{{ publish.subjectL2Title }}</div>
          <div>课程讲师:{{ publish.teacherName }}</div>
          <div>价格:{{ publish.price }}</div>
          <div>
            课程描述: <span v-html="publish.description" />
          </div>
        </div> -->
      </div>
      <el-form inline label-width="120">
        <el-form-item>
          <el-button size="small" plain type="primary" @click="provious">返回上一步</el-button>
          <el-button :loading="publishLoading" size="small" type="primary" @click="next">发布课程</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getcoursePublishById, updateCourse } from '@/api/course'
export default {
  data() {
    return {
      active: 3,
      courseId: undefined,
      publish: {},
      publishLoading: false

    }
  },
  created() {
    this.courseId = this.$route.params.id
    this.fetchPublishInfo()
  },
  methods: {
    fetchPublishInfo() {
      getcoursePublishById(this.courseId).then(res => {
        this.publish = res.data.data
      })
    },
    doPublish() {
      const data = { status: 1, id: this.courseId }
      updateCourse(data).then(res => {
        this.$message.success('发布成功!')
        this.$router.push({ path: '/course/list' })
      }).finally(_ => {
        this.publishLoading = false
      })
    },
    next() {
      this.doPublish()
    },
    provious() {
      if (this.active-- > 2) this.active = 0
      this.$router.push({ path: '/course/chapter' })
    }
  }

}
</script>

<style>

</style>
