import i18n from "../i18nextInit";

export default function useTrans() {
  const { t } = i18n;
  const trans = (text, params = {}) => t(text, params);
  return {
    trans,
    t: trans,
  };
}
