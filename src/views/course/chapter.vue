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
        <el-button icon="el-icon-circle-plus-outline" size="small" type="primary" @click="chapterVisible=true">添加章节</el-button>
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
                <template slot-scope="children">
                  <el-button icon="el-icon-edit" type="text" size="mini" @click="doUpdateVideo(row,children.row)">编辑小节</el-button>
                  <el-button icon="el-icon-delete" type="text" size="mini" @click="deleteVideo(children.row)">删除小节</el-button>
                </template>
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
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="doAddVideo(row)">添加小节</el-button>
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
      <el-dialog title="添加章节" :visible.sync="chapterVisible" @close="chapterClose">
        <el-form size="small" :model="chapter" label-position="right" label-width="100px">
          <el-form-item label="TITLE">
            <el-input v-model="chapter.title" placeholder="title" />
          </el-form-item>
          <el-form-item label="SORT">
            <el-input-number v-model="chapter.sort" :min="1" placeholder="sort" />
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button size="small" type="primary" @click="confirmChapter">确认</el-button>
          <el-button size="small" @click="chapterVisible=false">取消</el-button>
        </template>
      </el-dialog>
      <el-dialog title="添加小节" :visible.sync="videoVisible" @close="videoClose">
        <el-form size="small" :model="video" label-position="right" label-width="140px">
          <el-form-item label="TITLE">
            <el-input v-model="video.title" placeholder="title" />
          </el-form-item>
          <el-form-item label="SORT">
            <el-input-number v-model="video.sort" :min="1" placeholder="sort" />
          </el-form-item>
          <el-form-item label="IS FREE">
            <el-radio-group v-model="video.isFree" laceholder="IS FREE">
              <el-radio :label="0">NO</el-radio>
              <el-radio :label="1">YES</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="UPLOAD">
            <el-upload
              :on-success="handleVodUploadSuccess"
              :on-exceed="handleUploadExceed"
              :on-remove="handlVodeRemove"
              :before-remove="beforeVodRemove"
              :file-list="fileList"
              :action="uploadAction"
              :limit="1"
            >
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                <div slot="content">最大支持1G，<br>
                  支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                  GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                  MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                  SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                <i style="margin-left: 10px" class="el-icon-question" />
              </el-tooltip>
            </el-upload>
          </el-form-item>
        </el-form>
        <template slot="footer">
          <el-button size="small" type="primary" @click="onfirmVideo">确认</el-button>
          <el-button size="small" @click="videoVisible=false">取消</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getChapterList, addChapter, updateChapter, deleteChapterById } from '@/api/chapter'
import { addVideo, deleteVideoById, uploadVideo, deleteAliVideoByVideoId } from '@/api/video'
export default {
  data() {
    return {
      active: 2,
      chapterList: [],
      courseId: undefined,
      chapter: {},
      video: {},
      chapterVisible: false,
      fileList: [],
      uploadAction: uploadVideo,
      videoVisible: false
    }
  },
  created() {
    this.courseId = this.$route.params && this.$route.params.id
    this.fetchChapterList()
  },
  methods: {

    // =========================小节===================================
    handleVodUploadSuccess(response, file, fileList) {
      const { data } = response
      if (data.data.code === '200') {
        this.video.videoSourceId = data.data.videoId
        this.video.videoOriginalName = file.name
      }
    },
    handleUploadExceed(files, fileList) {
      debugger
    },
    beforeVodRemove(file) {
      return this.$confirm(`此操作将永久删除${file.name}, 是否继续`)
    },
    handlVodeRemove(file) {
      const { data } = file.response.data
      const videoId = data.videoId
      deleteAliVideoByVideoId(videoId).then(res => {
        this.$message.success('删除成功!')
        this.video.videoSourceId = undefined
        this.video.videoOriginalName = undefined
      })
    },
    doAddVideo(row) {
      this.chapter = row
      this.videoVisible = true
    },
    doUpdateVideo(chapter, video) {
      this.chapter = chapter
      this.video = video
      this.videoVisible = true
    },
    deleteVideo(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        return deleteVideoById(id)
      }).then(_ => {
        this.fetchChapterList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    videoClose() {
      this.videoVisible = false
    },

    onfirmVideo() {
      const data = { ...this.video }
      data.courseId = this.courseId
      data.chapterId = this.chapter.id
      addVideo(data).then(res => {
        const { message } = res
        this.$message.success(message)
        this.fetchChapterList()
        this.videoVisible = false
      })
    },
    // =========================章节===================================
    updateChapter(row) {
      this.chapterVisible = true
      this.chapter = row
    },
    deleteChapter(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        return deleteChapterById(id)
      }).then(_ => {
        this.fetchChapterList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    confirmChapter() {
      const data = { ...this.chapter }
      if (data.id) {
        updateChapter(data).then(res => {
          const { message } = res
          this.$message.success(message)
          this.fetchChapterList()
          this.chapterVisible = false
        })
      } else {
        data.courseId = this.courseId
        addChapter(data).then(res => {
          this.$message.success(res.message)
          this.chapterVisible = false
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
      this.$router.push({ path: `/course/publish/${this.courseId}` })
    },
    provious() {
      if (this.active-- > 2) this.active = 0
      this.$router.push({ path: `/course/edit/${this.courseId}` })
    },
    chapterClose() {
      this.chapter = {}
    }
  }

}
</script>

<style>
.tree{
 margin-bottom: 20px;
}
</style>
