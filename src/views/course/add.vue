<template>
  <div class="app-container">
    <el-card>
      <h3 slot="header">填写基本课程信息</h3>
      <div>
        <el-steps simple :active="active" align-center style="margin-bottom: 40px;">
          <el-step title="填写基本课程信息" icon="el-icon-edit" />
          <el-step title="创建课程大纲" icon="el-icon-data-line" />
          <el-step title="发布课程" icon="el-icon-s-opportunity" />
        </el-steps>
      </div>

      <el-form label-width="120px">
        <el-form-item label="课程标题">
          <el-input v-model="form.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目实战" />
        </el-form-item>
        <el-form-item label="所属分类">
          <el-cascader v-model="form.subjectIds" :props=" {value:'id',label:'title'}" :options="subjects" />
        </el-form-item>
        <el-form-item label="课程标题">
          <el-select v-model="form.teacherId" placeholder="课程讲师">
            <el-option v-for="t in teachers" :key="t.id" :label="t.name" :value="t.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="总课时">
          <el-input-number v-model="form.lessonNum" controls-position="right" :min="0" placeholder="总课时" />
        </el-form-item>
        <!--TODO 课程简介 -->
        <el-form-item label="课程简介">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="课程简介" />
        </el-form-item>
        <!--TODO 课程封面 -->
        <el-form-item label="课程封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadCoverAction"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
            accept=".png,.jpg,.jpeg,.svg"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input-number v-model="form.price" controls-position="right" :min="0" placeholder="总课时" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" size="small" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { add, uploadCover } from '@/api/course'
import { getAllTeacherList } from '@/api/teacher'
import { getTreeList } from '@/api/subject'
export default {
  data() {
    return {
      active: 1,
      loading: false,
      form: {
        'description': '使用主流的前端框架Vue，使用Es6的开发规范，采用模块化的开发模式',
        'lessonNum': 12,
        // 'cover': 'http://edu-longyang.oss-cn-beijing.aliyuncs.com/2020/08/06/587d5686663541d986a750be8c9b99b9java.jpg',
        'price': 0,
        'subjectId': '1590631966011592706',
        'teacherId': '1189389726308478977',
        'title': '尚硅谷_谷粒学苑-微服务+全栈在线教育实战项目'
      },
      teachers: [],
      subjects: [],
      uploadCoverAction: uploadCover
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTeacherList()
      this.getSubjectList()
    },
    getTeacherList() {
      getAllTeacherList().then(res => {
        const { data } = res
        this.teachers = data.data || []
      })
    },
    handleCoverSuccess(res, file) {
      const { data, message } = res
      // this.form.cover = data.url
      this.$set(this.form, 'cover', data.url)
      this.$message.success(message)
    },
    beforeCoverUpload() {
    },
    getSubjectList() {
      getTreeList().then(res => {
        const { data } = res
        this.subjects = data.list
      })
    },

    next() {
      const data = Object.assign({}, this.form)
      data.subjectId = data.subjectIds.length > 0 && data.subjectIds[1]
      delete data.subjectIds
      this.loading = true
      add(data).then(res => {
        const { data } = res.data
        if (this.active++ > 2) this.active = 0
        this.$message.success('添加课程信息成功!')
        this.$router.push({ path: `/course/chapter/${data.id}` })
      }).finally(_ => {
        this.loading = false
      })
    }
  }

}
</script>

<style lang="css">
  avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
