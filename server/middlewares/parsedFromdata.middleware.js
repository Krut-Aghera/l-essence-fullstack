import qs from "qs";

export const parseFormData = (req, res, next) => {
      req.body = qs.parse(req.body);

      next();
};
