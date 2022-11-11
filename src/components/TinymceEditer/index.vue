<!-- 参考: https://www.dsiab.com/post/6c7ebba5-2b95-4ef4-baf6-2a8479746432 -->
<!-- 参考: https://www.jianshu.com/p/f19bd43c6ac8 -->
<template>
  <editor v-model="content" :init="init" :disabled="disabled" />
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/template'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern autosave autoresize'
    },
    toolbar: {
      type: [String, Array],
      default: 'formatselect | fontselect | fontsizeselect | bold italic underline strikethrough | forecolor backcolor | lineheight | align | numlist bullist | outdent indent blockquote | undo redo | link unlink image code codesample | table subscript superscript removeformat'
    }
  },
  data() {
    return {
      // 初始化配置
      init: {
        // menubar: true, // 菜单栏显隐
        language_url: '/static/tinymce/langs/zh-Hans.js',
        language: 'zh-Hans',
        skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: '/static/tinymce/skins/content/default/content.css', // vue-cli2.x
        height: 300,
        min_height: 300,
        max_height: 500,
        toolbar_mode: 'wrap',
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: 'body, p {font-size: 14px;margin: 5px 0}',
        toolbar_sticky: true, // 粘性工具栏 默认false (在向下滚动网页直到不再可见编辑器时，将工具栏和菜单停靠在屏幕顶部)
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        branding: false,
        block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6;',
        // 图片上传
        images_upload_handler: (blobInfo, success, failure) => {
          console.log('fail: ', failure)
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      content: this.value
    }
  },
  watch: {
    value(newValue) {
      this.content = newValue
    },
    content(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
</style>
