/**
* 每位工程师都有保持代码优雅的义务
* Each engineer has a duty to keep the code elegant
*/
<template>
  <Form>
    <FormItem class="fs12"></FormItem>
  </Form>
</template>

<script>
  import { settingNameKeyReg } from '@/utils/static';

  export default {
    props: {
      configInfo: {
        default: () => {},
        type: Object,
      },
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (!value || value.trim() === '') {
          callback('请输入名称');
        } else if (!settingNameKeyReg.test(value)) {
          callback('仅支持字母、数字、中文、-、_');
        } else {
          callback();
        }
      };
      return {
        formValidate: {
          configName: '',
          description: '',
        },
        ruleValidate: {
          configName: [{ required: true, validator: validatePass, trigger: 'blur' }],
        },
      };
    },

    components: {},

    computed: {},

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$emit('submit', this.formValidate);
          }
        });
      },
    },

    mounted() {
      this.formValidate = { ...this.configInfo };
    },

  };

</script>
<style lang='scss' scoped>
</style>
