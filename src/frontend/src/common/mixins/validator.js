import validator from "@/plugins/validator";

export default {
  methods: {
    $validateFields: validator.validateFields,
    $clearValidationErrors: validator.clearValidationErrors,
  },
};
