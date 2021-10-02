import axios from "@/plugins/axios";
import JWTService from "./jwt";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";

class BaseApiService {
  constructor(notifier) {
    if (!axios.notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(notifier, resource) {
    super(notifier);
    this.#resource = resource;
  }

  async get() {
    const { data } = await axios.get(this.#resource);

    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(notifier, resource) {
    super(notifier, resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);

    return data;
  }

  async put(entity) {
    const path = entity.id ? `${this.#resource}/${entity.id}` : this.#resource;
    const { data } = await axios.put(path, entity);

    return data;
  }

  async delete(id) {
    const path = id ? `${this.#resource}/${id}` : this.#resource;
    const { data } = await axios.delete(path);

    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JWTService.getToken();

    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(body) {
    const { data } = await axios.post("login", body);

    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");

    return data;
  }

  async whoAmI() {
    const { data } = await axios.get("whoAmI");

    return data;
  }
}

export class BuilderApiService extends BaseApiService {
  #resources;
  data;
  constructor(notifier, resources) {
    super(notifier);
    this.#resources = resources;
    this.data = null;
  }

  _normalize(data) {
    const getAdditionalData = (name, value) => {
      if (name === "dough" || name === "sauces") {
        return { checked: !value };
      } else if (name === "sizes") {
        return { checked: value === 1 };
      } else if (name === "ingredients") {
        return { count: 0 };
      }
    };

    return data.reduce(
      (acc, curr) => {
        const { data, config } = curr;

        return {
          ...acc,
          [config.url]: data.map((item, index) => ({
            ...item,
            value: PIZZA_VALUES_BY_NAME[config.url][item.name],
            ...getAdditionalData(config.url, index),
          })),
        };
      },
      { name: "" }
    );
  }

  async get() {
    return Promise.all(
      this.#resources.map((resource) => axios.get(resource))
    ).then((values) => {
      this.data = this._normalize(values);
      return this.data;
    });
  }
}

export class MiscApiService extends BaseApiService {
  #resource;
  data;
  constructor(notifier, resource) {
    super(notifier);
    this.#resource = resource;
    this.data = null;
  }

  _normalize(data) {
    return data.map((item) => ({ ...item, count: 0 }));
  }

  async get() {
    if (this.data) {
      return this.data;
    } else {
      const { data } = await axios.get(this.#resource);
      this.data = this._normalize(data);

      return this.data;
    }
  }
}
