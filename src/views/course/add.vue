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
        <!--课程简介使用 quill-editor -->
        <!-- <el-form-item label="课程简介">
            <quill-editor ref="text" v-model="form.description" class="myQuillEditor" :options="editorOption" />
        </el-form-item> -->
        <!--课程简介使用 tinymce -->
        <el-form-item label="课程简介">
          <tinymce-editer v-model="form.description" />
        </el-form-item>
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
import { add, uploadCover, updateCourse, getCourseById } from '@/api/course'
import { getAllTeacherList } from '@/api/teacher'
import TinymceEditer from '@/components/TinymceEditer'
import { getTreeList } from '@/api/subject'
export default {
  components: {
    TinymceEditer },
  data() {
    return {
      active: 1,
      loading: false,
      form: {
        // description: '使用主流的前端框架Vue',
        // lessonNum: 12,
        // cover: 'http://edu-longyang.oss-cn-beijing.aliyuncs.com/2020/08/06/587d5686663541d986a750be8c9b99b9java.jpg',
        // price: 0,
        // title: '尚硅谷_谷粒学苑-微服务'
      },
      editorOption: {
        placeholder: '请输入正文'
      },
      teachers: [],
      subjects: [],
      uploadCoverAction: uploadCover
    }
  },
  created() {
    this.form.id = this.$route.params && this.$route.params.id
    this.init()
  },
  methods: {
    init() {
      this.getTeacherList()
      this.getSubjectList()
      const id = this.form.id
      if (id) {
        this.getCourseInfoById(id)
      }
    },
    getCourseInfoById(id) {
      getCourseById(id).then(res => {
        const { data } = res
        const info = data.data
        this.form = Object.assign({}, info, { subjectIds: [info.subjectParentId, info.subjectId] })
      })
    },
    getTeacherList() {
      getAllTeacherList().then(res => {
        const { data } = res
        this.teachers = data.data || []
      })
    },
    handleCoverSuccess(res, file) {
      const { data, message } = res
      this.$set(this.form, 'cover', data.url)
      this.$message.success(message)
    },
    beforeCoverUpload(file) {
      const isImage = ['image/svg+xml', 'image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('上传头像图片只能是 jpg,svg,png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    getSubjectList() {
      getTreeList().then(res => {
        const { data } = res
        this.subjects = data.list
      })
    },
    next() {
      const data = Object.assign({}, this.form)
      if (data.subjectIds && data.subjectIds.length > 1) {
        data.subjectParentId = data.subjectIds[0]
        data.subjectId = data.subjectIds[1]
      }
      delete data.subjectIds
      delete data.id
      this.loading = true
      if (data.id) {
        this.update(data)
      } else {
        this.add(data)
      }
    },
    add(data) {
      add(data).then(res => {
        this.$message.success('添加课程信息成功!')
        this.doNext(res)
      }).finally(_ => {
        this.loading = false
      })
    },
    update(data) {
      updateCourse(data).then(res => {
        this.$message.success('修改课程信息成功!')
        this.doNext(res)
      }).finally(_ => {
        this.loading = false
      })
    },
    doNext(res) {
      const { data } = res.data
      if (this.active++ > 2) this.active = 0
      this.$router.push({ path: `/course/chapter/${data.id}` })
    }
  }

}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader /deep/ .el-upload:hover {
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
