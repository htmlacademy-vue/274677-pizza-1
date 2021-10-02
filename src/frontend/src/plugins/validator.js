import { EMAIL_REGEX, PHONE_REGEX } from "@/common/constants";

const rules = {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? EMAIL_REGEX.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
  phone: {
    rule: (value) =>
      value ? PHONE_REGEX.test(String(value).toLowerCase()) : true,
    message: "Телефон имеет неверный формат",
  },
};

const validator = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  validateFields(fields, validations) {
    if (!fields || !validations) {
      return;
    }

    let isValid = true;
    const newValidations = Object.keys(validations).reduce((acc, key) => {
      let error = "";
      if (key in fields) {
        error = validator(fields[key], validations[key].rules);
        if (error) {
          isValid = false;
        }
      }

      return {
        ...acc,
        [key]: {
          ...validations[key],
          error,
        },
      };
    }, {});

    return { isValid, validations: newValidations };
  },

  clearValidationErrors(validations) {
    if (!validations) {
      return;
    }

    return Object.keys(validations).reduce((acc, inputName) => {
      return {
        ...acc,
        [inputName]: {
          ...validations[inputName],
          error: "",
        },
      };
    }, {});
  },
};
