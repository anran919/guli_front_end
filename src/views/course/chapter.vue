<template>
  <div class="app-container">
    <el-card>
      <h3 slot="header">创建课程大纲</h3>
      <el-steps simple :active="active" align-center style="margin-bottom: 40px;">
        <el-step title="填写基本课程信息" icon="el-icon-edit" />
        <el-step title="创建课程大纲" icon="el-icon-data-line" />
        <el-step title="发布课程" icon="el-icon-s-opportunity" />
      </el-steps>
      <div>
        <el-button icon="el-icon-circle-plus-outline" size="small" type="primary" @click="visible=true">添加章节</el-button>
      </div>
      <el-table
        :data="chapterList"
        style="width: 100%;margin-top:20px;margin-bottom: 20px;"
      >
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-table :data="row.children" size="small" :show-header="true">
              <el-table-column label="VIDEO TITLE" prop="title" />
              <el-table-column label="VIDEO ID" prop="id" />
              <el-table-column label="OPTION">
                <el-button icon="el-icon-edit" type="text" size="mini" @click="updateVideo(row,1)">编辑</el-button>
                <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteVideo(row)">删除</el-button>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="CHAPTTER TITLE"
          prop="title"
        />
        <el-table-column label="OPTION">
          <template slot-scope="{row}">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="addVideo(row,0)">添加小节</el-button>
            <el-button icon="el-icon-edit" type="success" size="mini" @click="updateChapter(row)">编辑</el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteChapter(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form inline label-width="120">
        <el-form-item>
          <el-button size="small" icon="el-icon-back" plain type="primary" @click="provious">返回上一步</el-button>
          <el-button size="small" icon="el-icon-right" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加章节" :visible.sync="visible" @close="close">
        <el-form size="small" :model="form" label-position="right" label-width="100px">
          <el-form-item label="TITLE">
            <el-input v-model="form.title" placeholder="title" />
          </el-form-item>
          <el-form-item label="SORT">
            <el-input-number v-model="form.sort" :min="1" placeholder="sort" />
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button size="small" type="primary" @click="confirm">确认</el-button>
          <el-button size="small" @click="visible=false">取消</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getChapterList, addChapter, updateChapter, deleteChapterById } from '@/api/chapter'
export default {
  data() {
    return {
      active: 2,
      chapterList: [],
      courseId: undefined,
      form: {},
      visible: false
    }
  },
  created() {
    this.courseId = this.$route.params && this.$route.params.id
    this.fetchChapterList()
  },
  methods: {
    updateChapter(row) {
      this.visible = true
      this.form = row
    },
    deleteChapter(row) {
      const id = row.id
      deleteChapterById(id).then(res => {
        const { message } = res
        this.$message.success(message)
        this.fetchChapterList()
      })
    },
    confirm() {
      const data = { ...this.form }
      if (data.id) {
        updateChapter(data).then(res => {
          const { message } = res
          this.$message.success(message)
          this.fetchChapterList()
          this.visible = false
        })
      } else {
        data.courseId = this.courseId
        addChapter(data).then(res => {
          this.$message.success(res.message)
          this.visible = false
          this.fetchChapterList()
        })
      }
    },
    fetchChapterList() {
      if (this.courseId) {
        const id = this.$route.params.id
        getChapterList(id).then(res => {
          const { data } = res
          this.chapterList = data.data
        })
      }
    },
    next() {
      if (this.active++ > 2) this.active = 0
      this.$router.push({ path: '/course/publish' })
    },
    provious() {
      if (this.active-- > 2) this.active = 0
      this.$router.push({ path: `/course/edit/${this.courseId}` })
    },
    close() {
      this.form = {}
    }
  }

}
</script>

<style>
.tree{
 margin-bottom: 20px;
}
</style>
