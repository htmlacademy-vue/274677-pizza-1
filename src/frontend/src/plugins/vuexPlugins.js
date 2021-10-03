import Notifier from "@/plugins/notifier";
import JWTService from "@/services/jwt";
import { createResources } from "@/common/helpers";
import validator from "@/plugins/validator";

export default function (store) {
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
  store.$jwt = JWTService;
  store.$validator = validator;
}
